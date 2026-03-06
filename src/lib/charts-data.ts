// VM Resource Allocation
export const VM_RESOURCES = [
  { name: 'r2d2-main', cpu: 24, ram: 64, disk: 51, status: 'UP' },
  { name: 'r2d2-stage', cpu: 8, ram: 16, disk: 15, status: 'UP' },
  { name: 'r2d2-store', cpu: 6, ram: 4, disk: 24, status: 'UP' },
  { name: 'r2d2-lab', cpu: 8, ram: 32, disk: 10, status: 'STOPPED' },
  { name: 'r2d2-monitor', cpu: 2, ram: 4, disk: 18, status: 'STOPPED' },
]

// Container distribution by stack
export const CONTAINER_DISTRIBUTION = [
  { name: 'MultiPass Agency', count: 15, color: '#8B5CF6' },
  { name: 'Monitoring', count: 5, color: '#4ADE80' },
  { name: 'NetBox', count: 5, color: '#00D4FF' },
  { name: 'Taskyn', count: 2, color: '#FBBF24' },
  { name: 'Traefik', count: 1, color: '#FF6B6B' },
  { name: 'Neo4j', count: 1, color: '#F472B6' },
  { name: 'Showcase', count: 1, color: '#6366F1' },
]

// Test coverage breakdown
export const TEST_COVERAGE = [
  { category: 'Unit — Sanitize', count: 17, type: 'unit' },
  { category: 'Unit — Permissions', count: 8, type: 'unit' },
  { category: 'Unit — Rate Limit', count: 5, type: 'unit' },
  { category: 'Unit — Guard', count: 4, type: 'unit' },
  { category: 'Unit — Core', count: 81, type: 'unit' },
  { category: 'E2E — Public', count: 15, type: 'e2e' },
  { category: 'E2E — Auth', count: 39, type: 'e2e' },
  { category: 'E2E — Setup', count: 1, type: 'e2e' },
]

// Uptime simulation (30 days)
export const UPTIME_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `J${i + 1}`,
  uptime: i === 14 ? 94.2 : 99.5 + Math.random() * 0.5, // incident day 15
  checks: 44,
  alerts: i === 14 ? 8 : Math.floor(Math.random() * 2),
}))

// Agent capabilities radar
export const AGENT_CAPABILITIES = [
  { skill: 'Code', Engineer: 95, Architect: 70, Researcher: 40, Analyst: 60 },
  { skill: 'Design', Engineer: 50, Architect: 90, Researcher: 30, Analyst: 40 },
  { skill: 'Research', Engineer: 40, Architect: 50, Researcher: 95, Analyst: 70 },
  { skill: 'Testing', Engineer: 85, Architect: 40, Researcher: 30, Analyst: 50 },
  { skill: 'Security', Engineer: 60, Architect: 75, Researcher: 60, Analyst: 80 },
  { skill: 'Strategy', Engineer: 30, Architect: 85, Researcher: 50, Analyst: 90 },
]

// Backup health
export const BACKUP_HEALTH = [
  { name: 'MultiPass DB', sizeMB: 12, freshHours: 3, status: 'ok' },
  { name: 'PAI Shared', sizeMB: 8, freshHours: 3, status: 'ok' },
  { name: 'Supabase', sizeMB: 4, freshHours: 3, status: 'ok' },
  { name: 'Neo4j', sizeMB: 21, freshHours: 3, status: 'ok' },
  { name: 'GDrive Offsite', sizeMB: 25, freshHours: 5, status: 'ok' },
  { name: 'Vault NFS', sizeMB: 180, freshHours: 0.25, status: 'ok' },
]

// Cron job frequency
export const CRON_FREQUENCY = [
  { name: 'Monitoring', interval: '5min', runsPerDay: 288, color: '#4ADE80' },
  { name: 'Vault Sync', interval: '15min', runsPerDay: 96, color: '#00D4FF' },
  { name: 'E2E Tests', interval: '30min', runsPerDay: 48, color: '#8B5CF6' },
  { name: 'Backups', interval: 'Daily', runsPerDay: 4, color: '#FBBF24' },
  { name: 'Maintenance', interval: 'Weekly', runsPerDay: 0.14, color: '#FF6B6B' },
]
