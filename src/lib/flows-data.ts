export type FlowActor = 'mike' | 'r2d2' | 'main' | 'stage' | 'store' | 'proxmox' | 'cloudflare' | 'github'

export interface FlowStep {
  id: string
  from: FlowActor
  to: FlowActor
  action: string
  detail: string
  agents?: string[]
  services?: string[]
  protocol?: string
  phase: 'develop' | 'test' | 'deploy' | 'monitor' | 'backup'
}

export interface FlowScenario {
  id: string
  name: string
  description: string
  steps: FlowStep[]
}

export const ACTOR_CONFIG: Record<FlowActor, { name: string; color: string; type: 'human' | 'vm' | 'external' }> = {
  mike: { name: 'Mike', color: '#F8FAFC', type: 'human' },
  r2d2: { name: 'R2D2 (PAI)', color: '#8B5CF6', type: 'vm' },
  main: { name: 'r2d2-main', color: '#00D4FF', type: 'vm' },
  stage: { name: 'r2d2-stage', color: '#FBBF24', type: 'vm' },
  store: { name: 'r2d2-store', color: '#4ADE80', type: 'vm' },
  proxmox: { name: 'Proxmox VE', color: '#FF6B6B', type: 'vm' },
  cloudflare: { name: 'Cloudflare', color: '#F97316', type: 'external' },
  github: { name: 'GitHub', color: '#A78BFA', type: 'external' },
}

export const PHASE_CONFIG: Record<string, { label: string; color: string }> = {
  develop: { label: 'Development', color: '#8B5CF6' },
  test: { label: 'Testing', color: '#FBBF24' },
  deploy: { label: 'Deployment', color: '#4ADE80' },
  monitor: { label: 'Monitoring', color: '#00D4FF' },
  backup: { label: 'Backup', color: '#FF6B6B' },
}

export const FLOW_SCENARIOS: FlowScenario[] = [
  {
    id: 'dev-cycle',
    name: 'MultiPass Dev Cycle',
    description: 'Cycle complet de developpement d\'une feature MultiPass SaaS — du prompt utilisateur au deploiement production',
    steps: [
      // DEVELOP
      {
        id: 's1', from: 'mike', to: 'r2d2', phase: 'develop',
        action: 'Prompt utilisateur',
        detail: 'Mike decrit la feature via Claude Code CLI',
        agents: ['Orchestrator'],
      },
      {
        id: 's2', from: 'r2d2', to: 'r2d2', phase: 'develop',
        action: 'PAI Algorithm — OBSERVE',
        detail: 'Reverse engineering, ISC creation (8-12 word criteria), capability audit 25/25',
        agents: ['Orchestrator', 'Architect'],
        services: ['Memory v2', 'Mem0'],
      },
      {
        id: 's3', from: 'r2d2', to: 'main', phase: 'develop',
        action: 'Code implementation',
        detail: 'Engineer agent ecrit le code dans ~/multipass-site/MultiPass-Agency/',
        agents: ['Engineer', 'Skill Builder'],
        services: ['Docker (30 containers)', 'Next.js 15', 'Supabase'],
      },
      {
        id: 's4', from: 'main', to: 'store', phase: 'develop',
        action: 'Knowledge indexing',
        detail: 'Decisions et patterns indexes dans le vault Obsidian via NFS',
        agents: ['Knowledge Indexer'],
        services: ['NFS :2049', 'Mem0 embeddings'],
        protocol: 'NFS',
      },
      {
        id: 's5', from: 'main', to: 'store', phase: 'develop',
        action: 'Logs centralises',
        detail: 'Tous les logs Docker envoyes vers rsyslog central',
        services: ['rsyslog :514', 'journald'],
        protocol: 'TCP',
      },
      // TEST
      {
        id: 's6', from: 'main', to: 'main', phase: 'test',
        action: 'Tests unitaires (115 vitest)',
        detail: 'Quality Gate level 1 — structure check (tsc, ESLint) + unit tests',
        agents: ['Quality Gate'],
        services: ['vitest', 'tsc --noEmit'],
      },
      {
        id: 's7', from: 'main', to: 'stage', phase: 'test',
        action: 'E2E tests via SSH',
        detail: '55 tests Playwright executes sur r2d2-stage (~101s), script run-e2e-stage.sh',
        agents: ['Quality Gate'],
        services: ['Playwright 1.58', 'Chromium'],
        protocol: 'SSH :22',
      },
      {
        id: 's8', from: 'stage', to: 'main', phase: 'test',
        action: 'Resultats E2E',
        detail: '53/55 passed (2 skipped settings), rapport envoye via SSH',
        services: ['Supabase LAN :8000'],
        protocol: 'SSH',
      },
      // DEPLOY
      {
        id: 's9', from: 'main', to: 'github', phase: 'deploy',
        action: 'Git push origin main',
        detail: 'Code pousse vers repo prive r2d2helm/MultiPass-Agency',
        services: ['git', 'GitHub PAT'],
        protocol: 'HTTPS',
      },
      {
        id: 's10', from: 'github', to: 'github', phase: 'deploy',
        action: 'CI Pipeline (~1 min)',
        detail: 'GitHub Actions : lint + type-check + vitest (115 tests) sur ubuntu-latest',
        services: ['GitHub Actions'],
      },
      {
        id: 's11', from: 'github', to: 'main', phase: 'deploy',
        action: 'Self-hosted runner deploy',
        detail: 'Job deploy sur runner r2d2-main, docker compose build + restart (~4 min)',
        services: ['GitHub Runner', 'Docker Compose'],
        protocol: 'HTTPS',
      },
      {
        id: 's12', from: 'main', to: 'cloudflare', phase: 'deploy',
        action: 'Tunnel expose l\'app',
        detail: 'cloudflared tunnel route vers Traefik :443 → multipass.agency',
        services: ['cloudflared', 'Traefik'],
        protocol: 'HTTPS tunnel',
      },
      {
        id: 's13', from: 'r2d2', to: 'r2d2', phase: 'deploy',
        action: 'PAI Algorithm — VERIFY',
        detail: 'Verification mecanique de chaque ISC criterion, TaskUpdate completed',
        agents: ['Quality Gate', 'Browser Agent'],
        services: ['Playwright screenshots'],
      },
      // MONITOR
      {
        id: 's14', from: 'main', to: 'main', phase: 'monitor',
        action: 'Health checks (*/5 cron)',
        detail: '44 checks : VMs ping, Docker health, disk, services, backup freshness',
        services: ['cron-monitor-services.sh', 'ntfy'],
      },
      {
        id: 's15', from: 'stage', to: 'main', phase: 'monitor',
        action: 'Uptime Kuma (22 monitors)',
        detail: 'Monitoring HTTP externe sur octopus.watch, alertes ntfy',
        services: ['Uptime Kuma', 'ntfy'],
        protocol: 'HTTPS',
      },
      {
        id: 's16', from: 'main', to: 'stage', phase: 'monitor',
        action: 'E2E cron (*/30)',
        detail: 'Tests E2E automatiques toutes les 30 min, alerte si stale >60min',
        services: ['run-e2e-stage.sh'],
        protocol: 'SSH',
      },
      // BACKUP
      {
        id: 's17', from: 'main', to: 'store', phase: 'backup',
        action: 'Backup quotidien (3h AM)',
        detail: 'PostgreSQL dump + pai_shared + supabase + neo4j → NFS backups/',
        services: ['cron-backup-multipass.sh', 'pg_dump'],
        protocol: 'NFS',
      },
      {
        id: 's18', from: 'main', to: 'cloudflare', phase: 'backup',
        action: 'Backup offsite (4:30 AM)',
        detail: 'rclone sync vers Google Drive (25 Mo, 14.7 Go libres)',
        services: ['rclone', 'Google Drive'],
        protocol: 'HTTPS',
      },
      {
        id: 's19', from: 'main', to: 'main', phase: 'backup',
        action: 'Test restore mensuel',
        detail: '4 backups testes dans containers ephemeres, 4/4 OK',
        services: ['cron-test-restore.sh'],
      },
    ],
  },
  {
    id: 'warehouse-pipeline',
    name: 'Warehouse Fiche Creation',
    description: 'Pipeline de creation d\'une fiche knowledge — de la collecte web a la publication vault',
    steps: [
      {
        id: 'w1', from: 'mike', to: 'r2d2', phase: 'develop',
        action: 'Demande de fiche',
        detail: 'Mike demande une fiche sur un sujet technique',
        agents: ['Orchestrator'],
      },
      {
        id: 'w2', from: 'r2d2', to: 'main', phase: 'develop',
        action: 'WH Researcher collecte',
        detail: 'Web scraping, API calls, extraction de contenu source',
        agents: ['WH Researcher'],
        services: ['WebSearch', 'WebFetch', 'BrightData'],
      },
      {
        id: 'w3', from: 'main', to: 'main', phase: 'develop',
        action: 'WH Analyst structure',
        detail: 'Analyse, categorisation, extraction des insights cles',
        agents: ['WH Analyst'],
        services: ['Fabric patterns', 'ExtractWisdom'],
      },
      {
        id: 'w4', from: 'main', to: 'main', phase: 'develop',
        action: 'WH Writer redige',
        detail: 'Redaction de la fiche selon les conventions vault Obsidian',
        agents: ['WH Writer'],
      },
      {
        id: 'w5', from: 'main', to: 'main', phase: 'test',
        action: 'WH QA valide',
        detail: 'Validation qualite, sources, formatting, accuracy',
        agents: ['WH QA'],
      },
      {
        id: 'w6', from: 'main', to: 'store', phase: 'deploy',
        action: 'Publication vault NFS',
        detail: 'Fiche ecrite dans /mnt/shared/vault/, MOC mis a jour',
        agents: ['WH Publisher'],
        services: ['NFS :2049', 'Obsidian vault'],
        protocol: 'NFS',
      },
      {
        id: 'w7', from: 'main', to: 'main', phase: 'deploy',
        action: 'Indexation Mem0',
        detail: 'Fiche indexee dans Mem0 (user_id=warehouse), embeddings generes',
        agents: ['WH Publisher'],
        services: ['Mem0 :8050', 'Neo4j :7687'],
      },
    ],
  },
  {
    id: 'incident-recovery',
    name: 'Incident & Recovery',
    description: 'Scenario de panne r2d2-main — detection, recovery automatique, et retour a la normale',
    steps: [
      {
        id: 'i1', from: 'main', to: 'main', phase: 'monitor',
        action: 'Panne r2d2-main',
        detail: 'VM crash (ex: disk 100%, OOM, kernel panic)',
      },
      {
        id: 'i2', from: 'stage', to: 'main', phase: 'monitor',
        action: 'Uptime Kuma detecte',
        detail: 'Monitors HTTP echouent, alerte ntfy envoyee a Mike',
        services: ['Uptime Kuma', 'ntfy'],
      },
      {
        id: 'i3', from: 'proxmox', to: 'main', phase: 'monitor',
        action: 'Watchdog externe ping fail',
        detail: 'r2d2-monitor detecte ping + SSH fail sur .163 (3x)',
        services: ['cron watchdog', 'ICMP+SSH'],
        protocol: 'ICMP+SSH',
      },
      {
        id: 'i4', from: 'proxmox', to: 'proxmox', phase: 'deploy',
        action: 'Recovery API Proxmox',
        detail: 'Watchdog appelle API Proxmox :8006 pour restart VMID 103',
        services: ['Proxmox API REST'],
        protocol: 'HTTPS :8006',
      },
      {
        id: 'i5', from: 'main', to: 'main', phase: 'deploy',
        action: 'VM boot + services restart',
        detail: 'systemd demarre Docker (30 containers), cloudflared, Mem0',
        services: ['systemd', 'Docker', 'cloudflared'],
      },
      {
        id: 'i6', from: 'main', to: 'main', phase: 'monitor',
        action: 'Health check confirme',
        detail: 'cron */5 revalide 44 checks, ntfy notification "all clear"',
        services: ['cron-monitor-services.sh', 'ntfy'],
      },
      {
        id: 'i7', from: 'main', to: 'store', phase: 'monitor',
        action: 'Logs incident archives',
        detail: 'rsyslog envoie les logs de crash vers store pour analyse post-mortem',
        services: ['rsyslog :514'],
        protocol: 'TCP',
      },
    ],
  },
]
