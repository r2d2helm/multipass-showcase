export interface EcoNode {
  id: string
  labelKey: string
  icon: string
  color: string
  x: number  // percentage position
  y: number
  size: 'lg' | 'md' | 'sm'
  descKey: string
  stats: { labelKey: string; value: string }[]
}

export interface EcoEdge {
  from: string
  to: string
  labelKey: string
  protocol: string
  color: string
  animated: boolean
  bidirectional: boolean
}

export const ECO_NODES: EcoNode[] = [
  {
    id: 'pai',
    labelKey: 'eco.node.pai',
    icon: 'Brain',
    color: '#F472B6',
    x: 50, y: 18,
    size: 'lg',
    descKey: 'eco.node.pai.desc',
    stats: [
      { labelKey: 'eco.stat.agents', value: '13' },
      { labelKey: 'eco.stat.subagents', value: '28' },
      { labelKey: 'eco.stat.skills', value: '37' },
      { labelKey: 'eco.stat.hooks', value: '22' },
    ],
  },
  {
    id: 'multipass',
    labelKey: 'eco.node.multipass',
    icon: 'Globe',
    color: '#00D4FF',
    x: 82, y: 35,
    size: 'lg',
    descKey: 'eco.node.multipass.desc',
    stats: [
      { labelKey: 'eco.stat.routes', value: '30' },
      { labelKey: 'eco.stat.tests', value: '663' },
      { labelKey: 'eco.stat.containers', value: '15' },
    ],
  },
  {
    id: 'docker',
    labelKey: 'eco.node.docker',
    icon: 'Box',
    color: '#8B5CF6',
    x: 18, y: 35,
    size: 'md',
    descKey: 'eco.node.docker.desc',
    stats: [
      { labelKey: 'eco.stat.containers', value: '30' },
      { labelKey: 'eco.stat.stacks', value: '7' },
      { labelKey: 'eco.stat.healthchecks', value: '29' },
    ],
  },
  {
    id: 'knowledge',
    labelKey: 'eco.node.knowledge',
    icon: 'BookOpen',
    color: '#FBBF24',
    x: 75, y: 65,
    size: 'md',
    descKey: 'eco.node.knowledge.desc',
    stats: [
      { labelKey: 'eco.stat.notes', value: '575+' },
      { labelKey: 'eco.stat.chunks', value: '813' },
      { labelKey: 'eco.stat.graphnodes', value: '2390' },
    ],
  },
  {
    id: 'monitoring',
    labelKey: 'eco.node.monitoring',
    icon: 'ShieldCheck',
    color: '#4ADE80',
    x: 25, y: 65,
    size: 'md',
    descKey: 'eco.node.monitoring.desc',
    stats: [
      { labelKey: 'eco.stat.checks', value: '49' },
      { labelKey: 'eco.stat.monitors', value: '22' },
      { labelKey: 'eco.stat.watchdog', value: '1' },
    ],
  },
  {
    id: 'infra',
    labelKey: 'eco.node.infra',
    icon: 'Server',
    color: '#FF6B6B',
    x: 50, y: 85,
    size: 'md',
    descKey: 'eco.node.infra.desc',
    stats: [
      { labelKey: 'eco.stat.vms', value: '6' },
      { labelKey: 'eco.stat.vcpu', value: '48' },
      { labelKey: 'eco.stat.ram', value: '120G' },
    ],
  },
  {
    id: 'cicd',
    labelKey: 'eco.node.cicd',
    icon: 'GitBranch',
    color: '#F97316',
    x: 50, y: 50,
    size: 'sm',
    descKey: 'eco.node.cicd.desc',
    stats: [
      { labelKey: 'eco.stat.pipeline', value: 'GH Actions' },
      { labelKey: 'eco.stat.e2e', value: '55' },
      { labelKey: 'eco.stat.crons', value: '12' },
    ],
  },
]

export const ECO_EDGES: EcoEdge[] = [
  // PAI -> MultiPass (PAI drives development)
  { from: 'pai', to: 'multipass', labelKey: 'eco.edge.pai_multipass', protocol: 'Claude Code SDK', color: '#F472B6', animated: true, bidirectional: false },
  // PAI -> Knowledge (PAI reads/writes knowledge)
  { from: 'pai', to: 'knowledge', labelKey: 'eco.edge.pai_knowledge', protocol: 'MCP + NFS', color: '#FBBF24', animated: true, bidirectional: true },
  // PAI -> Docker (PAI manages containers)
  { from: 'pai', to: 'docker', labelKey: 'eco.edge.pai_docker', protocol: 'Docker CLI', color: '#8B5CF6', animated: true, bidirectional: false },
  // PAI -> CI/CD (PAI triggers pipelines)
  { from: 'pai', to: 'cicd', labelKey: 'eco.edge.pai_cicd', protocol: 'Git + GH Actions', color: '#F97316', animated: true, bidirectional: false },
  // MultiPass -> Docker (runs on Docker)
  { from: 'multipass', to: 'docker', labelKey: 'eco.edge.multipass_docker', protocol: 'Docker Compose', color: '#00D4FF', animated: true, bidirectional: false },
  // MultiPass -> Knowledge (content from vault)
  { from: 'multipass', to: 'knowledge', labelKey: 'eco.edge.multipass_knowledge', protocol: 'Supabase + API', color: '#FBBF24', animated: false, bidirectional: true },
  // Monitoring -> Docker (monitors containers)
  { from: 'monitoring', to: 'docker', labelKey: 'eco.edge.monitoring_docker', protocol: 'Docker API', color: '#4ADE80', animated: true, bidirectional: false },
  // Monitoring -> Infra (monitors VMs)
  { from: 'monitoring', to: 'infra', labelKey: 'eco.edge.monitoring_infra', protocol: 'SSH + ICMP', color: '#4ADE80', animated: true, bidirectional: false },
  // Monitoring -> MultiPass (Uptime Kuma)
  { from: 'monitoring', to: 'multipass', labelKey: 'eco.edge.monitoring_multipass', protocol: 'HTTP Probes', color: '#4ADE80', animated: false, bidirectional: false },
  // Docker -> Infra (runs on VMs)
  { from: 'docker', to: 'infra', labelKey: 'eco.edge.docker_infra', protocol: 'Proxmox VMs', color: '#8B5CF6', animated: false, bidirectional: false },
  // Knowledge -> Infra (NFS storage)
  { from: 'knowledge', to: 'infra', labelKey: 'eco.edge.knowledge_infra', protocol: 'NFS Mount', color: '#FBBF24', animated: false, bidirectional: false },
  // CI/CD -> MultiPass (deploys)
  { from: 'cicd', to: 'multipass', labelKey: 'eco.edge.cicd_multipass', protocol: 'Self-hosted Runner', color: '#F97316', animated: true, bidirectional: false },
  // CI/CD -> Monitoring (E2E reports)
  { from: 'cicd', to: 'monitoring', labelKey: 'eco.edge.cicd_monitoring', protocol: 'ntfy Alerts', color: '#F97316', animated: false, bidirectional: false },
  // PAI -> Monitoring (reads alerts)
  { from: 'pai', to: 'monitoring', labelKey: 'eco.edge.pai_monitoring', protocol: 'Logs + Alerts', color: '#4ADE80', animated: false, bidirectional: true },
]
