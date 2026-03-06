export interface FranchiseTier {
  id: string
  name: string
  tagline: string
  price: string
  period: string
  color: string
  icon: string
  highlights: string[]
  includes: string[]
  limits: { label: string; value: string }[]
}

export interface FranchiseFeature {
  id: string
  category: string
  name: string
  description: string
  tiers: ('starter' | 'pro' | 'enterprise')[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const FRANCHISE_TIERS: FranchiseTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Lancez votre infrastructure IA',
    price: '2 490',
    period: '/mois',
    color: '#00D4FF',
    icon: '🚀',
    highlights: [
      '1 VM dediee (8 vCPU, 16 Go RAM)',
      '5 agents IA pre-configures',
      'PAI Algorithm v1.8.0',
      'Support email 48h',
    ],
    includes: [
      'Infrastructure Proxmox managee',
      'Cloudflare Tunnel + SSL',
      'Supabase self-hosted (Auth + DB)',
      'Docker orchestration (10 containers)',
      'Monitoring Uptime Kuma',
      'Backups quotidiens (7j retention)',
    ],
    limits: [
      { label: 'VMs', value: '1' },
      { label: 'Agents IA', value: '5' },
      { label: 'Containers', value: '10' },
      { label: 'Vault Notes', value: '100' },
      { label: 'API Calls/jour', value: '10K' },
      { label: 'Storage', value: '50 Go' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'L\'ecosysteme complet pour scale',
    price: '5 990',
    period: '/mois',
    color: '#8B5CF6',
    icon: '⚡',
    highlights: [
      '3 VMs (24 vCPU, 64 Go RAM total)',
      '13 agents + 28 subagents',
      'Knowledge Warehouse pipeline',
      'Support prioritaire 24h',
    ],
    includes: [
      'Tout le pack Starter +',
      'Multi-VM orchestration (Compute, Stage, Store)',
      'NFS partage + vault Obsidian',
      'Mem0 + Neo4j knowledge graph',
      'LiteLLM multi-provider (OpenAI, Anthropic, Google)',
      'Langfuse observabilite LLM',
      'E2E testing pipeline (Playwright)',
      'CI/CD GitHub Actions',
      'Logs centralises (rsyslog)',
      'Backups offsite Google Drive',
    ],
    limits: [
      { label: 'VMs', value: '3' },
      { label: 'Agents IA', value: '13+28' },
      { label: 'Containers', value: '30' },
      { label: 'Vault Notes', value: '1 000' },
      { label: 'API Calls/jour', value: '100K' },
      { label: 'Storage', value: '500 Go' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Votre propre MultiPass Agency',
    price: 'Sur mesure',
    period: '',
    color: '#FBBF24',
    icon: '👑',
    highlights: [
      'Infrastructure sur mesure (jusqu\'a 128 Go RAM)',
      'Agents custom + skills personnalises',
      'White-label complet',
      'Support dedie + SLA 99.9%',
    ],
    includes: [
      'Tout le pack Pro +',
      'Hardware dedie ou cloud hybride',
      'Agents et skills sur mesure',
      'Branding white-label complet',
      'Multi-tenant avec isolation',
      'MegaSupervisor + reconstruction auto',
      'Security hardening avance (31 controles)',
      'Threat model personnalise',
      'Formation equipe (2 jours)',
      'Account manager dedie',
      'SLA 99.9% avec penalites',
      'Audit securite trimestriel',
    ],
    limits: [
      { label: 'VMs', value: 'Illimite' },
      { label: 'Agents IA', value: 'Custom' },
      { label: 'Containers', value: 'Illimite' },
      { label: 'Vault Notes', value: 'Illimite' },
      { label: 'API Calls/jour', value: 'Illimite' },
      { label: 'Storage', value: 'Illimite' },
    ],
  },
]

export const FRANCHISE_FEATURES: FranchiseFeature[] = [
  // Infrastructure
  { id: 'f1', category: 'Infrastructure', name: 'Proxmox Virtualisation', description: 'Hyperviseur enterprise avec HA et live migration', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f2', category: 'Infrastructure', name: 'Cloudflare Tunnel', description: 'Zero ports ouverts, WAF, SSL Full Strict', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f3', category: 'Infrastructure', name: 'Multi-VM Orchestration', description: 'Compute, Stage, Store — separation des concerns', tiers: ['pro', 'enterprise'] },
  { id: 'f4', category: 'Infrastructure', name: 'Hardware Dedie', description: 'Serveur physique ou cloud hybride sur mesure', tiers: ['enterprise'] },
  // AI & Agents
  { id: 'f5', category: 'AI & Agents', name: 'PAI Algorithm v1.8.0', description: '7 phases: Observe, Think, Plan, Build, Execute, Verify, Learn', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f6', category: 'AI & Agents', name: '5 Agents Core', description: 'Orchestrator, Engineer, Architect, Researcher, Quality Gate', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f7', category: 'AI & Agents', name: '13 Agents + 28 Subagents', description: 'Ecosysteme complet avec Warehouse, Skill Builder, Knowledge Indexer', tiers: ['pro', 'enterprise'] },
  { id: 'f8', category: 'AI & Agents', name: 'Agents Custom', description: 'Creation d\'agents specialises pour votre domaine', tiers: ['enterprise'] },
  // Knowledge
  { id: 'f9', category: 'Knowledge', name: 'Vault Obsidian', description: 'Base de connaissances structuree avec MOCs', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f10', category: 'Knowledge', name: 'Mem0 + Neo4j Graph', description: 'Memoire semantique avec embeddings et graph de relations', tiers: ['pro', 'enterprise'] },
  { id: 'f11', category: 'Knowledge', name: 'Warehouse Pipeline', description: '5 agents: Researcher, Analyst, Writer, QA, Publisher', tiers: ['pro', 'enterprise'] },
  { id: 'f12', category: 'Knowledge', name: 'Knowledge Custom', description: 'Indexation de vos sources proprietaires', tiers: ['enterprise'] },
  // Security
  { id: 'f13', category: 'Security', name: 'SSH Hardening', description: 'No password, no root, MaxAuthTries 3', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f14', category: 'Security', name: 'UFW + Network Zones', description: 'Firewall strict, deny par defaut, zones isolees', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f15', category: 'Security', name: '31 Security Controls', description: '6 couches de defense, 15 hardening checks', tiers: ['pro', 'enterprise'] },
  { id: 'f16', category: 'Security', name: 'Audit Trimestriel', description: 'Audit de securite avec rapport et remediation', tiers: ['enterprise'] },
  // Operations
  { id: 'f17', category: 'Operations', name: 'Backups Quotidiens', description: 'DB, configs, secrets — retention 7-14 jours', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f18', category: 'Operations', name: 'Monitoring 24/7', description: 'Uptime Kuma, alertes ntfy, status page publique', tiers: ['starter', 'pro', 'enterprise'] },
  { id: 'f19', category: 'Operations', name: 'Backups Offsite', description: 'Google Drive, test restore mensuel automatise', tiers: ['pro', 'enterprise'] },
  { id: 'f20', category: 'Operations', name: 'MegaSupervisor', description: 'Recovery auto L1-L5, reconstruction ecosysteme complet', tiers: ['enterprise'] },
]

export const FRANCHISE_STATS = {
  ecosystemComponents: 73,
  securityControls: 31,
  automatedTests: 663,
  uptimeTarget: '99.9%',
  recoveryTime: '<2min',
  agentsAvailable: 41,
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq1',
    question: 'Qu\'est-ce qu\'une franchise MultiPass ?',
    answer: 'Une franchise MultiPass vous donne acces a l\'ecosysteme complet: infrastructure, agents IA, knowledge base, securite, et monitoring. Vous operez votre propre instance avec notre stack technologique prouvee en production.',
  },
  {
    id: 'faq2',
    question: 'Faut-il du hardware specifique ?',
    answer: 'Le pack Starter et Pro fonctionnent sur notre infrastructure managee. Le pack Enterprise peut etre deploye sur votre propre hardware (minimum recommande: 64 Go RAM, 24 vCPU) ou en cloud hybride.',
  },
  {
    id: 'faq3',
    question: 'Combien de temps pour le deploiement ?',
    answer: 'Starter: 48h. Pro: 1 semaine (configuration multi-VM + agents). Enterprise: 2-4 semaines selon la personnalisation.',
  },
  {
    id: 'faq4',
    question: 'Les mises a jour sont-elles incluses ?',
    answer: 'Oui. Toutes les mises a jour de l\'Algorithm, des agents, des skills, et des patches de securite sont deployees automatiquement. Les mises a jour majeures sont planifiees avec vous.',
  },
  {
    id: 'faq5',
    question: 'Puis-je creer mes propres agents ?',
    answer: 'Pack Pro: vous pouvez configurer les agents existants. Pack Enterprise: creation d\'agents custom avec personnalite, voix, et competences specifiques a votre domaine.',
  },
  {
    id: 'faq6',
    question: 'Quelle est la politique de donnees ?',
    answer: 'Vos donnees restent sur votre instance. Zero telemetrie, zero partage. L\'infrastructure est self-hosted, vos secrets ne quittent jamais votre environnement.',
  },
]

export const TIER_COLORS: Record<string, string> = {
  starter: '#00D4FF',
  pro: '#8B5CF6',
  enterprise: '#FBBF24',
}
