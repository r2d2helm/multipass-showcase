export type VMStatus = 'up' | 'stopped' | 'degraded'

export interface VMDefinition {
  id: string
  name: string
  vmid: number
  ip: string
  role: string
  vcpu: number
  ram: string
  disk: string
  diskUsage: number
  status: VMStatus
  sshUser: string
  services: string[]
  description: string
}

export interface NetworkLink {
  id: string
  source: string
  target: string
  protocol: string
  port: number
  label: string
  bidirectional: boolean
}

export interface CronJob {
  schedule: string
  label: string
  description: string
  category: 'monitoring' | 'backup' | 'sync' | 'maintenance' | 'test'
}

export const VMS: VMDefinition[] = [
  {
    id: 'main',
    name: 'r2d2-main',
    vmid: 103,
    ip: '192.168.1.163',
    role: 'Dev principal, agents IA, Docker (30 containers)',
    vcpu: 24,
    ram: '64 Go',
    disk: '120 Go',
    diskUsage: 51,
    status: 'up',
    sshUser: 'r2d2helm',
    services: ['Docker (30)', 'Claude Code', 'Cloudflare Tunnel', 'Mem0', 'Neo4j'],
    description: 'Machine principale — orchestrateur, dev, 30 containers Docker, agents IA, tunnel Cloudflare.',
  },
  {
    id: 'stage',
    name: 'r2d2-stage',
    vmid: 100,
    ip: '192.168.1.162',
    role: 'Test/validation, CI runner, E2E Playwright',
    vcpu: 8,
    ram: '16 Go',
    disk: '120 Go',
    diskUsage: 15,
    status: 'up',
    sshUser: 'r2d2helm',
    services: ['Playwright', 'Uptime Kuma', 'Staging App'],
    description: 'Environnement de staging — tests E2E Playwright (55 tests), Uptime Kuma (22 monitors), CI runner.',
  },
  {
    id: 'store',
    name: 'r2d2-store',
    vmid: 104,
    ip: '192.168.1.164',
    role: 'NFS server, PostgreSQL partagé, rsyslog central',
    vcpu: 6,
    ram: '4 Go',
    disk: '32 Go',
    diskUsage: 24,
    status: 'up',
    sshUser: 'r2d2helm',
    services: ['NFS Server', 'PostgreSQL', 'rsyslog', 'Beszel'],
    description: 'Stockage partagé — serveur NFS (vault Obsidian), PostgreSQL mutualisé, logs centralisés rsyslog.',
  },
  {
    id: 'lab',
    name: 'r2d2-lab',
    vmid: 105,
    ip: '192.168.1.161',
    role: 'Sandbox on-demand, expérimentation',
    vcpu: 8,
    ram: '32 Go',
    disk: '32 Go',
    diskUsage: 0,
    status: 'stopped',
    sshUser: 'r2d2helm',
    services: ['Agent Teams (experimental)'],
    description: 'Sandbox isolé — démarré à la demande pour expérimentation, agent teams Anthropic.',
  },
  {
    id: 'monitor',
    name: 'r2d2-monitor',
    vmid: 101,
    ip: '192.168.1.101',
    role: 'Watchdog externe, recovery Proxmox',
    vcpu: 2,
    ram: '4 Go',
    disk: '32 Go',
    diskUsage: 9,
    status: 'up',
    sshUser: 'mint',
    services: ['Watchdog cron', 'Proxmox API recovery'],
    description: 'Sentinelle externe — surveille r2d2-main via ping/SSH, déclenche recovery via API Proxmox si panne.',
  },
  {
    id: 'proxmox',
    name: 'Proxmox VE',
    vmid: 0,
    ip: '192.168.1.215',
    role: 'Hyperviseur, gestion VMs',
    vcpu: 0,
    ram: '128 Go',
    disk: '2 To',
    diskUsage: 35,
    status: 'up',
    sshUser: 'root',
    services: ['Proxmox VE 8', 'API REST', 'Storage ZFS'],
    description: 'Dell R740 — hyperviseur Proxmox VE 8, héberge toutes les VMs, stockage ZFS, API de gestion.',
  },
]

export const NETWORK_LINKS: NetworkLink[] = [
  { id: 'main-store-nfs', source: 'main', target: 'store', protocol: 'NFS', port: 2049, label: 'Vault Obsidian', bidirectional: false },
  { id: 'stage-store-nfs', source: 'stage', target: 'store', protocol: 'NFS', port: 2049, label: 'Vault mount', bidirectional: false },
  { id: 'main-stage-ssh', source: 'main', target: 'stage', protocol: 'SSH', port: 22, label: 'E2E tests + deploy', bidirectional: false },
  { id: 'main-store-rsyslog', source: 'main', target: 'store', protocol: 'TCP', port: 514, label: 'Logs centralisés', bidirectional: false },
  { id: 'stage-store-rsyslog', source: 'stage', target: 'store', protocol: 'TCP', port: 514, label: 'Logs centralisés', bidirectional: false },
  { id: 'monitor-main-ping', source: 'monitor', target: 'main', protocol: 'ICMP+SSH', port: 22, label: 'Watchdog health', bidirectional: false },
  { id: 'monitor-proxmox-api', source: 'monitor', target: 'proxmox', protocol: 'HTTPS', port: 8006, label: 'Recovery API', bidirectional: false },
  { id: 'main-proxmox', source: 'proxmox', target: 'main', protocol: 'VM', port: 0, label: 'VMID 103', bidirectional: false },
  { id: 'stage-proxmox', source: 'proxmox', target: 'stage', protocol: 'VM', port: 0, label: 'VMID 100', bidirectional: false },
  { id: 'store-proxmox', source: 'proxmox', target: 'store', protocol: 'VM', port: 0, label: 'VMID 104', bidirectional: false },
  { id: 'lab-proxmox', source: 'proxmox', target: 'lab', protocol: 'VM', port: 0, label: 'VMID 105', bidirectional: false },
  { id: 'monitor-proxmox-vm', source: 'proxmox', target: 'monitor', protocol: 'VM', port: 0, label: 'VMID 101', bidirectional: false },
  { id: 'main-gdrive', source: 'main', target: 'store', protocol: 'rclone', port: 443, label: 'Backup offsite GDrive', bidirectional: false },
]

export const CRON_JOBS: CronJob[] = [
  { schedule: '*/5 * * * *', label: 'Monitoring', description: '44 checks, alertes ntfy', category: 'monitoring' },
  { schedule: '*/15 * * * *', label: 'Rsync vault', description: 'NFS → local sync', category: 'sync' },
  { schedule: '*/30 * * * *', label: 'E2E tests', description: '55 tests Playwright via stage', category: 'test' },
  { schedule: '0 3 * * *', label: 'Backup MultiPass', description: 'DB dump PostgreSQL', category: 'backup' },
  { schedule: '15 3 * * *', label: 'Backup shared', description: 'pai_shared + supabase + neo4j', category: 'backup' },
  { schedule: '0 4 * * *', label: 'Mem0 indexation', description: 'Vault → embeddings', category: 'sync' },
  { schedule: '30 4 * * *', label: 'Backup offsite', description: 'rclone → Google Drive', category: 'backup' },
  { schedule: '45 4 * * *', label: 'Warehouse index', description: 'Mem0 warehouse fiches', category: 'sync' },
  { schedule: '0 5 * * *', label: 'Health check', description: '5 VMs + GDrive quota', category: 'maintenance' },
  { schedule: '0 6 1 * *', label: 'Test restore', description: 'Mensuel — 4 backups testés', category: 'test' },
  { schedule: '0 2 * * 0', label: 'Docker cleanup', description: 'Prune images, volumes orphelins', category: 'maintenance' },
  { schedule: '0 7 * * 1', label: 'Upstream scan', description: 'Repos Miessler + Dynamous', category: 'sync' },
]

export const VM_POSITIONS: Record<string, { x: number; y: number }> = {
  proxmox:  { x: 400, y: 50 },
  main:     { x: 200, y: 220 },
  stage:    { x: 500, y: 220 },
  store:    { x: 350, y: 400 },
  lab:      { x: 100, y: 400 },
  monitor:  { x: 600, y: 400 },
}
