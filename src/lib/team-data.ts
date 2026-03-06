export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  title: string
  type: 'human' | 'ai' | 'agent' | 'service'
  color: string
  description: string
  skills: string[]
  funFact?: string
}

export interface ProjectHighlight {
  id: string
  name: string
  description: string
  status: 'live' | 'active' | 'planned'
  url?: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'mike',
    name: 'Mike',
    avatar: '👨‍💻',
    role: 'Founder & Architect',
    title: 'Le Capitaine',
    type: 'human',
    color: '#F8FAFC',
    description: 'Visionnaire et architecte de l\'ecosysteme MultiPass. Definit la direction, prend les decisions strategiques, et pilote l\'innovation.',
    skills: ['Architecture systeme', 'Vision produit', 'Infrastructure', 'DevOps', 'Security', 'AI Strategy'],
    funFact: 'Gere un Dell R740 avec 128 Go de RAM depuis son salon',
  },
  {
    id: 'r2d2',
    name: 'R2D2',
    avatar: '🤖',
    role: 'AI Partner & Engineer',
    title: 'Le Bras Droit',
    type: 'ai',
    color: '#8B5CF6',
    description: 'PAI (Personal AI Infrastructure) — assistant IA permanent. Execute l\'Algorithm 7 phases, gere 15 skills, 11 hooks, et coordonne 13 agents.',
    skills: ['PAI Algorithm v1.8.0', 'Code & Deploy', '15 Skills', '493+ Tests', 'Memory v2', 'Multi-agent coordination'],
    funFact: 'A ecrit 1585 lignes de code pour ce showcase en une session',
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    avatar: '🎯',
    role: 'Task Dispatcher',
    title: 'Le Chef d\'Orchestre',
    type: 'agent',
    color: '#00D4FF',
    description: 'Agent principal de gouvernance. Dispatche les taches, coordonne les equipes, et s\'assure que l\'Algorithm est suivi.',
    skills: ['Task dispatch', 'Team coordination', 'Algorithm enforcement', 'ISC management'],
  },
  {
    id: 'engineer',
    name: 'Engineer',
    avatar: '⚙️',
    role: 'Code Implementation',
    title: 'Le Batisseur',
    type: 'agent',
    color: '#4ADE80',
    description: 'Agent de production principal. Ecrit le code, cree les tests, deploie les applications. Le muscle technique de l\'equipe.',
    skills: ['TypeScript/React', 'Python', 'Docker', 'Next.js', 'PostgreSQL', 'Testing'],
  },
  {
    id: 'architect',
    name: 'Architect',
    avatar: '📐',
    role: 'System Design',
    title: 'Le Stratege',
    type: 'agent',
    color: '#FBBF24',
    description: 'Decompose les problemes complexes en child PRDs, conoit les architectures systeme, et challenge les designs avec le Red Team.',
    skills: ['System design', 'PRD decomposition', 'Red Team coordination', 'Creative branching'],
  },
  {
    id: 'researcher',
    name: 'Researcher',
    avatar: '🔬',
    role: 'Multi-Model Research',
    title: 'L\'Explorateur',
    type: 'agent',
    color: '#F472B6',
    description: 'Recherche multi-sources et multi-modeles. Web search, Fabric patterns (240+), extraction de contenu, analyse approfondie.',
    skills: ['Web research', 'Fabric 240+ patterns', 'Content parsing', 'Multi-model queries'],
  },
  {
    id: 'quality-gate',
    name: 'Quality Gate',
    avatar: '✅',
    role: '3-Level Validation',
    title: 'Le Gardien',
    type: 'agent',
    color: '#00D4FF',
    description: 'Valide chaque deliverable sur 3 niveaux : structure (tsc, lint), fonctionnel (vitest, pytest), et integration (Playwright E2E).',
    skills: ['Structure check', 'Unit tests', 'E2E Playwright', 'ISC verification'],
  },
  {
    id: 'skill-builder',
    name: 'Skill Builder',
    avatar: '🛠️',
    role: 'Skill Creation',
    title: 'L\'Artisan',
    type: 'agent',
    color: '#8B5CF6',
    description: 'Cree et maintient les 15 skills du systeme PAI. Chaque skill = SKILL.md + commandes + wizards, teste et documente.',
    skills: ['Skill architecture', 'Command design', 'Wizard creation', 'Documentation'],
  },
  {
    id: 'knowledge-indexer',
    name: 'Knowledge Indexer',
    avatar: '📚',
    role: 'Vault & Memory',
    title: 'Le Bibliothécaire',
    type: 'agent',
    color: '#4ADE80',
    description: 'Indexe tout dans le vault Obsidian (575+ notes) et Mem0 (813+ chunks). Maintient les MOCs et le graph Neo4j (2390 nodes).',
    skills: ['Obsidian vault', 'Mem0 embeddings', 'Neo4j graph', 'MOC maintenance'],
  },
  {
    id: 'warehouse-team',
    name: 'Warehouse Team',
    avatar: '🏭',
    role: '5-Agent Pipeline',
    title: 'L\'Usine a Savoir',
    type: 'agent',
    color: '#4ADE80',
    description: '5 agents specialises : Researcher → Analyst → Writer → QA → Publisher. Pipeline complet de creation de fiches knowledge.',
    skills: ['Web scraping', 'Content analysis', 'Fiche writing', 'Quality validation', 'Vault publishing'],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    avatar: '☁️',
    role: 'CDN & Security',
    title: 'Le Bouclier',
    type: 'service',
    color: '#F97316',
    description: 'Tunnel chiffre (zero ports ouverts), WAF, SSL Full Strict, DNS pour multipass.agency et octopus.watch.',
    skills: ['Tunnel', 'WAF', 'SSL', 'DNS', 'Rate limiting'],
  },
  {
    id: 'docker',
    name: 'Docker Engine',
    avatar: '🐳',
    role: '30 Containers',
    title: 'Le Transporteur',
    type: 'service',
    color: '#00D4FF',
    description: '7 stacks Compose, 30 containers avec healthchecks, log rotation, memory limits. Le coeur de l\'infrastructure applicative.',
    skills: ['Compose orchestration', 'Health checks', 'Volume management', 'Network isolation'],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    avatar: '⚡',
    role: 'Backend-as-a-Service',
    title: 'Le Moteur',
    type: 'service',
    color: '#4ADE80',
    description: 'Auth (OAuth Google/GitHub), PostgreSQL, Realtime, Storage. Self-hosted avec Kong Gateway, PostgREST, GoTrue.',
    skills: ['Auth OAuth/JWT', 'PostgreSQL 15', 'Realtime', 'Storage', 'Kong Gateway'],
  },
]

export const PROJECT_HIGHLIGHTS: ProjectHighlight[] = [
  { id: 'multipass', name: 'MultiPass Agency', description: 'SaaS principal — Next.js 15, Supabase, Stripe, LiteLLM, Langfuse', status: 'live', url: 'https://multipass.agency' },
  { id: 'showcase', name: 'MultiPass Studio', description: 'Ce showcase interactif — 9 pages, architecture complete', status: 'live', url: 'https://showcase.multipass.agency' },
  { id: 'pai', name: 'PAI System v3.0', description: 'Personal AI Infrastructure — Algorithm v1.8.0, 15 skills, 11 hooks', status: 'active' },
  { id: 'warehouse', name: 'Knowledge Warehouse', description: '23 fiches, pipeline 5 agents, indexation Mem0', status: 'active' },
  { id: 'octopus', name: 'Octopus Watch', description: 'Status page publique — Uptime Kuma, 22 monitors', status: 'live', url: 'https://octopus.watch' },
]

export const TEAM_STATS = {
  humans: 1,
  aiPartners: 1,
  agents: 13,
  subagents: 28,
  services: 30,
  skills: 15,
  commands: 325,
  tests: 663,
  vaultNotes: 575,
  uptimeMonitors: 22,
}

export const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  human: { label: 'Human', color: '#F8FAFC' },
  ai: { label: 'AI Partner', color: '#8B5CF6' },
  agent: { label: 'Agent', color: '#00D4FF' },
  service: { label: 'Service', color: '#4ADE80' },
}
