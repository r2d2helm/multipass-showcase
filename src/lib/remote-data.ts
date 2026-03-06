export interface RemoteChannel {
  id: string
  titleKey: string
  descKey: string
  icon: string
  protocol: string
  targets: string[]
}

export interface RemoteCommand {
  id: string
  category: string
  titleKey: string
  command: string
  descKey: string
  target: string
}

export interface RemoteWorkflow {
  id: string
  titleKey: string
  descKey: string
  stepsKeys: string[]
  resultKey: string
  duration: string
}

export const REMOTE_CHANNELS: RemoteChannel[] = [
  {
    id: 'ssh',
    titleKey: 'remote.ch.ssh',
    descKey: 'remote.ch.ssh.desc',
    icon: 'Terminal',
    protocol: 'SSH',
    targets: ['r2d2-main (.163)', 'r2d2-stage (.162)', 'r2d2-store (.164)', 'r2d2-lab (.161)'],
  },
  {
    id: 'tunnel',
    titleKey: 'remote.ch.tunnel',
    descKey: 'remote.ch.tunnel.desc',
    icon: 'Globe',
    protocol: 'HTTPS',
    targets: ['multipass.agency', 'octopus.watch', 'api.multipass.agency'],
  },
  {
    id: 'ntfy',
    titleKey: 'remote.ch.ntfy',
    descKey: 'remote.ch.ntfy.desc',
    icon: 'Bell',
    protocol: 'HTTP Push',
    targets: ['Mobile', 'Desktop', 'CLI'],
  },
  {
    id: 'proxmox',
    titleKey: 'remote.ch.proxmox',
    descKey: 'remote.ch.proxmox.desc',
    icon: 'Server',
    protocol: 'API REST',
    targets: ['proxmox (.215)', 'VMs start/stop', 'Snapshots'],
  },
  {
    id: 'claude',
    titleKey: 'remote.ch.claude',
    descKey: 'remote.ch.claude.desc',
    icon: 'Bot',
    protocol: 'Claude Code',
    targets: ['r2d2-main (agent)', 'r2d2-stage (E2E)', 'r2d2-lab (sandbox)'],
  },
  {
    id: 'voice',
    titleKey: 'remote.ch.voice',
    descKey: 'remote.ch.voice.desc',
    icon: 'Mic',
    protocol: 'ElevenLabs MCP',
    targets: ['Commandes vocales', 'Phase announcements', 'Alertes'],
  },
]

export const REMOTE_COMMANDS: RemoteCommand[] = [
  { id: 'rc1', category: 'deploy', titleKey: 'remote.cmd.deploy', command: 'ssh r2d2-stage "cd ~/e2e-tests && npx playwright test"', descKey: 'remote.cmd.deploy.desc', target: 'r2d2-stage' },
  { id: 'rc2', category: 'deploy', titleKey: 'remote.cmd.rebuild', command: 'ssh r2d2-main "cd ~/multipass-site/MultiPass-Agency && docker compose up -d --build"', descKey: 'remote.cmd.rebuild.desc', target: 'r2d2-main' },
  { id: 'rc3', category: 'monitor', titleKey: 'remote.cmd.health', command: 'for vm in main stage store; do ssh r2d2-$vm "uptime && df -h /"; done', descKey: 'remote.cmd.health.desc', target: 'all VMs' },
  { id: 'rc4', category: 'monitor', titleKey: 'remote.cmd.docker', command: 'ssh r2d2-main "docker ps --format \'{{.Names}}\\t{{.Status}}\' | column -t"', descKey: 'remote.cmd.docker.desc', target: 'r2d2-main' },
  { id: 'rc5', category: 'monitor', titleKey: 'remote.cmd.logs', command: 'ssh r2d2-store "tail -50 /var/log/remote/r2d2-main/*.log"', descKey: 'remote.cmd.logs.desc', target: 'r2d2-store' },
  { id: 'rc6', category: 'backup', titleKey: 'remote.cmd.backup.check', command: 'ssh r2d2-main "ls -lh /mnt/shared/backups/ | tail -10"', descKey: 'remote.cmd.backup.desc', target: 'r2d2-main' },
  { id: 'rc7', category: 'backup', titleKey: 'remote.cmd.gdrive', command: 'ssh r2d2-main "rclone size gdrive:r2d2-backups/"', descKey: 'remote.cmd.gdrive.desc', target: 'r2d2-main' },
  { id: 'rc8', category: 'agent', titleKey: 'remote.cmd.agent.team', command: 'claude -p "create an agent team for security audit"', descKey: 'remote.cmd.agent.desc', target: 'r2d2-main' },
  { id: 'rc9', category: 'agent', titleKey: 'remote.cmd.research', command: 'claude -p "research extensive: latest RAG patterns 2026"', descKey: 'remote.cmd.research.desc', target: 'r2d2-main' },
  { id: 'rc10', category: 'infra', titleKey: 'remote.cmd.vm.start', command: 'curl -s -X POST https://proxmox:8006/api2/json/nodes/pve/qemu/105/status/start', descKey: 'remote.cmd.vm.desc', target: 'proxmox' },
  { id: 'rc11', category: 'infra', titleKey: 'remote.cmd.tunnel', command: 'ssh r2d2-main "systemctl --user status cloudflared"', descKey: 'remote.cmd.tunnel.desc', target: 'r2d2-main' },
  { id: 'rc12', category: 'infra', titleKey: 'remote.cmd.ntfy', command: 'curl -d "Deploy complete" ntfy.sh/r2d2-alerts', descKey: 'remote.cmd.ntfy.desc', target: 'ntfy' },
]

export const REMOTE_WORKFLOWS: RemoteWorkflow[] = [
  {
    id: 'wf1',
    titleKey: 'remote.wf.deploy.title',
    descKey: 'remote.wf.deploy.desc',
    stepsKeys: ['remote.wf.deploy.s1', 'remote.wf.deploy.s2', 'remote.wf.deploy.s3', 'remote.wf.deploy.s4'],
    resultKey: 'remote.wf.deploy.result',
    duration: '~5 min',
  },
  {
    id: 'wf2',
    titleKey: 'remote.wf.incident.title',
    descKey: 'remote.wf.incident.desc',
    stepsKeys: ['remote.wf.incident.s1', 'remote.wf.incident.s2', 'remote.wf.incident.s3', 'remote.wf.incident.s4'],
    resultKey: 'remote.wf.incident.result',
    duration: '~2 min',
  },
  {
    id: 'wf3',
    titleKey: 'remote.wf.sandbox.title',
    descKey: 'remote.wf.sandbox.desc',
    stepsKeys: ['remote.wf.sandbox.s1', 'remote.wf.sandbox.s2', 'remote.wf.sandbox.s3', 'remote.wf.sandbox.s4'],
    resultKey: 'remote.wf.sandbox.result',
    duration: '~3 min',
  },
]

export const COMMAND_CATEGORIES: Record<string, { labelKey: string; color: string }> = {
  deploy: { labelKey: 'remote.cat.deploy', color: 'text-neon-purple' },
  monitor: { labelKey: 'remote.cat.monitor', color: 'text-success-green' },
  backup: { labelKey: 'remote.cat.backup', color: 'text-amber-warm' },
  agent: { labelKey: 'remote.cat.agent', color: 'text-electric-cyan' },
  infra: { labelKey: 'remote.cat.infra', color: 'text-coral-energy' },
}
