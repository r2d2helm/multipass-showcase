export interface ExternalProbe {
  id: string
  name: string
  source: string
  target: string
  method: string
  interval: string
  alertChannel: string
  status: 'active' | 'standby'
}

export interface RecoveryLayer {
  id: string
  name: string
  scope: string
  trigger: string
  actions: string[]
  rto: string // Recovery Time Objective
  automated: boolean
}

export interface ReconstructionAsset {
  id: string
  name: string
  category: 'config' | 'data' | 'service' | 'infra' | 'secret'
  location: string
  backup: string
  reconstructMethod: string
}

export interface IncidentScenario {
  id: string
  name: string
  severity: 'critical' | 'major' | 'minor'
  description: string
  detection: string
  recovery: string[]
  rto: string
  tested: boolean
}

export const EXTERNAL_PROBES: ExternalProbe[] = [
  // Uptime Kuma (stage .162)
  { id: 'kuma-app', name: 'MultiPass App', source: 'r2d2-stage', target: 'multipass.agency', method: 'HTTPS GET', interval: '60s', alertChannel: 'ntfy', status: 'active' },
  { id: 'kuma-api', name: 'Supabase API', source: 'r2d2-stage', target: 'api.multipass.agency', method: 'HTTPS GET', interval: '60s', alertChannel: 'ntfy', status: 'active' },
  { id: 'kuma-studio', name: 'Langfuse Studio', source: 'r2d2-stage', target: 'langfuse.multipass.agency', method: 'HTTPS GET', interval: '120s', alertChannel: 'ntfy', status: 'active' },
  { id: 'kuma-taskyn', name: 'Taskyn', source: 'r2d2-stage', target: 'taskyn.multipass.agency', method: 'HTTPS GET', interval: '120s', alertChannel: 'ntfy', status: 'active' },
  { id: 'kuma-netbox', name: 'NetBox', source: 'r2d2-stage', target: 'netbox.multipass.agency', method: 'HTTPS GET', interval: '120s', alertChannel: 'ntfy', status: 'active' },
  { id: 'kuma-showcase', name: 'Showcase', source: 'r2d2-stage', target: 'showcase.multipass.agency', method: 'HTTPS GET', interval: '120s', alertChannel: 'ntfy', status: 'active' },
  { id: 'kuma-octopus', name: 'Octopus Status', source: 'r2d2-stage', target: 'octopus.watch', method: 'HTTPS GET', interval: '60s', alertChannel: 'ntfy', status: 'active' },
  { id: 'kuma-logs', name: 'Dozzle Logs', source: 'r2d2-stage', target: 'logs.octopus.watch', method: 'HTTPS GET', interval: '120s', alertChannel: 'ntfy', status: 'active' },
  // Watchdog (monitor .101)
  { id: 'wd-ping', name: 'Main VM Ping', source: 'r2d2-monitor', target: '192.168.1.163', method: 'ICMP ping', interval: '60s', alertChannel: 'ntfy + Proxmox API', status: 'active' },
  { id: 'wd-ssh', name: 'Main VM SSH', source: 'r2d2-monitor', target: '192.168.1.163:22', method: 'SSH connect', interval: '60s', alertChannel: 'ntfy + Proxmox API', status: 'active' },
  { id: 'wd-proxmox', name: 'Proxmox API', source: 'r2d2-monitor', target: '192.168.1.215:8006', method: 'HTTPS API', interval: '300s', alertChannel: 'ntfy', status: 'active' },
  // Internal cron (main)
  { id: 'cron-44', name: '44 Health Checks', source: 'r2d2-main', target: 'all VMs + services', method: 'ping/curl/docker', interval: '*/5 min', alertChannel: 'ntfy', status: 'active' },
  { id: 'cron-e2e', name: 'E2E Regression', source: 'r2d2-main', target: 'r2d2-stage', method: 'SSH + Playwright', interval: '*/30 min', alertChannel: 'ntfy', status: 'active' },
  { id: 'cron-backup', name: 'Backup Freshness', source: 'r2d2-main', target: '/mnt/shared/backups/', method: 'file age check', interval: '*/5 min', alertChannel: 'ntfy', status: 'active' },
  { id: 'cron-gdrive', name: 'GDrive Quota', source: 'r2d2-main', target: 'Google Drive', method: 'rclone about', interval: 'daily 5h', alertChannel: 'ntfy', status: 'active' },
]

export const RECOVERY_LAYERS: RecoveryLayer[] = [
  {
    id: 'l1-container',
    name: 'Container Recovery',
    scope: 'Un container Docker unhealthy',
    trigger: 'Health check fail (cron */5)',
    actions: [
      'Detection via docker inspect health status',
      'docker compose restart du service',
      'Verification health post-restart',
      'Alerte ntfy si echec apres 3 tentatives',
    ],
    rto: '< 2 min',
    automated: true,
  },
  {
    id: 'l2-stack',
    name: 'Stack Recovery',
    scope: 'Stack Docker complete (ex: MultiPass 15 containers)',
    trigger: 'Multiple containers down ou corruption',
    actions: [
      'docker compose down de la stack',
      'Verification volumes et networks',
      'docker compose up -d --build',
      'Health check de tous les containers',
      'E2E smoke test automatique',
    ],
    rto: '< 5 min',
    automated: true,
  },
  {
    id: 'l3-vm',
    name: 'VM Recovery',
    scope: 'VM r2d2-main inaccessible',
    trigger: 'Watchdog ping + SSH fail (3x)',
    actions: [
      'r2d2-monitor detecte via ICMP + SSH',
      'Appel API Proxmox POST /nodes/pve/qemu/103/status/start',
      'Attente boot VM (~30s)',
      'Verification SSH accessible',
      'Docker auto-start via systemd',
      'Health check global (44 checks)',
    ],
    rto: '< 3 min',
    automated: true,
  },
  {
    id: 'l4-data',
    name: 'Data Recovery',
    scope: 'Corruption ou perte de donnees',
    trigger: 'Detection manuelle ou backup check fail',
    actions: [
      'Identification du dernier backup sain',
      'Restore depuis /mnt/shared/backups/ (local NFS)',
      'Ou restore depuis Google Drive (offsite)',
      'Verification integrite post-restore',
      'Reconciliation des donnees manquantes',
    ],
    rto: '< 15 min',
    automated: false,
  },
  {
    id: 'l5-full',
    name: 'Full Ecosystem Reconstruction',
    scope: 'Perte totale r2d2-main + donnees locales',
    trigger: 'Catastrophe (disk failure, corruption totale)',
    actions: [
      'Provision nouvelle VM via Proxmox API',
      'Bootstrap OS (Ubuntu, SSH keys, base packages)',
      'Restore ~/.claude/ (hooks, skills, agents, config)',
      'Restore Docker stacks depuis git repos',
      'Restore databases depuis GDrive offsite backup',
      'Restore NFS vault depuis r2d2-store',
      'Reconfigurer Cloudflare Tunnel + Traefik',
      'Relancer 30 containers Docker',
      'Reindexer Mem0 (vault + warehouse)',
      'Valider E2E suite complete (55 tests)',
    ],
    rto: '< 60 min',
    automated: false,
  },
]

export const RECONSTRUCTION_ASSETS: ReconstructionAsset[] = [
  // Configs
  { id: 'a-claude', name: 'PAI System (hooks, skills, agents)', category: 'config', location: '~/.claude/', backup: 'Git repo + GDrive', reconstructMethod: 'git clone + restore config' },
  { id: 'a-docker', name: 'Docker Compose Stacks (7)', category: 'config', location: '~/docker/ + ~/multipass-site/', backup: 'Git repos', reconstructMethod: 'git clone + docker compose up' },
  { id: 'a-traefik', name: 'Traefik Routes + Certs', category: 'config', location: '~/docker/traefik/', backup: 'Git + GDrive certs', reconstructMethod: 'Restore config + Origin CA certs' },
  { id: 'a-crons', name: 'Cron Jobs (12)', category: 'config', location: 'crontab -l', backup: 'Git repo ~/bin/', reconstructMethod: 'Restore scripts + crontab -e' },
  { id: 'a-tunnel', name: 'Cloudflare Tunnel', category: 'config', location: '~/.cloudflared/', backup: 'GDrive credentials', reconstructMethod: 'cloudflared tunnel login + config restore' },
  // Data
  { id: 'a-postgres', name: 'PostgreSQL (MultiPass + shared)', category: 'data', location: 'r2d2-store :5432', backup: 'Daily dump 3h AM + GDrive', reconstructMethod: 'pg_restore depuis backup' },
  { id: 'a-neo4j', name: 'Neo4j Graph (2390 nodes)', category: 'data', location: 'localhost:7687', backup: 'Daily dump + GDrive', reconstructMethod: 'neo4j-admin restore' },
  { id: 'a-vault', name: 'Obsidian Vault (575+ notes)', category: 'data', location: '/mnt/shared/vault/', backup: 'NFS sur store + GDrive', reconstructMethod: 'Deja sur NFS (survit a crash main)' },
  { id: 'a-mem0', name: 'Mem0 Embeddings (813+ chunks)', category: 'data', location: 'pgvector + Neo4j', backup: 'Reindexable depuis vault', reconstructMethod: 'bun index_vault.py (~6h bulk)' },
  // Services
  { id: 'a-multipass', name: 'MultiPass Agency (15 containers)', category: 'service', location: '~/multipass-site/MultiPass-Agency/', backup: 'GitHub repo prive', reconstructMethod: 'git pull + docker compose up --build' },
  { id: 'a-monitoring', name: 'Monitoring Stack (5 containers)', category: 'service', location: '/opt/monitoring/', backup: 'Git + config files', reconstructMethod: 'docker compose up + restore config' },
  { id: 'a-kuma', name: 'Uptime Kuma (22 monitors)', category: 'service', location: 'r2d2-stage', backup: 'SQLite volume', reconstructMethod: 'Survit (sur stage, pas main)' },
  // Infra
  { id: 'a-ufw', name: 'UFW Firewall Rules', category: 'infra', location: '/etc/ufw/', backup: 'Documente dans MEMORY.md', reconstructMethod: 'ufw allow rules depuis doc' },
  { id: 'a-nfs', name: 'NFS Mounts', category: 'infra', location: '/etc/fstab', backup: 'Documente', reconstructMethod: 'mount -t nfs store:/srv/shared /mnt/shared' },
  { id: 'a-systemd', name: 'Systemd User Services', category: 'infra', location: '~/.config/systemd/user/', backup: 'Git + GDrive', reconstructMethod: 'Restore unit files + systemctl enable' },
  // Secrets
  { id: 'a-env', name: 'Environment Variables (.env)', category: 'secret', location: 'Multiples .env files', backup: 'GDrive (chiffre)', reconstructMethod: 'Restore depuis backup chiffre' },
  { id: 'a-ssh', name: 'SSH Keys', category: 'secret', location: '~/.ssh/', backup: 'GDrive (chiffre)', reconstructMethod: 'Restore + chmod 600' },
  { id: 'a-certs', name: 'Origin CA Certificates', category: 'secret', location: '~/docker/traefik/certs/', backup: 'GDrive (chiffre)', reconstructMethod: 'Restore PEM files' },
]

export const INCIDENT_SCENARIOS: IncidentScenario[] = [
  {
    id: 'inc-disk', name: 'Disk Full (100%)', severity: 'critical',
    description: 'Build cache ou logs remplissent le disque, VM freeze',
    detection: 'Cron */5 seuils gradues 70%/85%, re-alerte 30min',
    recovery: ['docker system prune', 'logrotate --force', 'Identifier source (build cache, logs)', 'Verifier seuils post-cleanup'],
    rto: '< 5 min', tested: true,
  },
  {
    id: 'inc-oom', name: 'OOM Kill Container', severity: 'major',
    description: 'Container depasse memory limit, killed par kernel',
    detection: 'docker inspect + cron health check',
    recovery: ['Identifier container (dmesg | grep oom)', 'docker compose restart', 'Ajuster memory_limit si recurrent'],
    rto: '< 2 min', tested: true,
  },
  {
    id: 'inc-vm-crash', name: 'VM Main Crash', severity: 'critical',
    description: 'r2d2-main inaccessible (kernel panic, hardware)',
    detection: 'Watchdog r2d2-monitor (ICMP+SSH fail 3x)',
    recovery: ['API Proxmox restart VMID 103', 'Boot VM (~30s)', 'Docker auto-start systemd', 'Health check 44 validations'],
    rto: '< 3 min', tested: true,
  },
  {
    id: 'inc-tunnel', name: 'Cloudflare Tunnel Down', severity: 'major',
    description: 'cloudflared crash, site inaccessible depuis Internet',
    detection: 'Uptime Kuma (stage) detecte HTTPS fail',
    recovery: ['systemctl --user restart cloudflared', 'Verifier config tunnel', 'Test curl multipass.agency'],
    rto: '< 1 min', tested: true,
  },
  {
    id: 'inc-db', name: 'PostgreSQL Corruption', severity: 'critical',
    description: 'Database corrompue ou inaccessible',
    detection: 'App errors + health check fail',
    recovery: ['Stop services dependants', 'pg_restore depuis dernier backup sain', 'Verifier integrite donnees', 'Restart services'],
    rto: '< 15 min', tested: true,
  },
  {
    id: 'inc-nfs', name: 'NFS Mount Lost', severity: 'major',
    description: 'r2d2-store inaccessible, vault NFS deconnecte',
    detection: 'Cron rsync fail + stale mount detection',
    recovery: ['Ping store (.164)', 'umount -l /mnt/shared', 'mount -a', 'Verifier vault accessible'],
    rto: '< 2 min', tested: true,
  },
  {
    id: 'inc-total', name: 'Full Ecosystem Loss', severity: 'critical',
    description: 'Perte totale r2d2-main (disk failure irrecuperable)',
    detection: 'Watchdog + Uptime Kuma double detection',
    recovery: ['Provision VM Proxmox', 'Bootstrap OS + packages', 'Restore configs depuis Git', 'Restore data depuis GDrive offsite', 'Rebuild Docker stacks', 'Reindex Mem0'],
    rto: '< 60 min', tested: true,
  },
]

export const CATEGORY_ICONS: Record<string, string> = {
  config: '⚙️',
  data: '💾',
  service: '🐳',
  infra: '🔧',
  secret: '🔐',
}

export const SEVERITY_COLORS: Record<string, string> = {
  critical: '#FF6B6B',
  major: '#FBBF24',
  minor: '#4ADE80',
}
