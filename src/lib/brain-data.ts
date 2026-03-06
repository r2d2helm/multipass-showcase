export interface AlgorithmPhase {
  id: string
  name: string
  emoji: string
  description: string
  color: string
}

export interface SubAgentDef {
  id: string
  name: string
  type: string
  description: string
}

export interface AgentDef {
  id: string
  name: string
  team: string
  role: string
  description: string
  subagents?: SubAgentDef[]
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
  {
    id: 'orchestrator', name: 'Orchestrator', team: 'Governance', role: 'Lead',
    description: 'Dispatches tasks, coordinates teams',
    subagents: [
      { id: 'orch-algorithm', name: 'Algorithm Agent', type: 'Algorithm', description: 'ISC-specialized, runs full 7-phase loop on delegated criteria' },
      { id: 'orch-loop', name: 'Loop Worker', type: 'Worker', description: 'Single-criterion surgical fix agent for parallel loop mode' },
      { id: 'orch-council', name: 'Council Agent', type: 'Council', description: 'Multi-agent structured debate on decisions' },
    ],
  },
  {
    id: 'quality', name: 'Quality Gate', team: 'Governance', role: 'Validator',
    description: '3-level validation (structure, functional, integration)',
    subagents: [
      { id: 'qg-structure', name: 'Structure Check', type: 'Static', description: 'Type check, lint, format verification (tsc, ESLint, Biome)' },
      { id: 'qg-functional', name: 'Functional Check', type: 'Test', description: 'Unit + integration tests (vitest, pytest, 493+ tests)' },
      { id: 'qg-integration', name: 'Integration Check', type: 'E2E', description: 'E2E Playwright (55 tests) + browser visual verification' },
    ],
  },
  {
    id: 'router', name: 'Router Updater', team: 'Governance', role: 'Router',
    description: 'Updates meta-router and CLAUDE.md',
    subagents: [
      { id: 'rt-scanner', name: 'Skill Scanner', type: 'Explore', description: 'Scans skill-index.json, detects new/modified skills' },
    ],
  },
  {
    id: 'knowledge-idx', name: 'Knowledge Indexer', team: 'Governance', role: 'Indexer',
    description: 'Indexes to vault Obsidian, updates MOCs',
    subagents: [
      { id: 'ki-mem0', name: 'Mem0 Indexer', type: 'Worker', description: 'Indexes vault content to Mem0 embeddings (813+ chunks)' },
      { id: 'ki-neo4j', name: 'Graph Indexer', type: 'Worker', description: 'Updates Neo4j knowledge graph (2390 nodes)' },
    ],
  },
  // Production
  {
    id: 'skill-builder', name: 'Skill Builder', team: 'Production', role: 'Builder',
    description: 'Creates skill SKILL.md + commands + wizards',
    subagents: [
      { id: 'sb-scaffold', name: 'Scaffold Agent', type: 'Engineer', description: 'Generates SKILL.md structure, commands, wizards' },
      { id: 'sb-validator', name: 'Skill Validator', type: 'Test', description: 'Validates skill triggers, prefix uniqueness, command counts' },
    ],
  },
  {
    id: 'coder', name: 'Engineer', team: 'Production', role: 'Developer',
    description: 'Implements code, tests, deploys',
    subagents: [
      { id: 'eng-impl', name: 'Implementation Agent', type: 'Engineer', description: 'Writes code, creates files, applies edits' },
      { id: 'eng-test', name: 'Test Agent', type: 'Test', description: 'Writes and runs unit/integration tests' },
      { id: 'eng-deploy', name: 'Deploy Agent', type: 'Worker', description: 'Docker build, git push, CI/CD pipeline' },
      { id: 'eng-browser', name: 'Browser Agent', type: 'Browser', description: 'Visual verification via Playwright screenshots' },
    ],
  },
  {
    id: 'researcher', name: 'Researcher', team: 'Production', role: 'Explorer',
    description: 'Multi-model research, web search',
    subagents: [
      { id: 'res-web', name: 'Web Researcher', type: 'Research', description: 'WebSearch + WebFetch, parallel multi-query' },
      { id: 'res-fabric', name: 'Fabric Analyst', type: 'Research', description: '240+ patterns for content extraction and analysis' },
      { id: 'res-parser', name: 'Content Parser', type: 'Worker', description: 'Parses URLs, PDFs, videos, YouTube transcripts' },
    ],
  },
  {
    id: 'architect', name: 'Architect', team: 'Production', role: 'Designer',
    description: 'System design, decomposition, child PRDs',
    subagents: [
      { id: 'arch-decomp', name: 'Decomposer', type: 'Architect', description: 'Breaks large tasks into child PRDs by domain' },
      { id: 'arch-redteam', name: 'Red Team', type: 'RedTeam', description: '32 adversarial agents stress-testing designs' },
      { id: 'arch-creative', name: 'Creative Agent', type: 'Creative', description: 'Extended thinking, divergent ideation for alternatives' },
    ],
  },
  // Warehouse
  {
    id: 'wh-researcher', name: 'WH Researcher', team: 'Warehouse', role: 'Collector',
    description: 'Collects data from web sources',
    subagents: [
      { id: 'whr-scraper', name: 'Web Scraper', type: 'Research', description: 'BrightData + Apify for structured web scraping' },
      { id: 'whr-api', name: 'API Collector', type: 'Worker', description: 'Collects from APIs, RSS feeds, GitHub repos' },
    ],
  },
  {
    id: 'wh-analyst', name: 'WH Analyst', team: 'Warehouse', role: 'Analyzer',
    description: 'Analyzes and structures data',
    subagents: [
      { id: 'wha-extract', name: 'Wisdom Extractor', type: 'Research', description: 'Adaptive content extraction, key insights identification' },
      { id: 'wha-classify', name: 'Classifier', type: 'Worker', description: 'Categorizes content into 15 fiche categories' },
    ],
  },
  {
    id: 'wh-writer', name: 'WH Writer', team: 'Warehouse', role: 'Writer',
    description: 'Writes fiches and documentation',
    subagents: [
      { id: 'whw-draft', name: 'Draft Writer', type: 'Engineer', description: 'Writes fiche following vault conventions and templates' },
    ],
  },
  {
    id: 'wh-qa', name: 'WH QA', team: 'Warehouse', role: 'Validator',
    description: 'Validates fiche quality and accuracy',
    subagents: [
      { id: 'whq-check', name: 'Quality Checker', type: 'Test', description: 'Validates formatting, links, sources, accuracy' },
    ],
  },
  {
    id: 'wh-publisher', name: 'WH Publisher', team: 'Warehouse', role: 'Publisher',
    description: 'Publishes to vault and indexes',
    subagents: [
      { id: 'whp-vault', name: 'Vault Publisher', type: 'Worker', description: 'Writes to NFS vault, updates MOC links' },
      { id: 'whp-index', name: 'Mem0 Indexer', type: 'Worker', description: 'Indexes fiche in Mem0 warehouse user_id' },
    ],
  },
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
