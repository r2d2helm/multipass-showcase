'use client'

import { useState } from 'react'
import { Briefcase, TrendingUp, ChevronDown, ChevronUp, Layers, Wrench, AlertTriangle, Target, Clock } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/studio/fade-in'
import { AnimatedCounter } from '@/components/studio/animated-counter'
import {
  PORTFOLIO_STATS, TYPE_CONFIG, getPortfolioProjects,
} from '@/lib/portfolio-data'
import { useLocale } from '@/lib/i18n'

type Filter = 'all' | 'web' | 'mobile' | 'both'

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>('restaurant')
  const { locale, t } = useLocale()

  const projects = getPortfolioProjects(locale)

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter)

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: t('common.all'), count: projects.length },
    { id: 'web', label: 'Web App', count: projects.filter(p => p.type === 'web').length },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.type === 'mobile').length },
    { id: 'both', label: 'Web + Mobile', count: projects.filter(p => p.type === 'both').length },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">{t('portfolio.title')}</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--purple-tint)] text-neon-purple">
            {projects.length} {t('portfolio.types')}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{PORTFOLIO_STATS.industries} {t('common.industries')}</span>
          <span>{PORTFOLIO_STATS.avgTimeline} {t('portfolio.avg')}</span>
          <span>{PORTFOLIO_STATS.satisfaction} {t('common.satisfaction')}</span>
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
                ? 'bg-[var(--purple-tint-strong)] text-neon-purple'
                : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
            }`}
          >
            <span>{f.label}</span>
            <span className="text-sm px-1 py-0.5 rounded bg-[var(--subtle-bg-3)]">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* Hero */}
        <FadeIn>
          <div className="glass-card p-5 border border-[var(--purple-tint-strong)]">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-neon-purple" />
              <h3 className="text-lg font-heading font-bold text-cloud-white">{t('portfolio.hero.title')}</h3>
            </div>
            <p className="text-sm text-steel-gray mb-4">
              {t('portfolio.hero.desc')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-2.5 rounded-lg bg-[var(--subtle-bg)]">
                <AnimatedCounter value={7} className="text-xl font-heading font-bold text-cloud-white" />
                <p className="text-[11px] text-steel-gray">{t('common.industries')}</p>
              </div>
              <div className="text-center p-2.5 rounded-lg bg-[var(--subtle-bg)]">
                <span className="text-xl font-heading font-bold text-electric-cyan">85%</span>
                <p className="text-[11px] text-steel-gray">{t('portfolio.shared.stack')}</p>
              </div>
              <div className="text-center p-2.5 rounded-lg bg-[var(--subtle-bg)]">
                <span className="text-xl font-heading font-bold text-success-green">8-16</span>
                <p className="text-[11px] text-steel-gray">{t('portfolio.delivery')}</p>
              </div>
              <div className="text-center p-2.5 rounded-lg bg-[var(--subtle-bg)]">
                <span className="text-xl font-heading font-bold text-amber-warm">IA</span>
                <p className="text-[11px] text-steel-gray">{t('portfolio.inside')}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Projects */}
        <StaggerContainer className="space-y-3" staggerDelay={0.06}>
          {filtered.map(project => {
            const isExpanded = expandedId === project.id
            const typeCfg = TYPE_CONFIG[project.type]

            return (
              <StaggerItem key={project.id}>
                <button
                  onClick={() => setExpandedId(prev => prev === project.id ? null : project.id)}
                  className="w-full text-left glass-card p-4 transition-all hover:bg-[var(--subtle-bg-3)]"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: `${project.color}15` }}
                    >
                      {project.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-heading font-semibold text-cloud-white">{project.name}</span>
                        <span
                          className="text-sm px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${typeCfg.color}18`, color: typeCfg.color }}
                        >
                          {typeCfg.label}
                        </span>
                        <span className="text-sm px-1.5 py-0.5 rounded bg-[var(--subtle-bg-2)] text-steel-gray">
                          {project.industry}
                        </span>
                      </div>
                      <p className="text-sm text-steel-gray">{project.tagline}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-steel-gray" />
                      <span className="text-sm text-steel-gray">{project.timeline}</span>
                    </div>
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 text-steel-gray shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-steel-gray shrink-0" />
                    }
                  </div>

                  {/* Impact metrics (always visible) */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                    {project.impact.map(imp => (
                      <div key={imp.metric} className="text-center p-2 rounded-lg bg-[var(--subtle-bg)]">
                        <span className="text-lg font-heading font-bold" style={{ color: project.color }}>{imp.value}</span>
                        <p className="text-[11px] text-steel-gray">{imp.metric}</p>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className={`text-sm text-steel-gray ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {project.description}
                  </p>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)] space-y-4 animate-in fade-in duration-200">

                      {/* Problem / Solution */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[var(--coral-tint)] border border-[var(--coral-tint)]">
                          <div className="flex items-center gap-1.5 mb-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-coral-energy" />
                            <span className="text-sm font-medium text-coral-energy">{t('portfolio.problem')}</span>
                          </div>
                          <p className="text-sm text-steel-gray">{project.problem}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--green-tint)] border border-[var(--green-tint)]">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Target className="w-3.5 h-3.5 text-success-green" />
                            <span className="text-sm font-medium text-success-green">{t('portfolio.solution')}</span>
                          </div>
                          <p className="text-sm text-steel-gray">{project.solution}</p>
                        </div>
                      </div>

                      {/* Impact details */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-3.5 h-3.5" style={{ color: project.color }} />
                          <span className="text-sm font-medium text-cloud-white">{t('portfolio.impact')}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.impact.map(imp => (
                            <div key={imp.metric} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[var(--subtle-bg)]">
                              <span className="text-lg font-heading font-bold shrink-0 w-16 text-center" style={{ color: project.color }}>
                                {imp.value}
                              </span>
                              <div>
                                <span className="text-sm text-cloud-white">{imp.metric}</span>
                                <p className="text-[11px] text-steel-gray">{imp.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Layers className="w-3.5 h-3.5" style={{ color: project.color }} />
                          <span className="text-sm font-medium text-cloud-white">{t('portfolio.features')} ({project.features.length})</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                          {project.features.map((f, i) => (
                            <div key={i} className="flex items-start gap-2 py-1.5 px-2.5 rounded-lg bg-[var(--subtle-bg)]">
                              <span className="text-sm shrink-0" style={{ color: project.color }}>+</span>
                              <span className="text-sm text-steel-gray">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench className="w-3.5 h-3.5" style={{ color: project.color }} />
                          <span className="text-sm font-medium text-cloud-white">Tech Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map(tech => (
                            <span
                              key={tech}
                              className="text-sm px-2 py-0.5 rounded-md bg-[var(--subtle-bg-2)] text-cloud-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn delay={0.2}>
          <div className="glass-card p-6 text-center border-2 border-[var(--purple-ring)] bg-gradient-to-br from-[var(--purple-tint)] to-[var(--cyan-tint-light)]">
            <p className="text-2xl font-heading font-bold gradient-text mb-2">
              {t('portfolio.not.listed')}
            </p>
            <p className="text-base text-cloud-white/80 mb-4 max-w-lg mx-auto leading-relaxed">
              {t('portfolio.not.listed.desc')}
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-electric-cyan to-neon-purple text-white font-semibold text-lg shadow-lg shadow-[var(--purple-border)] hover:shadow-[var(--purple-ring)] transition-shadow">
              <Briefcase className="w-5 h-5" />
              contact@multipass.agency
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
