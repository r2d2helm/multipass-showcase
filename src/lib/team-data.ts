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

// --- i18n data ---
type Locale = 'fr' | 'en' | 'nl'

const TEAM_I18N: Record<string, Record<Locale, { description: string; title: string; funFact?: string }>> = {
  mike: {
    fr: { description: "Visionnaire et architecte de l'ecosysteme MultiPass. Definit la direction, prend les decisions strategiques, et pilote l'innovation.", title: 'Le Capitaine', funFact: 'Gere un Dell R740 avec 128 Go de RAM depuis son salon' },
    en: { description: 'Visionary and architect of the MultiPass ecosystem. Sets the direction, makes strategic decisions, and drives innovation.', title: 'The Captain', funFact: 'Runs a Dell R740 with 128 GB RAM from his living room' },
    nl: { description: 'Visionair en architect van het MultiPass ecosysteem. Bepaalt de richting, neemt strategische beslissingen en stimuleert innovatie.', title: 'De Kapitein', funFact: 'Beheert een Dell R740 met 128 GB RAM vanuit zijn woonkamer' },
  },
  r2d2: {
    fr: { description: "PAI (Personal AI Infrastructure) — assistant IA permanent. Execute l'Algorithm 7 phases, gere 15 skills, 11 hooks, et coordonne 13 agents.", title: 'Le Bras Droit', funFact: 'A ecrit 1585 lignes de code pour ce showcase en une session' },
    en: { description: 'PAI (Personal AI Infrastructure) — permanent AI assistant. Runs the 7-phase Algorithm, manages 15 skills, 11 hooks, and coordinates 13 agents.', title: 'The Right Hand', funFact: 'Wrote 1585 lines of code for this showcase in a single session' },
    nl: { description: 'PAI (Personal AI Infrastructure) — permanente AI-assistent. Voert het 7-fasen Algorithm uit, beheert 15 skills, 11 hooks, en coordineert 13 agenten.', title: 'De Rechterhand', funFact: 'Schreef 1585 regels code voor deze showcase in een sessie' },
  },
  orchestrator: {
    fr: { description: "Agent principal de gouvernance. Dispatche les taches, coordonne les equipes, et s'assure que l'Algorithm est suivi.", title: "Le Chef d'Orchestre" },
    en: { description: 'Main governance agent. Dispatches tasks, coordinates teams, and ensures the Algorithm is followed.', title: 'The Conductor' },
    nl: { description: 'Hoofdbestuursagent. Verdeelt taken, coordineert teams en zorgt ervoor dat het Algorithm wordt gevolgd.', title: 'De Dirigent' },
  },
  engineer: {
    fr: { description: "Agent de production principal. Ecrit le code, cree les tests, deploie les applications. Le muscle technique de l'equipe.", title: 'Le Batisseur' },
    en: { description: 'Main production agent. Writes code, creates tests, deploys applications. The technical muscle of the team.', title: 'The Builder' },
    nl: { description: 'Hoofdproductieagent. Schrijft code, maakt tests, implementeert applicaties. De technische kracht van het team.', title: 'De Bouwer' },
  },
  architect: {
    fr: { description: 'Decompose les problemes complexes en child PRDs, conoit les architectures systeme, et challenge les designs avec le Red Team.', title: 'Le Stratege' },
    en: { description: 'Decomposes complex problems into child PRDs, designs system architectures, and challenges designs with the Red Team.', title: 'The Strategist' },
    nl: { description: 'Ontleedt complexe problemen in child PRDs, ontwerpt systeemarchitecturen en daagt ontwerpen uit met het Red Team.', title: 'De Strateeg' },
  },
  researcher: {
    fr: { description: 'Recherche multi-sources et multi-modeles. Web search, Fabric patterns (240+), extraction de contenu, analyse approfondie.', title: "L'Explorateur" },
    en: { description: 'Multi-source, multi-model research. Web search, Fabric patterns (240+), content extraction, deep analysis.', title: 'The Explorer' },
    nl: { description: 'Multi-bron, multi-model onderzoek. Web search, Fabric patterns (240+), content extractie, diepgaande analyse.', title: 'De Ontdekker' },
  },
  'quality-gate': {
    fr: { description: 'Valide chaque deliverable sur 3 niveaux : structure (tsc, lint), fonctionnel (vitest, pytest), et integration (Playwright E2E).', title: 'Le Gardien' },
    en: { description: 'Validates each deliverable on 3 levels: structure (tsc, lint), functional (vitest, pytest), and integration (Playwright E2E).', title: 'The Guardian' },
    nl: { description: 'Valideert elk resultaat op 3 niveaus: structuur (tsc, lint), functioneel (vitest, pytest), en integratie (Playwright E2E).', title: 'De Bewaker' },
  },
  'skill-builder': {
    fr: { description: 'Cree et maintient les 15 skills du systeme PAI. Chaque skill = SKILL.md + commandes + wizards, teste et documente.', title: "L'Artisan" },
    en: { description: 'Creates and maintains the 15 skills of the PAI system. Each skill = SKILL.md + commands + wizards, tested and documented.', title: 'The Craftsman' },
    nl: { description: 'Maakt en onderhoudt de 15 skills van het PAI-systeem. Elke skill = SKILL.md + commando\'s + wizards, getest en gedocumenteerd.', title: 'De Ambachtsman' },
  },
  'knowledge-indexer': {
    fr: { description: 'Indexe tout dans le vault Obsidian (575+ notes) et Mem0 (813+ chunks). Maintient les MOCs et le graph Neo4j (2390 nodes).', title: 'Le Bibliothecaire' },
    en: { description: 'Indexes everything in the Obsidian vault (575+ notes) and Mem0 (813+ chunks). Maintains MOCs and the Neo4j graph (2390 nodes).', title: 'The Librarian' },
    nl: { description: 'Indexeert alles in de Obsidian vault (575+ notities) en Mem0 (813+ chunks). Onderhoudt MOCs en de Neo4j graph (2390 nodes).', title: 'De Bibliothecaris' },
  },
  'warehouse-team': {
    fr: { description: '5 agents specialises : Researcher, Analyst, Writer, QA, Publisher. Pipeline complet de creation de fiches knowledge.', title: "L'Usine a Savoir" },
    en: { description: '5 specialized agents: Researcher, Analyst, Writer, QA, Publisher. Complete knowledge sheet creation pipeline.', title: 'The Knowledge Factory' },
    nl: { description: '5 gespecialiseerde agenten: Researcher, Analyst, Writer, QA, Publisher. Complete kennisfiche-creatiepipeline.', title: 'De Kennisfabriek' },
  },
  cloudflare: {
    fr: { description: 'Tunnel chiffre (zero ports ouverts), WAF, SSL Full Strict, DNS pour multipass.agency et octopus.watch.', title: 'Le Bouclier' },
    en: { description: 'Encrypted tunnel (zero open ports), WAF, SSL Full Strict, DNS for multipass.agency and octopus.watch.', title: 'The Shield' },
    nl: { description: 'Versleutelde tunnel (nul open poorten), WAF, SSL Full Strict, DNS voor multipass.agency en octopus.watch.', title: 'Het Schild' },
  },
  docker: {
    fr: { description: "7 stacks Compose, 30 containers avec healthchecks, log rotation, memory limits. Le coeur de l'infrastructure applicative.", title: 'Le Transporteur' },
    en: { description: '7 Compose stacks, 30 containers with healthchecks, log rotation, memory limits. The heart of the application infrastructure.', title: 'The Transporter' },
    nl: { description: '7 Compose stacks, 30 containers met healthchecks, log rotation, geheugenlimieten. Het hart van de applicatie-infrastructuur.', title: 'De Transporteur' },
  },
  supabase: {
    fr: { description: 'Auth (OAuth Google/GitHub), PostgreSQL, Realtime, Storage. Self-hosted avec Kong Gateway, PostgREST, GoTrue.', title: 'Le Moteur' },
    en: { description: 'Auth (OAuth Google/GitHub), PostgreSQL, Realtime, Storage. Self-hosted with Kong Gateway, PostgREST, GoTrue.', title: 'The Engine' },
    nl: { description: 'Auth (OAuth Google/GitHub), PostgreSQL, Realtime, Storage. Self-hosted met Kong Gateway, PostgREST, GoTrue.', title: 'De Motor' },
  },
}

const PROJECT_I18N: Record<string, Record<Locale, { description: string }>> = {
  multipass: {
    fr: { description: 'SaaS principal — Next.js 15, Supabase, Stripe, LiteLLM, Langfuse' },
    en: { description: 'Main SaaS — Next.js 15, Supabase, Stripe, LiteLLM, Langfuse' },
    nl: { description: 'Hoofd SaaS — Next.js 15, Supabase, Stripe, LiteLLM, Langfuse' },
  },
  showcase: {
    fr: { description: 'Ce showcase interactif — 9 pages, architecture complete' },
    en: { description: 'This interactive showcase — 9 pages, complete architecture' },
    nl: { description: 'Deze interactieve showcase — 9 pagina\'s, complete architectuur' },
  },
  pai: {
    fr: { description: 'Personal AI Infrastructure — Algorithm v1.8.0, 15 skills, 11 hooks' },
    en: { description: 'Personal AI Infrastructure — Algorithm v1.8.0, 15 skills, 11 hooks' },
    nl: { description: 'Personal AI Infrastructure — Algorithm v1.8.0, 15 skills, 11 hooks' },
  },
  warehouse: {
    fr: { description: '23 fiches, pipeline 5 agents, indexation Mem0' },
    en: { description: '23 sheets, 5-agent pipeline, Mem0 indexing' },
    nl: { description: '23 fiches, 5-agent pipeline, Mem0 indexering' },
  },
  octopus: {
    fr: { description: 'Status page publique — Uptime Kuma, 22 monitors' },
    en: { description: 'Public status page — Uptime Kuma, 22 monitors' },
    nl: { description: 'Publieke statuspagina — Uptime Kuma, 22 monitors' },
  },
}

export function getTeamMembers(locale: Locale): TeamMember[] {
  return TEAM_MEMBERS.map(m => {
    const i18n = TEAM_I18N[m.id]?.[locale]
    if (!i18n || locale === 'fr') return m
    return { ...m, description: i18n.description, title: i18n.title, funFact: i18n.funFact }
  })
}

export function getProjectHighlights(locale: Locale): ProjectHighlight[] {
  return PROJECT_HIGHLIGHTS.map(p => {
    const i18n = PROJECT_I18N[p.id]?.[locale]
    if (!i18n || locale === 'fr') return p
    return { ...p, description: i18n.description }
  })
}
