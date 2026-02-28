export type ServiceStatus = 'healthy' | 'degraded' | 'down' | 'unknown'

export type ServiceCategory = 'gateway' | 'application' | 'database' | 'cache' | 'ai' | 'observability' | 'auth' | 'storage' | 'realtime' | 'monitoring' | 'operations'

export interface ServiceMetrics {
  id: string
  name: string
  displayName: string
  category: ServiceCategory
  status: ServiceStatus
  cpu: number       // 0-100
  memory: number    // 0-100
  uptime: number    // seconds
  requests: number  // requests per minute
  latency: number   // ms p50
  description: string
  icon: string      // lucide icon name
  port: number
  connections: number
}

export interface DataFlow {
  id: string
  source: string
  target: string
  label: string
  protocol: string
  animated: boolean
}

export interface ArchitectureData {
  mode: 'live' | 'fake'
  timestamp: number
  services: ServiceMetrics[]
  flows: DataFlow[]
  aggregates: AggregateStats
}

export interface AggregateStats {
  totalServices: number
  healthyServices: number
  totalRequests: number
  avgLatency: number
  avgCpu: number
  avgMemory: number
  totalUptime: number
}

export interface DataProvider {
  getArchitectureData(): Promise<ArchitectureData>
}
