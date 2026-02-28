import type { ArchitectureData, DataProvider, ServiceMetrics, ServiceStatus } from './types'
import { SERVICES } from './constants'
import { EDGES } from './graph-config'
import { sanitizeObject } from './sanitizer'

const TIMEOUT = 3000
const DOCKER_SOCKET = '/var/run/docker.sock'
const NETDATA_BASE = 'http://localhost:19999'

// ----- Docker Socket API -----

interface DockerContainer {
  Names: string[]
  State: string
  Status: string
}

interface DockerInspect {
  State: {
    Status: string
    Running: boolean
    StartedAt: string
    Health?: { Status: string }
  }
}

async function fetchDockerContainers(): Promise<Map<string, DockerInspect>> {
  const map = new Map<string, DockerInspect>()
  try {
    // Node.js fetch doesn't support unix sockets — use http module
    const { default: http } = await import('http')
    const data = await new Promise<string>((resolve, reject) => {
      const req = http.get(
        { socketPath: DOCKER_SOCKET, path: '/v1.44/containers/json?all=true' },
        (res) => {
          let body = ''
          res.on('data', (chunk: string) => (body += chunk))
          res.on('end', () => resolve(body))
        }
      )
      req.on('error', reject)
      req.setTimeout(TIMEOUT, () => { req.destroy(); reject(new Error('timeout')) })
    })

    const containers: DockerContainer[] = JSON.parse(data)

    // Fetch inspect for each container in parallel
    const inspections = await Promise.allSettled(
      containers.map(async (c) => {
        const name = c.Names[0].replace(/^\//, '')
        const inspectData = await new Promise<string>((resolve, reject) => {
          const req = http.get(
            { socketPath: DOCKER_SOCKET, path: `/v1.44/containers/${name}/json` },
            (res) => {
              let body = ''
              res.on('data', (chunk: string) => (body += chunk))
              res.on('end', () => resolve(body))
            }
          )
          req.on('error', reject)
          req.setTimeout(TIMEOUT, () => { req.destroy(); reject(new Error('timeout')) })
        })
        return { name, inspect: JSON.parse(inspectData) as DockerInspect }
      })
    )

    for (const result of inspections) {
      if (result.status === 'fulfilled') {
        map.set(result.value.name, result.value.inspect)
      }
    }
  } catch {
    // Docker socket unreachable — return empty map
  }
  return map
}

function resolveStatus(inspect: DockerInspect | undefined): ServiceStatus {
  if (!inspect) return 'unknown'
  if (!inspect.State.Running) return 'down'
  const health = inspect.State.Health?.Status
  if (health === 'healthy') return 'healthy'
  if (health === 'unhealthy') return 'degraded'
  // No healthcheck configured but running
  return 'healthy'
}

function computeUptime(inspect: DockerInspect | undefined): number {
  if (!inspect?.State.Running) return 0
  const started = new Date(inspect.State.StartedAt).getTime()
  return Math.floor((Date.now() - started) / 1000)
}

// ----- Netdata API -----

async function fetchNetdataCpu(containerName: string): Promise<number> {
  try {
    const res = await fetch(
      `${NETDATA_BASE}/api/v1/data?chart=cgroup_${containerName}.cpu&after=-10&format=json`,
      { signal: AbortSignal.timeout(TIMEOUT) }
    )
    if (!res.ok) return 0
    const data = await res.json()
    // Average user+system CPU over last 10 seconds
    const rows = data.data ?? []
    if (rows.length === 0) return 0
    const total = rows.reduce((sum: number, row: number[]) => sum + (row[1] ?? 0) + (row[2] ?? 0), 0)
    return Math.round((total / rows.length) * 10) / 10
  } catch {
    return 0
  }
}

async function fetchNetdataMemory(containerName: string): Promise<number> {
  try {
    const res = await fetch(
      `${NETDATA_BASE}/api/v1/data?chart=cgroup_${containerName}.mem_usage&after=-1&format=json`,
      { signal: AbortSignal.timeout(TIMEOUT) }
    )
    if (!res.ok) return 0
    const data = await res.json()
    // Returns RAM in MiB (col 1) + swap in MiB (col 2) — convert to % of 64GB host
    const ramMib = data.data?.[0]?.[1] ?? 0
    return Math.round((ramMib / (64 * 1024) * 100) * 100) / 100
  } catch {
    return 0
  }
}

// ----- Health Endpoints -----

async function checkHealth(url: string | null): Promise<{ healthy: boolean; latencyMs: number }> {
  if (!url) return { healthy: false, latencyMs: 0 }
  const start = performance.now()
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) })
    const latencyMs = Math.round(performance.now() - start)
    return { healthy: res.ok, latencyMs }
  } catch {
    return { healthy: false, latencyMs: Math.round(performance.now() - start) }
  }
}

// ----- Live Provider -----

export class LiveProvider implements DataProvider {
  async getArchitectureData(): Promise<ArchitectureData> {
    const now = Date.now()

    // Fetch all Docker state in one call
    const dockerState = await fetchDockerContainers()

    // Fetch metrics for all services in parallel
    const serviceResults = await Promise.allSettled(
      SERVICES.map(async (svc) => {
        const inspect = dockerState.get(svc.containerName)
        const status = resolveStatus(inspect)
        const uptime = computeUptime(inspect)

        // Only fetch Netdata/health if container is running
        const isRunning = status !== 'down' && status !== 'unknown'
        const [cpu, memory, health] = await Promise.all([
          isRunning ? fetchNetdataCpu(svc.containerName) : Promise.resolve(0),
          isRunning ? fetchNetdataMemory(svc.containerName) : Promise.resolve(0),
          isRunning ? checkHealth(svc.healthUrl) : Promise.resolve({ healthy: false, latencyMs: 0 }),
        ])

        const finalStatus: ServiceStatus = !isRunning
          ? status
          : health.healthy
            ? 'healthy'
            : status

        const metrics: ServiceMetrics = {
          id: svc.id,
          name: svc.name,
          displayName: svc.displayName,
          category: svc.category,
          status: finalStatus,
          cpu,
          memory,
          uptime,
          requests: 0, // Not available from these sources
          latency: health.latencyMs || svc.baseLatency,
          description: svc.description,
          icon: svc.icon,
          port: svc.port,
          connections: EDGES.filter(e => e.source === svc.id || e.target === svc.id).length,
        }
        return metrics
      })
    )

    const services: ServiceMetrics[] = serviceResults.map((r, i) =>
      r.status === 'fulfilled'
        ? r.value
        : {
            id: SERVICES[i].id,
            name: SERVICES[i].name,
            displayName: SERVICES[i].displayName,
            category: SERVICES[i].category,
            status: 'unknown' as ServiceStatus,
            cpu: 0, memory: 0, uptime: 0, requests: 0, latency: 0,
            description: SERVICES[i].description,
            icon: SERVICES[i].icon,
            port: SERVICES[i].port,
            connections: 0,
          }
    )

    const healthyCount = services.filter(s => s.status === 'healthy').length
    const totalReqs = services.reduce((sum, s) => sum + s.requests, 0)
    const running = services.filter(s => s.status !== 'down' && s.status !== 'unknown')
    const avgLatency = running.length > 0
      ? Math.round(running.reduce((sum, s) => sum + s.latency, 0) / running.length * 10) / 10
      : 0
    const avgCpu = running.length > 0
      ? Math.round(running.reduce((sum, s) => sum + s.cpu, 0) / running.length * 10) / 10
      : 0
    const avgMem = running.length > 0
      ? Math.round(running.reduce((sum, s) => sum + s.memory, 0) / running.length * 10) / 10
      : 0

    const result: ArchitectureData = {
      mode: 'live',
      timestamp: now,
      services,
      flows: EDGES,
      aggregates: {
        totalServices: services.length,
        healthyServices: healthyCount,
        totalRequests: totalReqs,
        avgLatency,
        avgCpu,
        avgMemory: avgMem,
        totalUptime: Math.max(...services.map(s => s.uptime), 0),
      },
    }

    // Sanitize before returning — strip any internal IPs/hostnames
    return sanitizeObject(result)
  }
}
