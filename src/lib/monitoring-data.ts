export interface MonitorCheck {
  id: string
  name: string
  target: string
  type: 'ping' | 'http' | 'docker' | 'disk' | 'service' | 'backup' | 'e2e'
  status: 'ok' | 'warn' | 'critical'
  value?: string
}

export interface AlertRule {
  id: string
  name: string
  condition: string
  action: string
  channel: 'ntfy' | 'log' | 'both'
}

export interface BackupJob {
  id: string
  name: string
  schedule: string
  target: string
  retention: string
  lastSize?: string
  status: 'ok' | 'stale'
}

export const MONITOR_CHECKS: MonitorCheck[] = [
  // VM health
  { id: 'vm-main', name: 'r2d2-main', target: '.163', type: 'ping', status: 'ok', value: '<1ms' },
  { id: 'vm-stage', name: 'r2d2-stage', target: '.162', type: 'ping', status: 'ok', value: '<1ms' },
  { id: 'vm-store', name: 'r2d2-store', target: '.164', type: 'ping', status: 'ok', value: '<1ms' },
  { id: 'vm-monitor', name: 'r2d2-monitor', target: '.101', type: 'ping', status: 'ok', value: '<1ms' },
  // Docker
  { id: 'dk-multipass', name: 'MultiPass App', target: ':3000', type: 'http', status: 'ok', value: '200' },
  { id: 'dk-supabase', name: 'Supabase API', target: ':8000', type: 'http', status: 'ok', value: '200' },
  { id: 'dk-langfuse', name: 'Langfuse', target: ':3001', type: 'http', status: 'ok', value: '200' },
  { id: 'dk-kong', name: 'Kong Gateway', target: ':8443', type: 'http', status: 'ok', value: '200' },
  { id: 'dk-neo4j', name: 'Neo4j', target: ':7687', type: 'service', status: 'ok', value: 'bolt' },
  { id: 'dk-redis', name: 'Redis', target: ':6379', type: 'service', status: 'ok', value: 'PONG' },
  { id: 'dk-traefik', name: 'Traefik', target: ':443', type: 'http', status: 'ok', value: '200' },
  { id: 'dk-netbox', name: 'NetBox', target: ':8080', type: 'http', status: 'ok', value: '200' },
  // Disk
  { id: 'disk-main', name: 'Disk r2d2-main', target: '/', type: 'disk', status: 'ok', value: '51%' },
  { id: 'disk-stage', name: 'Disk r2d2-stage', target: '/', type: 'disk', status: 'ok', value: '15%' },
  { id: 'disk-store', name: 'Disk r2d2-store', target: '/', type: 'disk', status: 'ok', value: '24%' },
  // Services
  { id: 'svc-tunnel', name: 'Cloudflare Tunnel', target: 'cloudflared', type: 'service', status: 'ok' },
  { id: 'svc-mem0', name: 'Mem0 Service', target: ':8050', type: 'http', status: 'ok', value: '200' },
  { id: 'svc-nfs', name: 'NFS Server', target: ':2049', type: 'service', status: 'ok' },
  // Backup freshness
  { id: 'bak-multipass', name: 'Backup MultiPass', target: 'pai_shared', type: 'backup', status: 'ok', value: '<24h' },
  { id: 'bak-offsite', name: 'Backup GDrive', target: 'rclone', type: 'backup', status: 'ok', value: '<24h' },
  // E2E
  { id: 'e2e-suite', name: 'E2E Playwright', target: '55 tests', type: 'e2e', status: 'ok', value: '53/55' },
  // Uptime Kuma
  { id: 'kuma', name: 'Uptime Kuma', target: '22 monitors', type: 'http', status: 'ok', value: '22/22' },
]

export const ALERT_RULES: AlertRule[] = [
  { id: 'disk-70', name: 'Disk Warning', condition: 'Disk > 70%', action: 'Alert with re-check 30min', channel: 'ntfy' },
  { id: 'disk-85', name: 'Disk Critical', condition: 'Disk > 85%', action: 'Alert immediate', channel: 'both' },
  { id: 'vm-down', name: 'VM Unreachable', condition: 'Ping fails 3x', action: 'Alert + recovery check', channel: 'ntfy' },
  { id: 'docker-unhealthy', name: 'Container Unhealthy', condition: 'Health check fail', action: 'Alert + restart attempt', channel: 'ntfy' },
  { id: 'backup-stale', name: 'Backup Stale', condition: 'No backup > 26h', action: 'Alert freshness', channel: 'both' },
  { id: 'e2e-fail', name: 'E2E Failure', condition: 'Test suite fails', action: 'Alert + stale check 60min', channel: 'ntfy' },
  { id: 'gdrive-quota', name: 'GDrive Quota', condition: 'Free < 1 Go', action: 'Alert quota low', channel: 'ntfy' },
]

export const BACKUP_JOBS: BackupJob[] = [
  { id: 'bak-db', name: 'PostgreSQL Dump', schedule: '0 3 * * *', target: '/mnt/shared/backups/', retention: '14 jours', lastSize: '12 Mo', status: 'ok' },
  { id: 'bak-shared', name: 'pai_shared + supabase + neo4j', schedule: '15 3 * * *', target: '/mnt/shared/backups/', retention: '14 jours', lastSize: '45 Mo', status: 'ok' },
  { id: 'bak-offsite', name: 'Offsite Google Drive', schedule: '30 4 * * *', target: 'gdrive:r2d2-backups/', retention: 'sync', lastSize: '25 Mo', status: 'ok' },
  { id: 'bak-restore', name: 'Test Restore Mensuel', schedule: '0 6 1 * *', target: 'containers ephemeres', retention: 'N/A', status: 'ok' },
]

export const CHECK_TYPE_COLORS: Record<string, string> = {
  ping: '#00D4FF',
  http: '#4ADE80',
  docker: '#8B5CF6',
  disk: '#FBBF24',
  service: '#F472B6',
  backup: '#FF6B6B',
  e2e: '#00D4FF',
}
