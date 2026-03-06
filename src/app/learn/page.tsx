'use client'

import { useState } from 'react'
import { BookOpen, Brain, FileText, Lightbulb, AlertTriangle, TrendingUp, CheckCircle, Clock, Target, Zap, Star, ChevronDown, ChevronUp, Code, Rocket, Server, Shield, MessageSquare, ArrowRight, RefreshCw, Database, Sparkles } from 'lucide-react'
import {
  REFLECTIONS, WISDOM_FRAMES, PRD_ENTRIES,
  OBSERVATION_TYPES, PRD_STATUS_CONFIG,
  type Reflection, type WisdomFrame, type PRDEntry,
} from '@/lib/learn-data'
import { useLocale } from '@/lib/i18n'

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  Code, Rocket, Server, Shield, MessageSquare,
}

const OBS_ICONS: Record<string, React.ElementType> = {
  Lightbulb, AlertTriangle, BookOpen, TrendingUp,
}

const TAB_KEYS = ['reflections', 'wisdom', 'prd'] as const
type Tab = typeof TAB_KEYS[number]

function ReflectionCard({ r, t }: { r: Reflection; t: (k: string) => string }) {
  const [open, setOpen] = useState(false)
  const passRate = Math.round((r.criteriaPassed / r.criteriaCount) * 100)

  return (
    <div className="glass-card p-4 hover:bg-[var(--subtle-bg-3)] transition-all">
      <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-electric-cyan flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-cloud-white">{r.taskDesc}</h3>
            <div className="flex items-center gap-2 text-xs text-steel-gray">
              <span>{r.date}</span>
              <span className="text-[var(--dim-text)]">|</span>
              <span className="text-neon-purple font-medium">{r.effortLevel}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i < r.sentiment ? 'bg-amber-warm' : 'bg-[var(--subtle-bg-2)]'}`}
              />
            ))}
          </div>
          {open ? <ChevronUp className="w-4 h-4 text-steel-gray" /> : <ChevronDown className="w-4 h-4 text-steel-gray" />}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-xs mb-2">
        <span className="flex items-center gap-1 text-steel-gray">
          <Target className="w-3 h-3" /> {t('learn.criteria')}: <span className="text-cloud-white font-medium">{r.criteriaPassed}/{r.criteriaCount}</span>
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-[var(--subtle-bg-2)]">
          <div className="h-full rounded-full bg-success-green transition-all" style={{ width: `${passRate}%` }} />
        </div>
        <span className={`flex items-center gap-1 font-medium ${r.withinBudget ? 'text-success-green' : 'text-coral-energy'}`}>
          <Clock className="w-3 h-3" /> {t('learn.budget')}: {r.withinBudget ? t('learn.within') : t('learn.over')}
        </span>
      </div>

      {/* Expanded reflections */}
      {open && (
        <div className="space-y-2 mt-3 pt-3 border-t border-[var(--subtle-border)]">
          <div className="p-3 rounded-lg bg-[var(--subtle-bg-2)]">
            <p className="text-xs font-bold text-electric-cyan mb-1">{t('learn.q1')} — {t('learn.q1')}</p>
            <p className="text-sm text-steel-gray">{r.q1Self}</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--subtle-bg-2)]">
            <p className="text-xs font-bold text-neon-purple mb-1">{t('learn.q2')} — {t('learn.q2')}</p>
            <p className="text-sm text-steel-gray">{r.q2Algorithm}</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--subtle-bg-2)]">
            <p className="text-xs font-bold text-amber-warm mb-1">{t('learn.q3')} — {t('learn.q3')}</p>
            <p className="text-sm text-steel-gray">{r.q3AI}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function WisdomFrameCard({ frame, t }: { frame: WisdomFrame; t: (k: string) => string }) {
  const Icon = DOMAIN_ICONS[frame.icon] || BookOpen

  return (
    <div className="glass-card p-5 hover:bg-[var(--subtle-bg-3)] transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${frame.color}15` }}>
          <Icon className="w-5 h-5" style={{ color: frame.color }} />
        </div>
        <div>
          <h3 className="text-base font-heading font-semibold text-cloud-white">{frame.domain}</h3>
          <p className="text-xs text-steel-gray">{frame.observations.length} observations</p>
        </div>
      </div>
      <div className="space-y-2">
        {frame.observations.map((obs, i) => {
          const obsType = OBSERVATION_TYPES[obs.type]
          const ObsIcon = OBS_ICONS[obsType?.icon] || Lightbulb
          return (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[var(--subtle-bg-2)]">
              <ObsIcon className={`w-4 h-4 shrink-0 mt-0.5 ${obsType?.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold uppercase ${obsType?.color}`}>{t(obsType?.labelKey)}</span>
                  <span className="text-xs text-steel-gray">{obs.confidence}%</span>
                </div>
                <p className="text-sm text-cloud-white">{t(obs.textKey)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PRDCard({ prd, t }: { prd: PRDEntry; t: (k: string) => string }) {
  const statusCfg = PRD_STATUS_CONFIG[prd.status]
  const passRate = prd.criteriaTotal > 0 ? Math.round((prd.criteriaPassed / prd.criteriaTotal) * 100) : 0

  return (
    <div className="glass-card p-4 hover:bg-[var(--subtle-bg-3)] transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-steel-gray" />
          <h3 className="text-sm font-heading font-semibold text-cloud-white">{t(prd.titleKey)}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${statusCfg?.color} ${statusCfg?.bg}`}>
          {t(statusCfg?.labelKey)}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs text-steel-gray mb-2">
        <span>{prd.date}</span>
        <span className="text-neon-purple font-medium">{prd.effortLevel}</span>
        <span>{prd.iterations} iter.</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-[var(--subtle-bg-2)]">
          <div
            className={`h-full rounded-full transition-all ${prd.status === 'COMPLETE' ? 'bg-success-green' : prd.status === 'IN_PROGRESS' ? 'bg-electric-cyan' : prd.status === 'BLOCKED' ? 'bg-coral-energy' : 'bg-neon-purple'}`}
            style={{ width: `${passRate}%` }}
          />
        </div>
        <span className="text-xs font-medium text-cloud-white whitespace-nowrap">{prd.progress}</span>
      </div>
    </div>
  )
}

export default function LearnPage() {
  const { t } = useLocale()
  const [activeTab, setActiveTab] = useState<Tab>('reflections')

  const totalCriteria = PRD_ENTRIES.reduce((s, p) => s + p.criteriaTotal, 0)
  const totalPassed = PRD_ENTRIES.reduce((s, p) => s + p.criteriaPassed, 0)
  const totalObservations = WISDOM_FRAMES.reduce((s, f) => s + f.observations.length, 0)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">{t('learn.title')}</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--purple-tint)] text-neon-purple">
            Phase 7/7
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{REFLECTIONS.length} reflexions</span>
          <span>{totalObservations} observations</span>
          <span>{PRD_ENTRIES.length} PRDs</span>
        </div>
      </header>

      {/* Hero — Self-Learning Loop */}
      <div className="px-4 py-5 border-b border-[var(--subtle-bg-2)]">
        {/* Big statement */}
        <div className="text-center mb-5">
          <h3 className="text-2xl lg:text-3xl font-heading font-bold text-cloud-white mb-2">
            {t('learn.hero.headline.pre')} <span className="text-amber-warm">{t('learn.hero.headline.self')}</span> {t('learn.hero.headline.post')}
          </h3>
          <p className="text-sm text-steel-gray max-w-2xl mx-auto">{t('learn.hero.subtitle')}</p>
        </div>

        {/* Learning Loop Visualization */}
        <div className="flex items-center justify-center gap-0 flex-wrap max-w-4xl mx-auto mb-5">
          {[
            { icon: Target, labelKey: 'learn.loop.work', color: 'text-electric-cyan', bg: 'bg-[var(--cyan-tint)]', border: 'border-electric-cyan/30' },
            { icon: Brain, labelKey: 'learn.loop.reflect', color: 'text-neon-purple', bg: 'bg-[var(--purple-tint)]', border: 'border-[var(--purple-border)]' },
            { icon: Lightbulb, labelKey: 'learn.loop.extract', color: 'text-amber-warm', bg: 'bg-[var(--amber-tint)]', border: 'border-amber-warm/30' },
            { icon: Database, labelKey: 'learn.loop.store', color: 'text-success-green', bg: 'bg-[var(--green-tint)]', border: 'border-success-green/30' },
            { icon: Sparkles, labelKey: 'learn.loop.improve', color: 'text-coral-energy', bg: 'bg-[var(--coral-tint)]', border: 'border-coral-energy/30' },
          ].map((step, i, arr) => (
            <div key={step.labelKey} className="flex items-center">
              <div className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl ${step.bg} border ${step.border} min-w-[100px]`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
                <span className={`text-xs font-bold ${step.color} text-center leading-tight`}>{t(step.labelKey)}</span>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-steel-gray mx-1 shrink-0" />
              )}
              {i === arr.length - 1 && (
                <div className="flex items-center ml-1">
                  <RefreshCw className="w-4 h-4 text-amber-warm animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key message + stats */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--amber-tint)] border border-amber-warm/20 text-xs font-bold text-amber-warm">
            <RefreshCw className="w-3 h-3" /> {t('learn.hero.auto')}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--green-tint)] border border-success-green/20 text-xs font-bold text-success-green">
            <CheckCircle className="w-3 h-3" /> {totalPassed}/{totalCriteria} ISC
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cyan-tint)] border border-electric-cyan/20 text-xs font-bold text-electric-cyan">
            <Lightbulb className="w-3 h-3" /> {totalObservations} observations
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--purple-tint)] border border-[var(--purple-border)] text-xs font-bold text-neon-purple">
            <FileText className="w-3 h-3" /> {PRD_ENTRIES.filter(p => p.status === 'COMPLETE').length}/{PRD_ENTRIES.length} PRDs
          </span>
        </div>

        {/* Compound effect statement */}
        <p className="text-center text-base lg:text-lg text-steel-gray max-w-2xl mx-auto leading-relaxed">
          <span className="text-amber-warm font-bold">{t('learn.compound.pre')}</span> {t('learn.compound.post')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--subtle-bg-2)]">
        {TAB_KEYS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-[var(--cyan-tint)] text-electric-cyan'
                : 'text-steel-gray hover:text-cloud-white hover:bg-[var(--subtle-bg-2)]'
            }`}
          >
            {t(`learn.tab.${tab}`)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'reflections' && (
          <div className="space-y-3 max-w-4xl mx-auto">
            {REFLECTIONS.map(r => (
              <ReflectionCard key={r.id} r={r} t={t} />
            ))}
          </div>
        )}

        {activeTab === 'wisdom' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {WISDOM_FRAMES.map(frame => (
              <WisdomFrameCard key={frame.id} frame={frame} t={t} />
            ))}
          </div>
        )}

        {activeTab === 'prd' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {PRD_ENTRIES.map(prd => (
              <PRDCard key={prd.id} prd={prd} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
