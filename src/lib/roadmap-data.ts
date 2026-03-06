export interface RoadmapProject {
  id: string
  name: string
  tagline: string
  description: string
  status: 'research' | 'design' | 'development' | 'beta' | 'planned'
  progress: number
  icon: string
  color: string
  category: 'product' | 'infrastructure' | 'ai' | 'platform'
  features: string[]
  techStack: string[]
  targetDate: string
  dependencies?: string[]
}

export const ROADMAP_PROJECTS: RoadmapProject[] = [
  {
    id: 'farmsysteme',
    name: 'MultiPass FarmSysteme',
    tagline: 'Gestion intelligente d\'exploitations agricoles',
    description: 'Plateforme SaaS verticale dediee aux exploitations agricoles de toute taille. FarmSysteme combine cartographie interactive des parcelles, suivi meteo en temps reel, gestion d\'inventaire, et intelligence artificielle pour anticiper les risques (gel, secheresse, maladies). Le systeme s\'integre aux capteurs IoT terrain (humidite, temperature sol) et aux API meteo pour fournir des alertes predictives. Comptabilite simplifiee avec generation automatique des rapports PAC et traabilite complete de la production.',
    status: 'design',
    progress: 15,
    icon: '🌾',
    color: '#4ADE80',
    category: 'product',
    features: [
      'Dashboard parcelles avec cartographie Mapbox (satellite + cadastre)',
      'Suivi meteo temps reel + previsions 10 jours par parcelle',
      'Gestion inventaire complet (semences, engrais, phyto, materiel)',
      'Comptabilite simplifiee et facturation automatisee',
      'Alertes IA predictives (gel, secheresse, maladies, ravageurs)',
      'Calendrier cultural intelligent avec recommandations IA',
      'Rapports reglementaires PAC et traabilite production',
      'Integration capteurs IoT (humidite sol, temperature, pluviometrie)',
      'Suivi des interventions terrain (traitements, semis, recoltes)',
      'Gestion multi-exploitation avec vue consolidee',
      'Historique rendements par parcelle et analyse tendances',
      'Export donnees pour comptable (CSV, PDF)',
      'Notifications push mobile (alertes meteo, rappels traitements)',
      'App mobile React Native (iOS + Android)',
      'Mode hors-ligne avec sync automatique',
      'Marketplace intrants avec comparateur prix',
    ],
    techStack: ['Next.js 15', 'React 19', 'Supabase', 'Mapbox GL JS', 'OpenWeatherMap API', 'React Native', 'Stripe', 'LiteLLM', 'MQTT (IoT)', 'PWA', 'Langfuse'],
    targetDate: 'Q3 2026',
    dependencies: ['MultiPass Agency (auth + billing + multi-tenant)', 'LiteLLM (alertes IA predictives)', 'Supabase Realtime (sync IoT)'],
  },
  {
    id: 'multipass-v2',
    name: 'MultiPass Agency v2.0',
    tagline: 'Plateforme multi-tenant enterprise',
    description: 'Evolution majeure du SaaS principal vers une plateforme multi-tenant enterprise. Chaque organisation dispose de son espace isole avec ses propres agents IA, ses configurations, et ses donnees. La marketplace permet de publier, decouvrir, et deployer des agents IA pre-configures. L\'API publique REST ouvre l\'ecosysteme aux developpeurs tiers avec webhooks temps reel, SDK TypeScript et Python, et documentation OpenAPI. Le systeme de franchise white-label permet aux partenaires de deployer leur propre instance MultiPass sous leur marque.',
    status: 'design',
    progress: 20,
    icon: '🏢',
    color: '#8B5CF6',
    category: 'product',
    features: [
      'Multi-tenant complet avec isolation par organisation (RLS PostgreSQL)',
      'Marketplace d\'agents IA (publier, decouvrir, deployer)',
      'API publique REST v2 avec documentation OpenAPI 3.1',
      'Webhooks temps reel (events: agent.completed, invoice.paid, etc.)',
      'SDK TypeScript + Python avec exemples et templates',
      'Dashboard analytics avance (usage IA, couts, performance)',
      'SSO enterprise SAML 2.0 + OIDC (Azure AD, Okta, Google Workspace)',
      'Audit logs compliance (qui, quoi, quand — retention 12 mois)',
      'White-label franchise (logo, couleurs, domaine custom)',
      'Stripe Connect pour monetisation marketplace agents',
      'Rate limiting par tier et par organisation',
      'Roles et permissions granulaires (Owner, Admin, Member, Viewer)',
      'Onboarding wizard multi-etapes pour nouvelles organisations',
      'Import/export donnees (CSV, JSON, API bulk)',
      'Notifications multi-canal (email, in-app, webhooks)',
      'Tableau de bord franchiseur (vue aggregee multi-instances)',
    ],
    techStack: ['Next.js 15', 'React 19', 'Supabase', 'Stripe Connect', 'LiteLLM', 'Langfuse', 'BullMQ', 'Redis', 'Kong Gateway', 'OpenAPI 3.1', 'Resend'],
    targetDate: 'Q2 2026',
    dependencies: ['Supabase RLS (isolation multi-tenant)', 'Stripe Connect (marketplace billing)', 'Kong Gateway (API rate limiting)'],
  },
  {
    id: 'pai-v4',
    name: 'PAI System v4.0',
    tagline: 'Algorithm v2.0 + Agent Autonomy',
    description: 'Prochaine generation du Personal AI Infrastructure. Algorithm v2.0 avec loop mode avance, agents fully autonomous, wisdom frames persistants, et multi-model orchestration.',
    status: 'research',
    progress: 10,
    icon: '🧠',
    color: '#F472B6',
    category: 'ai',
    features: [
      'Algorithm v2.0 (loop mode parallele)',
      'Agent autonomy levels (L1-L5)',
      'Wisdom Frames persistants cross-session',
      'Multi-model orchestration (Claude + GPT + Gemini)',
      'Self-improving ISC generation',
      'Agent marketplace integration',
      'Voice-first interaction mode',
      'Real-time dashboard avec websockets',
    ],
    techStack: ['Claude Code', 'LiteLLM', 'Langfuse', 'Neo4j', 'Mem0', 'WebSockets'],
    targetDate: 'Q3 2026',
    dependencies: ['MultiPass Agency v2.0 (marketplace)'],
  },
  {
    id: 'octopus-v2',
    name: 'Octopus Watch v2.0',
    tagline: 'Status page + incident management',
    description: 'Evolution d\'Octopus Watch: status page publique enrichie avec incident management, post-mortems automatises, SLA tracking, et API pour integration CI/CD.',
    status: 'planned',
    progress: 5,
    icon: '🐙',
    color: '#FF6B6B',
    category: 'infrastructure',
    features: [
      'Incident management workflow',
      'Post-mortems automatises par IA',
      'SLA tracking avec penalites',
      'API REST pour CI/CD',
      'Notifications multi-canal (email, Slack, SMS)',
      'Historique uptime 12 mois',
      'Badges embeddables',
      'Multi-site monitoring',
    ],
    techStack: ['Uptime Kuma', 'Next.js', 'Supabase', 'ntfy', 'Resend'],
    targetDate: 'Q4 2026',
  },
  {
    id: 'knowledge-v2',
    name: 'Knowledge Platform v2.0',
    tagline: 'RAG enterprise + semantic search',
    description: 'Transformation du Knowledge Warehouse en plateforme RAG complete. Recherche semantique, ingestion multi-source (PDF, web, video), chat contextuel, et API d\'interrogation.',
    status: 'research',
    progress: 8,
    icon: '📖',
    color: '#FBBF24',
    category: 'ai',
    features: [
      'RAG pipeline avec chunking intelligent',
      'Recherche semantique multi-langue',
      'Ingestion: PDF, web, YouTube, audio',
      'Chat contextuel sur knowledge base',
      'API d\'interrogation REST',
      'Permissions par document/collection',
      'Analytics d\'usage et pertinence',
      'Export et partage de collections',
    ],
    techStack: ['Mem0', 'Neo4j', 'pgvector', 'LiteLLM', 'Langfuse', 'Unstructured.io'],
    targetDate: 'Q3 2026',
    dependencies: ['Mem0 v2 (graph improvements)', 'MultiPass Agency v2.0'],
  },
  {
    id: 'infra-ha',
    name: 'Infrastructure HA',
    tagline: 'Haute disponibilite multi-node',
    description: 'Evolution vers un cluster Proxmox multi-node avec haute disponibilite. Ajout d\'un second serveur, replication DRBD, failover automatique, et load balancing.',
    status: 'planned',
    progress: 3,
    icon: '🏗️',
    color: '#00D4FF',
    category: 'infrastructure',
    features: [
      'Cluster Proxmox 2+ nodes',
      'Replication DRBD temps reel',
      'Failover automatique VMs',
      'Load balancing Traefik multi-backend',
      'Storage distribue (Ceph ou ZFS mirror)',
      'Monitoring cluster Prometheus + Grafana',
      'Backup cross-site',
      'Network bonding 10Gbps',
    ],
    techStack: ['Proxmox HA', 'DRBD', 'Ceph', 'Traefik', 'Prometheus', 'Grafana'],
    targetDate: 'Q4 2026',
  },
]

export const STATUS_CONFIG: Record<string, { label: string; color: string; bgOpacity: string }> = {
  planned: { label: 'Planifie', color: '#B0BEC5', bgOpacity: '10' },
  research: { label: 'Recherche', color: '#FBBF24', bgOpacity: '15' },
  design: { label: 'Design', color: '#8B5CF6', bgOpacity: '15' },
  development: { label: 'En dev', color: '#00D4FF', bgOpacity: '15' },
  beta: { label: 'Beta', color: '#4ADE80', bgOpacity: '15' },
}

export const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  product: { label: 'Produit', color: '#8B5CF6' },
  infrastructure: { label: 'Infrastructure', color: '#00D4FF' },
  ai: { label: 'AI & Knowledge', color: '#F472B6' },
  platform: { label: 'Plateforme', color: '#FBBF24' },
}

// --- i18n data ---
type Locale = 'fr' | 'en' | 'nl'

const STATUS_I18N: Record<string, Record<Locale, string>> = {
  planned: { fr: 'Planifie', en: 'Planned', nl: 'Gepland' },
  research: { fr: 'Recherche', en: 'Research', nl: 'Onderzoek' },
  design: { fr: 'Design', en: 'Design', nl: 'Ontwerp' },
  development: { fr: 'En dev', en: 'In dev', nl: 'In dev' },
  beta: { fr: 'Beta', en: 'Beta', nl: 'Beta' },
}

const CAT_I18N: Record<string, Record<Locale, string>> = {
  product: { fr: 'Produit', en: 'Product', nl: 'Product' },
  infrastructure: { fr: 'Infrastructure', en: 'Infrastructure', nl: 'Infrastructuur' },
  ai: { fr: 'AI & Knowledge', en: 'AI & Knowledge', nl: 'AI & Kennis' },
  platform: { fr: 'Plateforme', en: 'Platform', nl: 'Platform' },
}

const ROADMAP_I18N: Record<string, Record<Locale, { tagline: string; description: string }>> = {
  farmsysteme: {
    fr: { tagline: "Gestion intelligente d'exploitations agricoles", description: "Plateforme SaaS verticale dediee aux exploitations agricoles de toute taille. FarmSysteme combine cartographie interactive des parcelles, suivi meteo en temps reel, gestion d'inventaire, et intelligence artificielle pour anticiper les risques (gel, secheresse, maladies)." },
    en: { tagline: 'Intelligent farm management', description: 'Vertical SaaS platform dedicated to farms of all sizes. FarmSysteme combines interactive plot mapping, real-time weather tracking, inventory management, and AI to anticipate risks (frost, drought, diseases).' },
    nl: { tagline: 'Intelligent landbouwbeheer', description: 'Verticaal SaaS-platform voor boerderijen van alle groottes. FarmSysteme combineert interactieve perceelkaarten, realtime weertracering, voorraadbeheer en AI om risico\'s te anticiperen (vorst, droogte, ziekten).' },
  },
  'multipass-v2': {
    fr: { tagline: 'Plateforme multi-tenant enterprise', description: "Evolution majeure du SaaS principal vers une plateforme multi-tenant enterprise. Chaque organisation dispose de son espace isole avec ses propres agents IA, ses configurations, et ses donnees." },
    en: { tagline: 'Enterprise multi-tenant platform', description: 'Major evolution of the main SaaS into an enterprise multi-tenant platform. Each organization gets its own isolated space with its own AI agents, configurations, and data.' },
    nl: { tagline: 'Enterprise multi-tenant platform', description: 'Grote evolutie van de hoofd SaaS naar een enterprise multi-tenant platform. Elke organisatie krijgt zijn eigen geisoleerde ruimte met eigen AI-agenten, configuraties en gegevens.' },
  },
  'pai-v4': {
    fr: { tagline: 'Algorithm v2.0 + Agent Autonomy', description: "Prochaine generation du Personal AI Infrastructure. Algorithm v2.0 avec loop mode avance, agents fully autonomous, wisdom frames persistants, et multi-model orchestration." },
    en: { tagline: 'Algorithm v2.0 + Agent Autonomy', description: 'Next generation Personal AI Infrastructure. Algorithm v2.0 with advanced loop mode, fully autonomous agents, persistent wisdom frames, and multi-model orchestration.' },
    nl: { tagline: 'Algorithm v2.0 + Agent Autonomie', description: 'Volgende generatie Personal AI Infrastructure. Algorithm v2.0 met geavanceerde loop modus, volledig autonome agenten, persistente wisdom frames en multi-model orchestratie.' },
  },
  'octopus-v2': {
    fr: { tagline: 'Status page + incident management', description: "Evolution d'Octopus Watch: status page publique enrichie avec incident management, post-mortems automatises, SLA tracking, et API pour integration CI/CD." },
    en: { tagline: 'Status page + incident management', description: 'Evolution of Octopus Watch: enriched public status page with incident management, automated post-mortems, SLA tracking, and API for CI/CD integration.' },
    nl: { tagline: 'Statuspagina + incidentbeheer', description: 'Evolutie van Octopus Watch: verrijkte publieke statuspagina met incidentbeheer, geautomatiseerde post-mortems, SLA tracking en API voor CI/CD integratie.' },
  },
  'knowledge-v2': {
    fr: { tagline: 'RAG enterprise + semantic search', description: "Transformation du Knowledge Warehouse en plateforme RAG complete. Recherche semantique, ingestion multi-source (PDF, web, video), chat contextuel, et API d'interrogation." },
    en: { tagline: 'Enterprise RAG + semantic search', description: 'Transformation of Knowledge Warehouse into a complete RAG platform. Semantic search, multi-source ingestion (PDF, web, video), contextual chat, and query API.' },
    nl: { tagline: 'Enterprise RAG + semantisch zoeken', description: 'Transformatie van Knowledge Warehouse naar een compleet RAG-platform. Semantisch zoeken, multi-bron ingestie (PDF, web, video), contextueel chatten en query API.' },
  },
  'infra-ha': {
    fr: { tagline: 'Haute disponibilite multi-node', description: "Evolution vers un cluster Proxmox multi-node avec haute disponibilite. Ajout d'un second serveur, replication DRBD, failover automatique, et load balancing." },
    en: { tagline: 'Multi-node high availability', description: 'Evolution to a multi-node Proxmox cluster with high availability. Addition of a second server, DRBD replication, automatic failover, and load balancing.' },
    nl: { tagline: 'Multi-node hoge beschikbaarheid', description: 'Evolutie naar een multi-node Proxmox cluster met hoge beschikbaarheid. Toevoeging van een tweede server, DRBD replicatie, automatische failover en load balancing.' },
  },
}

export function getStatusConfig(locale: Locale) {
  const result: Record<string, { label: string; color: string; bgOpacity: string }> = {}
  for (const [key, val] of Object.entries(STATUS_CONFIG)) {
    result[key] = { ...val, label: STATUS_I18N[key]?.[locale] ?? val.label }
  }
  return result
}

export function getCategoryConfig(locale: Locale) {
  const result: Record<string, { label: string; color: string }> = {}
  for (const [key, val] of Object.entries(CATEGORY_CONFIG)) {
    result[key] = { ...val, label: CAT_I18N[key]?.[locale] ?? val.label }
  }
  return result
}

export function getRoadmapProjects(locale: Locale): RoadmapProject[] {
  return ROADMAP_PROJECTS.map(p => {
    const i18n = ROADMAP_I18N[p.id]?.[locale]
    if (!i18n || locale === 'fr') return p
    return { ...p, tagline: i18n.tagline, description: i18n.description }
  })
}
