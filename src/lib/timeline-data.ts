export interface TimelineMilestone {
  id: string
  date: string
  title: string
  description: string
  category: 'infra' | 'app' | 'ai' | 'security' | 'knowledge' | 'monitoring'
  impact: string
  metrics?: { label: string; before?: string; after: string }[]
  icon: string
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'day0',
    date: 'Janvier 2026',
    title: 'Dell R740 — Le Big Bang',
    description: 'Acquisition du serveur Dell PowerEdge R740. 128 Go RAM, 24 vCPU, stockage SSD. Le hardware qui va tout porter.',
    category: 'infra',
    impact: 'Fondation de tout l\'ecosysteme',
    icon: '🖥️',
    metrics: [
      { label: 'RAM', after: '128 Go' },
      { label: 'vCPU', after: '48 threads' },
      { label: 'VMs', after: '0' },
    ],
  },
  {
    id: 'proxmox',
    date: 'Janvier 2026',
    title: 'Proxmox 9 — Virtualisation',
    description: 'Installation de Proxmox VE 9 comme hyperviseur. Creation des premieres VMs: r2d2-main (dev), r2d2-store (stockage), r2d2-stage (test).',
    category: 'infra',
    impact: '6 VMs creees, isolation complete',
    icon: '📦',
    metrics: [
      { label: 'VMs', before: '0', after: '6' },
      { label: 'Isolation', after: 'Complete' },
      { label: 'HA', after: 'Ready' },
    ],
  },
  {
    id: 'docker',
    date: 'Janvier 2026',
    title: 'Docker — Containerisation',
    description: 'Mise en place de Docker Compose avec les premiers services: Traefik reverse proxy, PostgreSQL, premiers containers applicatifs.',
    category: 'infra',
    impact: 'Orchestration reproductible',
    icon: '🐳',
    metrics: [
      { label: 'Containers', before: '0', after: '8' },
      { label: 'Stacks', after: '3' },
      { label: 'Healthchecks', after: 'Actifs' },
    ],
  },
  {
    id: 'cloudflare',
    date: 'Janvier 2026',
    title: 'Cloudflare Tunnel — Zero Trust',
    description: 'Mise en place du tunnel Cloudflare. Zero ports ouverts sur Internet. WAF, SSL Full Strict, DNS pour multipass.agency.',
    category: 'security',
    impact: 'Zero surface d\'attaque externe',
    icon: '🛡️',
    metrics: [
      { label: 'Ports ouverts', before: '5+', after: '0' },
      { label: 'SSL', after: 'Full Strict' },
      { label: 'WAF', after: 'Actif' },
    ],
  },
  {
    id: 'supabase',
    date: 'Fevrier 2026',
    title: 'Supabase Self-Hosted',
    description: 'Deploiement complet de Supabase: Auth OAuth (Google + GitHub), PostgreSQL 15, Realtime, Storage. Kong Gateway, PostgREST, GoTrue.',
    category: 'app',
    impact: 'Backend complet self-hosted',
    icon: '⚡',
    metrics: [
      { label: 'Services', after: '8 containers' },
      { label: 'Auth', after: 'OAuth Google+GitHub' },
      { label: 'DB', after: 'PostgreSQL 15' },
    ],
  },
  {
    id: 'pai',
    date: 'Fevrier 2026',
    title: 'PAI System v3.0 — Naissance de R2D2',
    description: 'Deploiement du Personal AI Infrastructure. Algorithm v1.8.0 (7 phases), premiers skills, premiers hooks. R2D2 devient operationnel.',
    category: 'ai',
    impact: 'IA permanente operationnelle',
    icon: '🤖',
    metrics: [
      { label: 'Algorithm', after: 'v1.8.0' },
      { label: 'Skills', before: '0', after: '15' },
      { label: 'Hooks', before: '0', after: '11' },
    ],
  },
  {
    id: 'agents',
    date: 'Fevrier 2026',
    title: '13 Agents — L\'Equipe IA',
    description: 'Creation des 3 equipes d\'agents: Governance (Orchestrator, Architect, Quality Gate, Skill Builder), Production (Engineer, Researcher, Knowledge Indexer), Warehouse (5 agents pipeline).',
    category: 'ai',
    impact: '13 agents + 28 subagents coordonnes',
    icon: '🎯',
    metrics: [
      { label: 'Agents', before: '1', after: '13' },
      { label: 'Subagents', after: '28' },
      { label: 'Equipes', after: '3' },
    ],
  },
  {
    id: 'multipass-saas',
    date: 'Fevrier 2026',
    title: 'MultiPass Agency — SaaS Live',
    description: 'Lancement du SaaS principal. Next.js 15, React 19, Stripe, LiteLLM, Langfuse. 30 routes, OAuth, dashboard complet. Production sur multipass.agency.',
    category: 'app',
    impact: 'Produit live en production',
    icon: '🚀',
    metrics: [
      { label: 'Routes', after: '30' },
      { label: 'Tests unitaires', after: '115' },
      { label: 'Status', after: 'Production' },
    ],
  },
  {
    id: 'hardening',
    date: 'Fevrier 2026',
    title: 'Hardening — 31 Controles',
    description: 'Securisation complete: SSH hardened (no password, no root), UFW 5 VMs, unattended-upgrades, credentials chmod 600, Docker log rotation, 6 couches de defense.',
    category: 'security',
    impact: '15/15 checks pass, zero vulnerabilite',
    icon: '🔒',
    metrics: [
      { label: 'Controles', after: '31' },
      { label: 'Hardening', after: '15/15 pass' },
      { label: 'Layers', after: '6' },
    ],
  },
  {
    id: 'knowledge',
    date: 'Fevrier 2026',
    title: 'Knowledge Warehouse',
    description: 'Pipeline de 5 agents (Researcher, Analyst, Writer, QA, Publisher). Vault Obsidian 575+ notes. Mem0 813+ chunks. Neo4j 2390 nodes.',
    category: 'knowledge',
    impact: 'Base de connaissances autonome',
    icon: '📚',
    metrics: [
      { label: 'Fiches', after: '23' },
      { label: 'Vault notes', after: '575+' },
      { label: 'Graph nodes', after: '2390' },
    ],
  },
  {
    id: 'monitoring',
    date: 'Mars 2026',
    title: 'Monitoring — 44 Checks',
    description: 'Monitoring complet: Uptime Kuma 22 monitors (octopus.watch), cron 44 checks toutes les 5min, alertes ntfy, seuils gradues disk 70/85%.',
    category: 'monitoring',
    impact: 'Visibilite totale sur l\'ecosysteme',
    icon: '📡',
    metrics: [
      { label: 'Monitors', after: '22' },
      { label: 'Checks cron', after: '44' },
      { label: 'Interval', after: '5 min' },
    ],
  },
  {
    id: 'cicd',
    date: 'Mars 2026',
    title: 'CI/CD + E2E — Pipeline Complet',
    description: 'GitHub Actions CI/CD, self-hosted runner, 7 runtimes de test progressifs. 55 tests E2E Playwright sur r2d2-stage. Pipeline push → CI → Deploy → healthy en 5min.',
    category: 'app',
    impact: 'Deploy automatise avec filet de securite',
    icon: '⚙️',
    metrics: [
      { label: 'Tests total', before: '115', after: '663' },
      { label: 'E2E', after: '55 Playwright' },
      { label: 'Deploy', after: '~5 min' },
    ],
  },
  {
    id: 'backups',
    date: 'Mars 2026',
    title: 'Backups + Recovery L1-L5',
    description: 'Backups quotidiens 3h AM, offsite Google Drive 4h30. Test restore mensuel automatise. 5 niveaux de recovery: container (<2min) a full ecosystem (<60min).',
    category: 'monitoring',
    impact: 'Zero data loss, recovery garanti',
    icon: '💾',
    metrics: [
      { label: 'Backup jobs', after: '4 quotidiens' },
      { label: 'Offsite', after: 'Google Drive' },
      { label: 'RTO min', after: '<2 min' },
    ],
  },
  {
    id: 'showcase',
    date: 'Mars 2026',
    title: 'MultiPass Studio — Vous etes ici',
    description: 'Ce showcase interactif. 11 pages, animations Framer Motion, architecture complete documentee. La preuve vivante de l\'ecosysteme.',
    category: 'app',
    impact: 'Ecosysteme entierement documente et presentable',
    icon: '✨',
    metrics: [
      { label: 'Pages', after: '11' },
      { label: 'Composants', after: '73' },
      { label: 'Lignes de code', after: '5000+' },
    ],
  },
]

export const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  infra: { label: 'Infrastructure', color: '#00D4FF' },
  app: { label: 'Application', color: '#8B5CF6' },
  ai: { label: 'AI & Agents', color: '#F472B6' },
  security: { label: 'Security', color: '#4ADE80' },
  knowledge: { label: 'Knowledge', color: '#FBBF24' },
  monitoring: { label: 'Monitoring', color: '#FF6B6B' },
}

export const EVOLUTION_SUMMARY = {
  duration: '~3 mois',
  team: '1 Human + 1 AI',
  fromZero: 'Serveur nu → Ecosysteme complet',
  totalComponents: 73,
  totalTests: 663,
  totalAgents: 41,
}

// --- i18n data ---
type Locale = 'fr' | 'en' | 'nl'

const MILESTONE_I18N: Record<string, Record<Locale, { title: string; description: string; impact: string; date: string }>> = {
  day0: {
    fr: { date: 'Janvier 2026', title: 'Dell R740 — Le Big Bang', description: "Acquisition du serveur Dell PowerEdge R740. 128 Go RAM, 24 vCPU, stockage SSD. Le hardware qui va tout porter.", impact: "Fondation de tout l'ecosysteme" },
    en: { date: 'January 2026', title: 'Dell R740 — The Big Bang', description: 'Acquisition of the Dell PowerEdge R740 server. 128 GB RAM, 24 vCPU, SSD storage. The hardware that carries everything.', impact: 'Foundation of the entire ecosystem' },
    nl: { date: 'Januari 2026', title: 'Dell R740 — De Big Bang', description: 'Aanschaf van de Dell PowerEdge R740 server. 128 GB RAM, 24 vCPU, SSD opslag. De hardware die alles draagt.', impact: 'Fundament van het hele ecosysteem' },
  },
  proxmox: {
    fr: { date: 'Janvier 2026', title: 'Proxmox 9 — Virtualisation', description: 'Installation de Proxmox VE 9 comme hyperviseur. Creation des premieres VMs: r2d2-main (dev), r2d2-store (stockage), r2d2-stage (test).', impact: '6 VMs creees, isolation complete' },
    en: { date: 'January 2026', title: 'Proxmox 9 — Virtualization', description: 'Installation of Proxmox VE 9 as hypervisor. Creation of first VMs: r2d2-main (dev), r2d2-store (storage), r2d2-stage (test).', impact: '6 VMs created, complete isolation' },
    nl: { date: 'Januari 2026', title: 'Proxmox 9 — Virtualisatie', description: 'Installatie van Proxmox VE 9 als hypervisor. Creatie van eerste VMs: r2d2-main (dev), r2d2-store (opslag), r2d2-stage (test).', impact: '6 VMs aangemaakt, volledige isolatie' },
  },
  docker: {
    fr: { date: 'Janvier 2026', title: 'Docker — Containerisation', description: 'Mise en place de Docker Compose avec les premiers services: Traefik reverse proxy, PostgreSQL, premiers containers applicatifs.', impact: 'Orchestration reproductible' },
    en: { date: 'January 2026', title: 'Docker — Containerization', description: 'Setting up Docker Compose with first services: Traefik reverse proxy, PostgreSQL, first application containers.', impact: 'Reproducible orchestration' },
    nl: { date: 'Januari 2026', title: 'Docker — Containerisatie', description: 'Opzetten van Docker Compose met eerste services: Traefik reverse proxy, PostgreSQL, eerste applicatie containers.', impact: 'Reproduceerbare orchestratie' },
  },
  cloudflare: {
    fr: { date: 'Janvier 2026', title: 'Cloudflare Tunnel — Zero Trust', description: 'Mise en place du tunnel Cloudflare. Zero ports ouverts sur Internet. WAF, SSL Full Strict, DNS pour multipass.agency.', impact: "Zero surface d'attaque externe" },
    en: { date: 'January 2026', title: 'Cloudflare Tunnel — Zero Trust', description: 'Setting up Cloudflare tunnel. Zero open ports on Internet. WAF, SSL Full Strict, DNS for multipass.agency.', impact: 'Zero external attack surface' },
    nl: { date: 'Januari 2026', title: 'Cloudflare Tunnel — Zero Trust', description: 'Opzetten van Cloudflare tunnel. Nul open poorten op Internet. WAF, SSL Full Strict, DNS voor multipass.agency.', impact: 'Nul extern aanvalsoppervlak' },
  },
  supabase: {
    fr: { date: 'Fevrier 2026', title: 'Supabase Self-Hosted', description: 'Deploiement complet de Supabase: Auth OAuth (Google + GitHub), PostgreSQL 15, Realtime, Storage. Kong Gateway, PostgREST, GoTrue.', impact: 'Backend complet self-hosted' },
    en: { date: 'February 2026', title: 'Supabase Self-Hosted', description: 'Complete Supabase deployment: Auth OAuth (Google + GitHub), PostgreSQL 15, Realtime, Storage. Kong Gateway, PostgREST, GoTrue.', impact: 'Complete self-hosted backend' },
    nl: { date: 'Februari 2026', title: 'Supabase Self-Hosted', description: 'Volledige Supabase implementatie: Auth OAuth (Google + GitHub), PostgreSQL 15, Realtime, Storage. Kong Gateway, PostgREST, GoTrue.', impact: 'Compleet self-hosted backend' },
  },
  pai: {
    fr: { date: 'Fevrier 2026', title: 'PAI System v3.0 — Naissance de R2D2', description: "Deploiement du Personal AI Infrastructure. Algorithm v1.8.0 (7 phases), premiers skills, premiers hooks. R2D2 devient operationnel.", impact: 'IA permanente operationnelle' },
    en: { date: 'February 2026', title: 'PAI System v3.0 — Birth of R2D2', description: 'Deployment of Personal AI Infrastructure. Algorithm v1.8.0 (7 phases), first skills, first hooks. R2D2 becomes operational.', impact: 'Permanent AI operational' },
    nl: { date: 'Februari 2026', title: 'PAI System v3.0 — Geboorte van R2D2', description: 'Implementatie van Personal AI Infrastructure. Algorithm v1.8.0 (7 fasen), eerste skills, eerste hooks. R2D2 wordt operationeel.', impact: 'Permanente AI operationeel' },
  },
  agents: {
    fr: { date: 'Fevrier 2026', title: "13 Agents — L'Equipe IA", description: "Creation des 3 equipes d'agents: Governance (Orchestrator, Architect, Quality Gate, Skill Builder), Production (Engineer, Researcher, Knowledge Indexer), Warehouse (5 agents pipeline).", impact: '13 agents + 28 subagents coordonnes' },
    en: { date: 'February 2026', title: '13 Agents — The AI Team', description: 'Creation of 3 agent teams: Governance (Orchestrator, Architect, Quality Gate, Skill Builder), Production (Engineer, Researcher, Knowledge Indexer), Warehouse (5-agent pipeline).', impact: '13 agents + 28 coordinated subagents' },
    nl: { date: 'Februari 2026', title: '13 Agenten — Het AI Team', description: 'Creatie van 3 agentteams: Governance (Orchestrator, Architect, Quality Gate, Skill Builder), Production (Engineer, Researcher, Knowledge Indexer), Warehouse (5-agent pipeline).', impact: '13 agenten + 28 gecoordineerde subagenten' },
  },
  'multipass-saas': {
    fr: { date: 'Fevrier 2026', title: 'MultiPass Agency — SaaS Live', description: 'Lancement du SaaS principal. Next.js 15, React 19, Stripe, LiteLLM, Langfuse. 30 routes, OAuth, dashboard complet. Production sur multipass.agency.', impact: 'Produit live en production' },
    en: { date: 'February 2026', title: 'MultiPass Agency — SaaS Live', description: 'Launch of main SaaS. Next.js 15, React 19, Stripe, LiteLLM, Langfuse. 30 routes, OAuth, full dashboard. Production on multipass.agency.', impact: 'Live product in production' },
    nl: { date: 'Februari 2026', title: 'MultiPass Agency — SaaS Live', description: 'Lancering van hoofd SaaS. Next.js 15, React 19, Stripe, LiteLLM, Langfuse. 30 routes, OAuth, volledig dashboard. Productie op multipass.agency.', impact: 'Live product in productie' },
  },
  hardening: {
    fr: { date: 'Fevrier 2026', title: 'Hardening — 31 Controles', description: 'Securisation complete: SSH hardened (no password, no root), UFW 5 VMs, unattended-upgrades, credentials chmod 600, Docker log rotation, 6 couches de defense.', impact: '15/15 checks pass, zero vulnerabilite' },
    en: { date: 'February 2026', title: 'Hardening — 31 Controls', description: 'Complete security hardening: SSH hardened (no password, no root), UFW 5 VMs, unattended-upgrades, credentials chmod 600, Docker log rotation, 6 defense layers.', impact: '15/15 checks pass, zero vulnerability' },
    nl: { date: 'Februari 2026', title: 'Hardening — 31 Controles', description: 'Volledige beveiligingshardening: SSH hardened (geen wachtwoord, geen root), UFW 5 VMs, unattended-upgrades, credentials chmod 600, Docker log rotation, 6 verdedigingslagen.', impact: '15/15 checks geslaagd, nul kwetsbaarheden' },
  },
  knowledge: {
    fr: { date: 'Fevrier 2026', title: 'Knowledge Warehouse', description: 'Pipeline de 5 agents (Researcher, Analyst, Writer, QA, Publisher). Vault Obsidian 575+ notes. Mem0 813+ chunks. Neo4j 2390 nodes.', impact: 'Base de connaissances autonome' },
    en: { date: 'February 2026', title: 'Knowledge Warehouse', description: '5-agent pipeline (Researcher, Analyst, Writer, QA, Publisher). Obsidian Vault 575+ notes. Mem0 813+ chunks. Neo4j 2390 nodes.', impact: 'Autonomous knowledge base' },
    nl: { date: 'Februari 2026', title: 'Knowledge Warehouse', description: '5-agent pipeline (Researcher, Analyst, Writer, QA, Publisher). Obsidian Vault 575+ notities. Mem0 813+ chunks. Neo4j 2390 nodes.', impact: 'Autonome kennisbank' },
  },
  monitoring: {
    fr: { date: 'Mars 2026', title: 'Monitoring — 44 Checks', description: 'Monitoring complet: Uptime Kuma 22 monitors (octopus.watch), cron 44 checks toutes les 5min, alertes ntfy, seuils gradues disk 70/85%.', impact: "Visibilite totale sur l'ecosysteme" },
    en: { date: 'March 2026', title: 'Monitoring — 44 Checks', description: 'Complete monitoring: Uptime Kuma 22 monitors (octopus.watch), cron 44 checks every 5min, ntfy alerts, graduated disk thresholds 70/85%.', impact: 'Total ecosystem visibility' },
    nl: { date: 'Maart 2026', title: 'Monitoring — 44 Checks', description: 'Complete monitoring: Uptime Kuma 22 monitors (octopus.watch), cron 44 checks elke 5min, ntfy alerts, gegradueerde disk drempels 70/85%.', impact: 'Totale zichtbaarheid ecosysteem' },
  },
  cicd: {
    fr: { date: 'Mars 2026', title: 'CI/CD + E2E — Pipeline Complet', description: 'GitHub Actions CI/CD, self-hosted runner, 7 runtimes de test progressifs. 55 tests E2E Playwright sur r2d2-stage. Pipeline push → CI → Deploy → healthy en 5min.', impact: 'Deploy automatise avec filet de securite' },
    en: { date: 'March 2026', title: 'CI/CD + E2E — Complete Pipeline', description: 'GitHub Actions CI/CD, self-hosted runner, 7 progressive test runtimes. 55 E2E Playwright tests on r2d2-stage. Pipeline push → CI → Deploy → healthy in 5min.', impact: 'Automated deploy with safety net' },
    nl: { date: 'Maart 2026', title: 'CI/CD + E2E — Complete Pipeline', description: 'GitHub Actions CI/CD, self-hosted runner, 7 progressieve test runtimes. 55 E2E Playwright tests op r2d2-stage. Pipeline push → CI → Deploy → healthy in 5min.', impact: 'Geautomatiseerde deploy met vangnet' },
  },
  backups: {
    fr: { date: 'Mars 2026', title: 'Backups + Recovery L1-L5', description: 'Backups quotidiens 3h AM, offsite Google Drive 4h30. Test restore mensuel automatise. 5 niveaux de recovery: container (<2min) a full ecosystem (<60min).', impact: 'Zero data loss, recovery garanti' },
    en: { date: 'March 2026', title: 'Backups + Recovery L1-L5', description: 'Daily backups 3h AM, offsite Google Drive 4h30. Automated monthly restore test. 5 recovery levels: container (<2min) to full ecosystem (<60min).', impact: 'Zero data loss, guaranteed recovery' },
    nl: { date: 'Maart 2026', title: 'Backups + Recovery L1-L5', description: 'Dagelijkse backups 3u AM, offsite Google Drive 4u30. Geautomatiseerde maandelijkse restore test. 5 recovery niveaus: container (<2min) tot volledig ecosysteem (<60min).', impact: 'Nul dataverlies, gegarandeerd herstel' },
  },
  showcase: {
    fr: { date: 'Mars 2026', title: 'MultiPass Studio — Vous etes ici', description: "Ce showcase interactif. 11 pages, animations Framer Motion, architecture complete documentee. La preuve vivante de l'ecosysteme.", impact: 'Ecosysteme entierement documente et presentable' },
    en: { date: 'March 2026', title: 'MultiPass Studio — You are here', description: 'This interactive showcase. 11 pages, Framer Motion animations, fully documented architecture. The living proof of the ecosystem.', impact: 'Fully documented and presentable ecosystem' },
    nl: { date: 'Maart 2026', title: 'MultiPass Studio — U bent hier', description: 'Deze interactieve showcase. 11 pagina\'s, Framer Motion animaties, volledig gedocumenteerde architectuur. Het levende bewijs van het ecosysteem.', impact: 'Volledig gedocumenteerd en presenteerbaar ecosysteem' },
  },
}

const EVOLUTION_I18N: Record<Locale, { duration: string; fromZero: string }> = {
  fr: { duration: '~3 mois', fromZero: 'Serveur nu → Ecosysteme complet' },
  en: { duration: '~3 months', fromZero: 'Bare server → Complete ecosystem' },
  nl: { duration: '~3 maanden', fromZero: 'Kale server → Compleet ecosysteem' },
}

export function getTimelineMilestones(locale: Locale): TimelineMilestone[] {
  return TIMELINE_MILESTONES.map(m => {
    const i18n = MILESTONE_I18N[m.id]?.[locale]
    if (!i18n || locale === 'fr') return m
    return { ...m, title: i18n.title, description: i18n.description, impact: i18n.impact, date: i18n.date }
  })
}

export function getEvolutionSummary(locale: Locale) {
  const i18n = EVOLUTION_I18N[locale]
  return { ...EVOLUTION_SUMMARY, duration: i18n.duration, fromZero: i18n.fromZero }
}
