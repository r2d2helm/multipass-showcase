export interface AlgorithmPhase {
  id: string
  name: string
  emoji: string
  description: string
  color: string
}

export interface AgentDef {
  id: string
  name: string
  team: string
  role: string
  description: string
}

export interface SkillDef {
  id: string
  name: string
  prefix: string
  commands: number
  wizards: number
  category: 'infra' | 'data' | 'ops' | 'utils' | 'meta' | 'cao' | 'pm'
  description: string
}

export interface HookDef {
  id: string
  name: string
  event: string
  description: string
}

export const ALGORITHM_PHASES: AlgorithmPhase[] = [
  { id: 'observe', name: 'OBSERVE', emoji: '👁️', description: 'Reverse engineering, ISC creation, capability audit', color: '#00D4FF' },
  { id: 'think', name: 'THINK', emoji: '🧠', description: 'Pressure test, pre-mortem, criteria refinement', color: '#8B5CF6' },
  { id: 'plan', name: 'PLAN', emoji: '📋', description: 'PRD creation, execution strategy, file manifest', color: '#FBBF24' },
  { id: 'build', name: 'BUILD', emoji: '🔨', description: 'Create artifacts, ISC adherence check', color: '#4ADE80' },
  { id: 'execute', name: 'EXECUTE', emoji: '⚡', description: 'Run work, continuous verify, edge cases', color: '#FF6B6B' },
  { id: 'verify', name: 'VERIFY', emoji: '✅', description: 'Mechanical verification, completion gate', color: '#00D4FF' },
  { id: 'learn', name: 'LEARN', emoji: '📚', description: 'Reflection, wisdom frames, PRD update', color: '#8B5CF6' },
]

export const AGENTS: AgentDef[] = [
  // Governance
  { id: 'orchestrator', name: 'Orchestrator', team: 'Governance', role: 'Lead', description: 'Dispatches tasks, coordinates teams' },
  { id: 'quality', name: 'Quality Gate', team: 'Governance', role: 'Validator', description: '3-level validation (structure, functional, integration)' },
  { id: 'router', name: 'Router Updater', team: 'Governance', role: 'Router', description: 'Updates meta-router and CLAUDE.md' },
  { id: 'knowledge-idx', name: 'Knowledge Indexer', team: 'Governance', role: 'Indexer', description: 'Indexes to vault Obsidian, updates MOCs' },
  // Production
  { id: 'skill-builder', name: 'Skill Builder', team: 'Production', role: 'Builder', description: 'Creates skill SKILL.md + commands + wizards' },
  { id: 'coder', name: 'Engineer', team: 'Production', role: 'Developer', description: 'Implements code, tests, deploys' },
  { id: 'researcher', name: 'Researcher', team: 'Production', role: 'Explorer', description: 'Multi-model research, web search' },
  { id: 'architect', name: 'Architect', team: 'Production', role: 'Designer', description: 'System design, decomposition, child PRDs' },
  // Warehouse
  { id: 'wh-researcher', name: 'WH Researcher', team: 'Warehouse', role: 'Collector', description: 'Collects data from web sources' },
  { id: 'wh-analyst', name: 'WH Analyst', team: 'Warehouse', role: 'Analyzer', description: 'Analyzes and structures data' },
  { id: 'wh-writer', name: 'WH Writer', team: 'Warehouse', role: 'Writer', description: 'Writes fiches and documentation' },
  { id: 'wh-qa', name: 'WH QA', team: 'Warehouse', role: 'Validator', description: 'Validates fiche quality and accuracy' },
  { id: 'wh-publisher', name: 'WH Publisher', team: 'Warehouse', role: 'Publisher', description: 'Publishes to vault and indexes' },
]

export const SKILLS: SkillDef[] = [
  { id: 'proxmox', name: 'Proxmox', prefix: '/pve-*', commands: 32, wizards: 11, category: 'infra', description: 'Virtualisation VMs/LXC' },
  { id: 'windows', name: 'Windows', prefix: '/win-*', commands: 43, wizards: 10, category: 'infra', description: 'Windows 11/Server remote' },
  { id: 'docker', name: 'Docker', prefix: '/dk-*', commands: 35, wizards: 5, category: 'infra', description: 'Containers, Compose, Volumes' },
  { id: 'linux', name: 'Linux', prefix: '/lx-*', commands: 38, wizards: 5, category: 'infra', description: 'Ubuntu, systemd, services' },
  { id: 'knowledge', name: 'Knowledge', prefix: '/know-*', commands: 10, wizards: 1, category: 'data', description: 'Capture connaissances' },
  { id: 'kwatch', name: 'K-Watcher', prefix: '/kwatch-*', commands: 6, wizards: 2, category: 'data', description: 'Surveillance sources' },
  { id: 'obsidian', name: 'Obsidian', prefix: '/obs-*', commands: 35, wizards: 3, category: 'data', description: 'Vault maintenance + guardian' },
  { id: 'fileorg', name: 'FileOrg', prefix: '/file-*', commands: 21, wizards: 2, category: 'utils', description: 'Organisation fichiers' },
  { id: 'guardian', name: 'Guardian', prefix: '/guardian-*', commands: 4, wizards: 0, category: 'data', description: 'Maintenance proactive' },
  { id: 'qet', name: 'QElectroTech', prefix: '/qet-*', commands: 35, wizards: 9, category: 'cao', description: 'Plans electriques' },
  { id: 'sop', name: 'SOP Creator', prefix: '/sop-*', commands: 1, wizards: 0, category: 'meta', description: 'Runbooks et SOPs' },
  { id: 'skill-creator', name: 'Skill Creator', prefix: '/skill-*', commands: 1, wizards: 0, category: 'meta', description: 'Creation de skills' },
  { id: 'taskyn', name: 'Taskyn', prefix: '/tn-*', commands: 10, wizards: 2, category: 'pm', description: 'Gestion projets AI-first' },
  { id: 'monitoring', name: 'Monitoring', prefix: '/mon-*', commands: 21, wizards: 3, category: 'ops', description: 'Metriques, alertes, dashboards' },
  { id: 'backup', name: 'Backup', prefix: '/bak-*', commands: 19, wizards: 3, category: 'ops', description: 'Backup, restore, offsite' },
]

export const HOOKS: HookDef[] = [
  { id: 'load-context', name: 'load_context', event: 'SessionStart', description: 'Charge contexte + personnalite + memoires' },
  { id: 'security', name: 'security_validator', event: 'PreToolUse:Bash', description: 'Valide commandes shell (blocked/confirm/alert)' },
  { id: 'path-guard', name: 'path_guard', event: 'PreToolUse:Read/Write', description: 'Protege chemins sensibles (secrets, systeme)' },
  { id: 'memory-extract', name: 'memory_extractor_v2', event: 'Stop', description: 'Extraction heuristique + embeddings SQLite' },
  { id: 'subagent', name: 'subagent_capture', event: 'SubagentStop', description: 'Log resultats des subagents' },
  { id: 'prompt', name: 'prompt_analyzer', event: 'UserPromptSubmit', description: 'Analyse requetes + memoires contextuelles' },
  { id: 'error', name: 'error_capture', event: 'PostToolUse:Bash', description: 'Capture commandes en echec' },
  { id: 'notify-write', name: 'notify_write', event: 'PostToolUse:Write', description: 'Notification ecriture fichier' },
  { id: 'notify-complete', name: 'notify_complete', event: 'Notification', description: 'Notification OS fin de tache' },
  { id: 'pre-compact', name: 'pre_compact_flush', event: 'Notification', description: 'Sauvegarde avant compaction' },
  { id: 'heartbeat', name: 'heartbeat', event: 'Cron', description: 'Monitoring proactif (disk, Docker, services)' },
]

export const TEAM_COLORS: Record<string, string> = {
  Governance: '#00D4FF',
  Production: '#8B5CF6',
  Warehouse: '#4ADE80',
}

export const CATEGORY_COLORS: Record<string, string> = {
  infra: '#00D4FF',
  data: '#8B5CF6',
  ops: '#FF6B6B',
  utils: '#FBBF24',
  meta: '#64748B',
  cao: '#4ADE80',
  pm: '#F472B6',
}
