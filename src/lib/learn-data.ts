export interface Reflection {
  id: string
  date: string
  taskDesc: string
  effortLevel: string
  criteriaCount: number
  criteriaPassed: number
  withinBudget: boolean
  q1Self: string
  q2Algorithm: string
  q3AI: string
  sentiment: number
}

export interface WisdomFrame {
  id: string
  domain: string
  icon: string
  color: string
  observations: WisdomObservation[]
}

export interface WisdomObservation {
  type: 'principle' | 'anti-pattern' | 'contextual-rule' | 'prediction'
  textKey: string
  confidence: number
}

export interface PRDEntry {
  id: string
  titleKey: string
  status: 'COMPLETE' | 'IN_PROGRESS' | 'PLANNED' | 'BLOCKED'
  progress: string
  effortLevel: string
  iterations: number
  date: string
  criteriaTotal: number
  criteriaPassed: number
}

export const REFLECTIONS: Reflection[] = [
  {
    id: 'r1',
    date: '2026-03-06',
    taskDesc: 'MultiPass Showcase site build',
    effortLevel: 'Extended',
    criteriaCount: 24,
    criteriaPassed: 24,
    withinBudget: true,
    q1Self: 'Should have created Charts data file before page component — reversed dependency order caused rework.',
    q2Algorithm: 'Plan mode should auto-detect data-driven pages and scaffold data+i18n+page in correct order.',
    q3AI: 'A smarter AI would have anticipated the overflow-hidden hero bug from CSS context alone.',
    sentiment: 8,
  },
  {
    id: 'r2',
    date: '2026-03-05',
    taskDesc: 'Theme toggle dark/light implementation',
    effortLevel: 'Standard',
    criteriaCount: 16,
    criteriaPassed: 16,
    withinBudget: true,
    q1Self: 'rgba values should have been CSS variables from the start — migration of 120+ values was avoidable.',
    q2Algorithm: 'Capability audit should flag "tech debt amplification" when a pattern repeats >10 times.',
    q3AI: 'Would have used CSS custom properties natively from project inception, not hardcoded rgba.',
    sentiment: 7,
  },
  {
    id: 'r3',
    date: '2026-03-03',
    taskDesc: 'E2E test pipeline r2d2-stage setup',
    effortLevel: 'Advanced',
    criteriaCount: 32,
    criteriaPassed: 30,
    withinBudget: false,
    q1Self: 'Supabase URL mismatch (LAN vs tunnel) cost 20min debugging — should have checked network path first.',
    q2Algorithm: 'OBSERVE should include infrastructure dependency mapping for cross-VM tasks.',
    q3AI: 'Would have modeled the full network topology before writing any test config.',
    sentiment: 6,
  },
  {
    id: 'r4',
    date: '2026-03-01',
    taskDesc: 'Docker memory limits + Neo4j migration',
    effortLevel: 'Extended',
    criteriaCount: 20,
    criteriaPassed: 20,
    withinBudget: true,
    q1Self: 'Should have profiled container memory BEFORE setting limits — Kong 2G was guesswork that worked.',
    q2Algorithm: 'BUILD phase should require evidence-based resource allocation, not estimation.',
    q3AI: 'Would have run load tests to determine actual memory footprint before constraining.',
    sentiment: 8,
  },
  {
    id: 'r5',
    date: '2026-02-28',
    taskDesc: 'Production deployment multipass.agency',
    effortLevel: 'Deep',
    criteriaCount: 48,
    criteriaPassed: 46,
    withinBudget: false,
    q1Self: 'OAuth PKCE issue consumed 45min — server actions silently lose code_verifier. Should have tested client-side first.',
    q2Algorithm: 'THINK pressure test should specifically probe auth flow edge cases for SSR apps.',
    q3AI: 'Would have known that Next.js server actions lose browser cookies/state by architectural design.',
    sentiment: 7,
  },
]

export const WISDOM_FRAMES: WisdomFrame[] = [
  {
    id: 'wf1',
    domain: 'Development',
    icon: 'Code',
    color: '#00D4FF',
    observations: [
      { type: 'principle', textKey: 'learn.wf.dev.p1', confidence: 95 },
      { type: 'anti-pattern', textKey: 'learn.wf.dev.a1', confidence: 90 },
      { type: 'contextual-rule', textKey: 'learn.wf.dev.c1', confidence: 85 },
      { type: 'prediction', textKey: 'learn.wf.dev.pr1', confidence: 70 },
    ],
  },
  {
    id: 'wf2',
    domain: 'Deployment',
    icon: 'Rocket',
    color: '#8B5CF6',
    observations: [
      { type: 'principle', textKey: 'learn.wf.deploy.p1', confidence: 92 },
      { type: 'anti-pattern', textKey: 'learn.wf.deploy.a1', confidence: 88 },
      { type: 'contextual-rule', textKey: 'learn.wf.deploy.c1', confidence: 80 },
    ],
  },
  {
    id: 'wf3',
    domain: 'Infrastructure',
    icon: 'Server',
    color: '#4ADE80',
    observations: [
      { type: 'principle', textKey: 'learn.wf.infra.p1', confidence: 95 },
      { type: 'anti-pattern', textKey: 'learn.wf.infra.a1', confidence: 92 },
      { type: 'contextual-rule', textKey: 'learn.wf.infra.c1', confidence: 88 },
      { type: 'prediction', textKey: 'learn.wf.infra.pr1', confidence: 65 },
    ],
  },
  {
    id: 'wf4',
    domain: 'Security',
    icon: 'Shield',
    color: '#FF6B6B',
    observations: [
      { type: 'principle', textKey: 'learn.wf.sec.p1', confidence: 98 },
      { type: 'anti-pattern', textKey: 'learn.wf.sec.a1', confidence: 95 },
      { type: 'contextual-rule', textKey: 'learn.wf.sec.c1', confidence: 90 },
    ],
  },
  {
    id: 'wf5',
    domain: 'Communication',
    icon: 'MessageSquare',
    color: '#FBBF24',
    observations: [
      { type: 'principle', textKey: 'learn.wf.comm.p1', confidence: 85 },
      { type: 'anti-pattern', textKey: 'learn.wf.comm.a1', confidence: 80 },
    ],
  },
]

export const PRD_ENTRIES: PRDEntry[] = [
  { id: 'prd1', titleKey: 'learn.prd.showcase', status: 'COMPLETE', progress: '24/24', effortLevel: 'Extended', iterations: 3, date: '2026-03-06', criteriaTotal: 24, criteriaPassed: 24 },
  { id: 'prd2', titleKey: 'learn.prd.theme', status: 'COMPLETE', progress: '16/16', effortLevel: 'Standard', iterations: 1, date: '2026-03-05', criteriaTotal: 16, criteriaPassed: 16 },
  { id: 'prd3', titleKey: 'learn.prd.e2e', status: 'COMPLETE', progress: '30/32', effortLevel: 'Advanced', iterations: 4, date: '2026-03-03', criteriaTotal: 32, criteriaPassed: 30 },
  { id: 'prd4', titleKey: 'learn.prd.docker', status: 'COMPLETE', progress: '20/20', effortLevel: 'Extended', iterations: 2, date: '2026-03-01', criteriaTotal: 20, criteriaPassed: 20 },
  { id: 'prd5', titleKey: 'learn.prd.production', status: 'COMPLETE', progress: '46/48', effortLevel: 'Deep', iterations: 5, date: '2026-02-28', criteriaTotal: 48, criteriaPassed: 46 },
  { id: 'prd6', titleKey: 'learn.prd.hardening', status: 'COMPLETE', progress: '18/18', effortLevel: 'Extended', iterations: 2, date: '2026-02-26', criteriaTotal: 18, criteriaPassed: 18 },
  { id: 'prd7', titleKey: 'learn.prd.farmsysteme', status: 'PLANNED', progress: '0/64', effortLevel: 'Comprehensive', iterations: 0, date: '2026-03-07', criteriaTotal: 64, criteriaPassed: 0 },
  { id: 'prd8', titleKey: 'learn.prd.agency2', status: 'IN_PROGRESS', progress: '12/40', effortLevel: 'Deep', iterations: 3, date: '2026-03-07', criteriaTotal: 40, criteriaPassed: 12 },
]

export const OBSERVATION_TYPES: Record<string, { labelKey: string; color: string; icon: string }> = {
  principle: { labelKey: 'learn.type.principle', color: 'text-electric-cyan', icon: 'Lightbulb' },
  'anti-pattern': { labelKey: 'learn.type.antipattern', color: 'text-coral-energy', icon: 'AlertTriangle' },
  'contextual-rule': { labelKey: 'learn.type.rule', color: 'text-neon-purple', icon: 'BookOpen' },
  prediction: { labelKey: 'learn.type.prediction', color: 'text-amber-warm', icon: 'TrendingUp' },
}

export const PRD_STATUS_CONFIG: Record<string, { labelKey: string; color: string; bg: string }> = {
  COMPLETE: { labelKey: 'learn.status.complete', color: 'text-success-green', bg: 'bg-[var(--green-tint)]' },
  IN_PROGRESS: { labelKey: 'learn.status.inprogress', color: 'text-electric-cyan', bg: 'bg-[var(--cyan-tint)]' },
  PLANNED: { labelKey: 'learn.status.planned', color: 'text-neon-purple', bg: 'bg-[var(--purple-tint)]' },
  BLOCKED: { labelKey: 'learn.status.blocked', color: 'text-coral-energy', bg: 'bg-[var(--coral-tint)]' },
}
