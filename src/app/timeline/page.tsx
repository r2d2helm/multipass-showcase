'use client'

import { useState } from 'react'
import { Clock, TrendingUp, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/studio/fade-in'
import { AnimatedCounter } from '@/components/studio/animated-counter'
import {
  TIMELINE_MILESTONES, CATEGORY_CONFIG, EVOLUTION_SUMMARY,
} from '@/lib/timeline-data'

type Filter = 'all' | 'infra' | 'app' | 'ai' | 'security' | 'knowledge' | 'monitoring'

export default function TimelinePage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = filter === 'all'
    ? TIMELINE_MILESTONES
    : TIMELINE_MILESTONES.filter(m => m.category === filter)

  const filters: { id: Filter; label: string; count: number; color: string }[] = [
    { id: 'all', label: 'Tous', count: TIMELINE_MILESTONES.length, color: '#B0BEC5' },
    ...Object.entries(CATEGORY_CONFIG).map(([id, cfg]) => ({
      id: id as Filter,
      label: cfg.label,
      count: TIMELINE_MILESTONES.filter(m => m.category === id).length,
      color: cfg.color,
    })),
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">How We Built This</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[rgba(139,92,246,0.1)] text-neon-purple">
            {EVOLUTION_SUMMARY.duration}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{TIMELINE_MILESTONES.length} milestones</span>
          <span>{EVOLUTION_SUMMARY.team}</span>
        </div>
      </header>

      {/* Filter bar */}
      <div className="flex gap-1 px-4 pt-3 overflow-x-auto">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all shrink-0 ${
              filter === f.id
                ? 'text-cloud-white'
                : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
            }`}
            style={filter === f.id ? { backgroundColor: `${f.color}20`, color: f.color } : {}}
          >
            <span>{f.label}</span>
            <span className="text-sm px-1 py-0.5 rounded bg-[rgba(255,255,255,0.09)]">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* Hero summary */}
        <FadeIn>
          <div className="glass-card p-5 border border-[rgba(139,92,246,0.15)]">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-neon-purple" />
              <h3 className="text-lg font-heading font-bold text-cloud-white">De Zero a Ecosysteme Complet</h3>
            </div>
            <p className="text-sm text-steel-gray mb-4">
              En ~3 mois, 1 humain et 1 IA ont construit un ecosysteme de production complet: infrastructure,
              agents autonomes, knowledge base, securite enterprise, monitoring 24/7. Voici chaque etape.
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { value: 6, label: 'VMs', color: '#00D4FF' },
                { value: 30, label: 'Containers', color: '#00D4FF' },
                { value: 41, label: 'Agents', color: '#F472B6' },
                { value: 663, label: 'Tests', color: '#4ADE80' },
                { value: 575, label: 'Notes', color: '#FBBF24' },
                { value: 31, label: 'Controles', color: '#4ADE80' },
              ].map(s => (
                <div key={s.label} className="text-center p-2 rounded-lg bg-[rgba(255,255,255,0.04)]">
                  <AnimatedCounter value={s.value} className="text-xl font-heading font-bold" />
                  <p className="text-[11px] text-steel-gray">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.08)]" />

          <StaggerContainer className="space-y-3" staggerDelay={0.07}>
            {filtered.map((milestone, index) => {
              const isExpanded = expandedId === milestone.id
              const catConfig = CATEGORY_CONFIG[milestone.category]
              const isLast = index === filtered.length - 1

              return (
                <StaggerItem key={milestone.id}>
                  <button
                    onClick={() => setExpandedId(prev => prev === milestone.id ? null : milestone.id)}
                    className="w-full text-left relative pl-14"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 top-5 w-5 h-5 rounded-full flex items-center justify-center z-10 text-xs ring-4 ring-deep-space"
                      style={{ backgroundColor: catConfig.color }}
                    >
                      {isLast ? '★' : ''}
                    </div>

                    <div className={`glass-card p-4 transition-all hover:bg-[rgba(255,255,255,0.08)] ${
                      isLast ? 'ring-1 ring-[rgba(139,92,246,0.3)]' : ''
                    }`}>
                      {/* Date + category */}
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-3.5 h-3.5 text-steel-gray" />
                        <span className="text-sm text-steel-gray">{milestone.date}</span>
                        <span
                          className="text-sm px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${catConfig.color}18`, color: catConfig.color }}
                        >
                          {catConfig.label}
                        </span>
                        <span className="text-xl ml-auto">{milestone.icon}</span>
                        {isExpanded
                          ? <ChevronUp className="w-4 h-4 text-steel-gray" />
                          : <ChevronDown className="w-4 h-4 text-steel-gray" />
                        }
                      </div>

                      {/* Title + impact */}
                      <h4 className="text-base font-heading font-semibold text-cloud-white mb-1">
                        {milestone.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mb-2">
                        <ArrowRight className="w-3 h-3 text-success-green" />
                        <span className="text-sm text-success-green">{milestone.impact}</span>
                      </div>

                      {/* Description (always visible) */}
                      <p className={`text-sm text-steel-gray ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {milestone.description}
                      </p>

                      {/* Metrics (expanded) */}
                      {isExpanded && milestone.metrics && (
                        <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)] animate-in fade-in duration-200">
                          <div className="grid grid-cols-3 gap-3">
                            {milestone.metrics.map(m => (
                              <div key={m.label} className="p-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] text-center">
                                <p className="text-[11px] text-steel-gray mb-1">{m.label}</p>
                                {m.before ? (
                                  <div className="flex items-center justify-center gap-1.5">
                                    <span className="text-sm text-steel-gray line-through">{m.before}</span>
                                    <ArrowRight className="w-3 h-3 text-success-green" />
                                    <span className="text-sm font-heading font-bold" style={{ color: catConfig.color }}>{m.after}</span>
                                  </div>
                                ) : (
                                  <span className="text-sm font-heading font-bold" style={{ color: catConfig.color }}>{m.after}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.2}>
          <div className="glass-card p-5 text-center border border-[rgba(139,92,246,0.15)]">
            <p className="text-lg font-heading font-semibold text-cloud-white mb-1">
              {EVOLUTION_SUMMARY.fromZero}
            </p>
            <p className="text-sm text-steel-gray">
              {EVOLUTION_SUMMARY.team} — {EVOLUTION_SUMMARY.duration} — {EVOLUTION_SUMMARY.totalComponents} composants — {EVOLUTION_SUMMARY.totalTests} tests — {EVOLUTION_SUMMARY.totalAgents} agents
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
