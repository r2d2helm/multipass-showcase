export interface WarehouseAgent {
  id: string
  name: string
  step: number
  role: string
  description: string
  output: string
}

export interface FicheDef {
  id: string
  title: string
  category: string
  date: string
  sources: number
  quality: 'A' | 'B' | 'C'
}

export interface WarehouseStats {
  totalFiches: number
  categories: number
  avgSources: number
  pipelineRuns: number
}

export const WAREHOUSE_AGENTS: WarehouseAgent[] = [
  { id: 'researcher', step: 1, name: 'WH Researcher', role: 'Collector', description: 'Collects data from web sources, APIs, and documents', output: 'Raw data bundle' },
  { id: 'analyst', step: 2, name: 'WH Analyst', role: 'Analyzer', description: 'Structures and analyzes collected data, identifies patterns', output: 'Structured analysis' },
  { id: 'writer', step: 3, name: 'WH Writer', role: 'Writer', description: 'Writes fiches following vault conventions and templates', output: 'Draft fiche' },
  { id: 'qa', step: 4, name: 'WH QA', role: 'Validator', description: 'Validates quality, accuracy, and formatting compliance', output: 'QA report' },
  { id: 'publisher', step: 5, name: 'WH Publisher', role: 'Publisher', description: 'Publishes to vault, updates MOCs, indexes in Mem0', output: 'Published fiche' },
]

export const WAREHOUSE_FICHES: FicheDef[] = [
  { id: 'fiche-1', title: 'Claude Code Architecture', category: 'AI/LLM', date: '2026-03-01', sources: 4, quality: 'A' },
  { id: 'fiche-2', title: 'Proxmox HA Setup', category: 'Infrastructure', date: '2026-02-28', sources: 3, quality: 'A' },
  { id: 'fiche-3', title: 'Supabase Auth Patterns', category: 'Backend', date: '2026-02-27', sources: 5, quality: 'A' },
  { id: 'fiche-4', title: 'Docker Compose Best Practices', category: 'DevOps', date: '2026-02-26', sources: 3, quality: 'B' },
  { id: 'fiche-5', title: 'NFS Performance Tuning', category: 'Infrastructure', date: '2026-02-25', sources: 2, quality: 'B' },
  { id: 'fiche-6', title: 'Playwright E2E Patterns', category: 'Testing', date: '2026-02-24', sources: 4, quality: 'A' },
  { id: 'fiche-7', title: 'Neo4j Graph Modeling', category: 'Data', date: '2026-02-23', sources: 3, quality: 'A' },
  { id: 'fiche-8', title: 'Cloudflare Tunnel Setup', category: 'Networking', date: '2026-02-22', sources: 2, quality: 'B' },
  { id: 'fiche-9', title: 'rsyslog Centralization', category: 'Monitoring', date: '2026-02-21', sources: 3, quality: 'A' },
  { id: 'fiche-10', title: 'Stripe Integration Patterns', category: 'Backend', date: '2026-02-20', sources: 4, quality: 'A' },
  { id: 'fiche-11', title: 'UFW Hardening Rules', category: 'Security', date: '2026-02-19', sources: 3, quality: 'A' },
  { id: 'fiche-12', title: 'BullMQ Job Queue', category: 'Backend', date: '2026-02-18', sources: 2, quality: 'B' },
  { id: 'fiche-13', title: 'LiteLLM Proxy Config', category: 'AI/LLM', date: '2026-02-17', sources: 3, quality: 'A' },
  { id: 'fiche-14', title: 'Traefik Reverse Proxy', category: 'Networking', date: '2026-02-16', sources: 3, quality: 'B' },
  { id: 'fiche-15', title: 'Obsidian Vault Structure', category: 'Knowledge', date: '2026-02-15', sources: 2, quality: 'A' },
  { id: 'fiche-16', title: 'PostgreSQL Shared Config', category: 'Data', date: '2026-02-14', sources: 3, quality: 'A' },
  { id: 'fiche-17', title: 'GitHub Actions CI/CD', category: 'DevOps', date: '2026-02-13', sources: 4, quality: 'A' },
  { id: 'fiche-18', title: 'Mem0 Embeddings Pipeline', category: 'AI/LLM', date: '2026-02-12', sources: 3, quality: 'B' },
  { id: 'fiche-19', title: 'Next.js 15 App Router', category: 'Frontend', date: '2026-02-11', sources: 5, quality: 'A' },
  { id: 'fiche-20', title: 'Langfuse Observability', category: 'AI/LLM', date: '2026-02-10', sources: 3, quality: 'A' },
  { id: 'fiche-21', title: 'rclone Offsite Backup', category: 'DevOps', date: '2026-02-09', sources: 2, quality: 'B' },
  { id: 'fiche-22', title: 'Beszel Agent Monitoring', category: 'Monitoring', date: '2026-02-08', sources: 2, quality: 'B' },
  { id: 'fiche-23', title: 'Uptime Kuma Alerting', category: 'Monitoring', date: '2026-02-07', sources: 3, quality: 'A' },
]

export const WAREHOUSE_STATS: WarehouseStats = {
  totalFiches: 23,
  categories: 15,
  avgSources: 3.1,
  pipelineRuns: 23,
}

export const FICHE_CATEGORY_COLORS: Record<string, string> = {
  'AI/LLM': '#8B5CF6',
  'Infrastructure': '#00D4FF',
  'Backend': '#4ADE80',
  'DevOps': '#FBBF24',
  'Testing': '#F472B6',
  'Data': '#FF6B6B',
  'Networking': '#00D4FF',
  'Monitoring': '#FBBF24',
  'Security': '#FF6B6B',
  'Knowledge': '#8B5CF6',
  'Frontend': '#4ADE80',
}
