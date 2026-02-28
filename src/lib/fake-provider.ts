import type { ArchitectureData, DataProvider, ServiceMetrics, ServiceStatus } from './types'
import { SERVICES } from './constants'
import { EDGES } from './graph-config'

// Deterministic hash for per-service seed
function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

// Multi-frequency deterministic oscillation
function oscillate(t: number, seed: number, base: number, amplitude: number): number {
  const s = seed % 1000
  // Slow drift (~5 min cycle)
  const drift = Math.sin((t / 300) + s * 0.1) * amplitude * 0.4
  // Medium cycle (~30s)
  const medium = Math.sin((t / 30) + s * 0.7) * amplitude * 0.35
  // Fast ripple (~7s)
  const ripple = Math.sin((t / 7) + s * 1.3) * amplitude * 0.25
  return Math.max(0, Math.min(100, base + drift + medium + ripple))
}

function generateServiceMetrics(service: typeof SERVICES[number], now: number): ServiceMetrics {
  const seed = hashString(service.id)
  const t = now / 1000 // seconds

  return {
    id: service.id,
    name: service.name,
    displayName: service.displayName,
    category: service.category,
    status: 'healthy' as ServiceStatus,
    cpu: Math.round(oscillate(t, seed, service.baseCpu, 12) * 10) / 10,
    memory: Math.round(oscillate(t, seed + 100, service.baseMemory, 8) * 10) / 10,
    uptime: Math.floor(86400 * 7 + (seed % 86400)), // 7+ days
    requests: Math.max(0, Math.round(oscillate(t, seed + 200, service.baseRequests, service.baseRequests * 0.25))),
    latency: Math.max(1, Math.round(oscillate(t, seed + 300, service.baseLatency, service.baseLatency * 0.3) * 10) / 10),
    description: service.description,
    icon: service.icon,
    port: service.port,
    connections: EDGES.filter(e => e.source === service.id || e.target === service.id).length,
  }
}

export class FakeProvider implements DataProvider {
  async getArchitectureData(): Promise<ArchitectureData> {
    const now = Date.now()
    const services = SERVICES.map(s => generateServiceMetrics(s, now))

    const healthyCount = services.filter(s => s.status === 'healthy').length
    const totalReqs = services.reduce((sum, s) => sum + s.requests, 0)
    const avgLatency = Math.round(services.reduce((sum, s) => sum + s.latency, 0) / services.length * 10) / 10
    const avgCpu = Math.round(services.reduce((sum, s) => sum + s.cpu, 0) / services.length * 10) / 10
    const avgMem = Math.round(services.reduce((sum, s) => sum + s.memory, 0) / services.length * 10) / 10

    return {
      mode: 'fake',
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
        totalUptime: Math.max(...services.map(s => s.uptime)),
      },
    }
  }
}
