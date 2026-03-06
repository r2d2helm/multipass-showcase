import type { Locale } from './i18n'

export interface VoiceFeature {
  id: string
  icon: string
  titleKey: string
  descKey: string
  highlight?: string
}

export interface VoiceCommand {
  id: string
  category: string
  command: string
  descKey: string
}

export interface VoiceUseCase {
  id: string
  titleKey: string
  descKey: string
  stepsKeys: string[]
  resultKey: string
}

export const VOICE_FEATURES: VoiceFeature[] = [
  { id: 'natural', icon: 'MessageCircle', titleKey: 'voice.feat.natural', descKey: 'voice.feat.natural.desc' },
  { id: 'agents', icon: 'Bot', titleKey: 'voice.feat.agents', descKey: 'voice.feat.agents.desc', highlight: '13 agents' },
  { id: 'notify', icon: 'Bell', titleKey: 'voice.feat.notify', descKey: 'voice.feat.notify.desc' },
  { id: 'multilang', icon: 'Globe', titleKey: 'voice.feat.multilang', descKey: 'voice.feat.multilang.desc', highlight: '3 langues' },
  { id: 'handsfree', icon: 'Hand', titleKey: 'voice.feat.handsfree', descKey: 'voice.feat.handsfree.desc' },
  { id: 'phases', icon: 'Workflow', titleKey: 'voice.feat.phases', descKey: 'voice.feat.phases.desc', highlight: '7 phases' },
]

export const VOICE_COMMANDS: VoiceCommand[] = [
  { id: 'c1', category: 'infra', command: 'docker compose up -d', descKey: 'voice.cmd.deploy' },
  { id: 'c2', category: 'infra', command: 'check disk usage', descKey: 'voice.cmd.disk' },
  { id: 'c3', category: 'infra', command: 'restart service nginx', descKey: 'voice.cmd.restart' },
  { id: 'c4', category: 'monitor', command: 'status all VMs', descKey: 'voice.cmd.status' },
  { id: 'c5', category: 'monitor', command: 'show backup freshness', descKey: 'voice.cmd.backup' },
  { id: 'c6', category: 'monitor', command: 'run E2E tests', descKey: 'voice.cmd.e2e' },
  { id: 'c7', category: 'agent', command: 'research latest CVEs', descKey: 'voice.cmd.research' },
  { id: 'c8', category: 'agent', command: 'create agent team', descKey: 'voice.cmd.team' },
  { id: 'c9', category: 'agent', command: 'red team my API', descKey: 'voice.cmd.redteam' },
  { id: 'c10', category: 'knowledge', command: 'index vault notes', descKey: 'voice.cmd.index' },
  { id: 'c11', category: 'knowledge', command: 'search warehouse fiches', descKey: 'voice.cmd.search' },
  { id: 'c12', category: 'knowledge', command: 'extract wisdom from URL', descKey: 'voice.cmd.extract' },
]

export const VOICE_USE_CASES: VoiceUseCase[] = [
  {
    id: 'uc1',
    titleKey: 'voice.uc.morning.title',
    descKey: 'voice.uc.morning.desc',
    stepsKeys: ['voice.uc.morning.s1', 'voice.uc.morning.s2', 'voice.uc.morning.s3'],
    resultKey: 'voice.uc.morning.result',
  },
  {
    id: 'uc2',
    titleKey: 'voice.uc.incident.title',
    descKey: 'voice.uc.incident.desc',
    stepsKeys: ['voice.uc.incident.s1', 'voice.uc.incident.s2', 'voice.uc.incident.s3'],
    resultKey: 'voice.uc.incident.result',
  },
  {
    id: 'uc3',
    titleKey: 'voice.uc.research.title',
    descKey: 'voice.uc.research.desc',
    stepsKeys: ['voice.uc.research.s1', 'voice.uc.research.s2', 'voice.uc.research.s3'],
    resultKey: 'voice.uc.research.result',
  },
]

export const VOICE_STATS = [
  { value: '13', labelKey: 'voice.stat.agents' },
  { value: '3', labelKey: 'voice.stat.langs' },
  { value: '<2s', labelKey: 'voice.stat.latency' },
  { value: '7', labelKey: 'voice.stat.phases' },
  { value: '70+', labelKey: 'voice.stat.skills' },
  { value: '24/7', labelKey: 'voice.stat.available' },
]

export const COMMAND_CATEGORIES: Record<string, { labelKey: string; color: string }> = {
  infra: { labelKey: 'voice.cat.infra', color: 'text-electric-cyan' },
  monitor: { labelKey: 'voice.cat.monitor', color: 'text-success-green' },
  agent: { labelKey: 'voice.cat.agent', color: 'text-neon-purple' },
  knowledge: { labelKey: 'voice.cat.knowledge', color: 'text-amber-warm' },
}
