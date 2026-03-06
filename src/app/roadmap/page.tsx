'use client'

import { useState } from 'react'
import { Rocket, ChevronDown, ChevronUp, Calendar, GitBranch, Layers } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/studio/fade-in'
import { AnimatedCounter } from '@/components/studio/animated-counter'
import {
  ROADMAP_PROJECTS, getRoadmapProjects, getStatusConfig, getCategoryConfig,
} from '@/lib/roadmap-data'
import { useLocale } from '@/lib/i18n'

type Filter = 'all' | 'product' | 'infrastructure' | 'ai' | 'platform'

export default function RoadmapPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>('farmsysteme')
  const { locale, t } = useLocale()

  const projects = getRoadmapProjects(locale)
  const statusConfig = getStatusConfig(locale)
  const categoryConfig = getCategoryConfig(locale)

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: t('common.all'), count: projects.length },
    ...Object.entries(categoryConfig).map(([id, cfg]) => ({
      id: id as Filter,
      label: cfg.label,
      count: projects.filter(p => p.category === id).length,
    })),
  ]

  const avgProgress = Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">{t('roadmap.title')}</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--cyan-tint)] text-electric-cyan">
            Roadmap 2026
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{projects.length} {t('roadmap.projects')}</span>
          <span>{projects.filter(p => p.status === 'design' || p.status === 'development').length} {t('roadmap.active')}</span>
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
                ? 'bg-[var(--cyan-tint)] text-electric-cyan'
                : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
            }`}
          >
            <span>{f.label}</span>
            <span className="text-sm px-1 py-0.5 rounded bg-[var(--subtle-bg-3)]">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* Overview stats */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-card p-3 text-center">
              <AnimatedCounter value={projects.length} className="text-2xl font-heading font-bold text-cloud-white" />
              <p className="text-sm text-steel-gray">{t('roadmap.projects')}</p>
            </div>
            <div className="glass-card p-3 text-center">
              <AnimatedCounter value={projects.reduce((s, p) => s + p.features.length, 0)} className="text-2xl font-heading font-bold text-electric-cyan" />
              <p className="text-sm text-steel-gray">{t('roadmap.planned.features')}</p>
            </div>
            <div className="glass-card p-3 text-center">
              <AnimatedCounter value={avgProgress} suffix="%" className="text-2xl font-heading font-bold text-neon-purple" />
              <p className="text-sm text-steel-gray">{t('roadmap.avg.progress')}</p>
            </div>
            <div className="glass-card p-3 text-center">
              <span className="text-2xl font-heading font-bold text-amber-warm">2026</span>
              <p className="text-sm text-steel-gray">{t('roadmap.horizon')}</p>
            </div>
          </div>
        </FadeIn>

        {/* Status pipeline */}
        <FadeIn delay={0.1}>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="w-4 h-4 text-electric-cyan" />
              <h3 className="text-base font-heading font-semibold text-cloud-white">{t('roadmap.pipeline')}</h3>
            </div>
            <div className="flex gap-2">
              {Object.entries(statusConfig).map(([status, cfg]) => {
                const count = projects.filter(p => p.status === status).length
                return (
                  <div key={status} className="flex-1 text-center p-2.5 rounded-lg" style={{ backgroundColor: `${cfg.color}${cfg.bgOpacity}` }}>
                    <span className="text-lg font-heading font-bold" style={{ color: cfg.color }}>{count}</span>
                    <p className="text-[11px]" style={{ color: cfg.color }}>{cfg.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>

        {/* Project cards */}
        <StaggerContainer className="space-y-3" staggerDelay={0.06}>
          {filtered.map(project => {
            const isExpanded = expandedId === project.id
            const statusCfg = statusConfig[project.status]
            const catCfg = categoryConfig[project.category]

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
                          style={{ backgroundColor: `${statusCfg.color}18`, color: statusCfg.color }}
                        >
                          {statusCfg.label}
                        </span>
                        <span
                          className="text-sm px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${catCfg.color}18`, color: catCfg.color }}
                        >
                          {catCfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-steel-gray">{project.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-steel-gray" />
                        <span className="text-sm text-steel-gray">{project.targetDate}</span>
                      </div>
                    </div>
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 text-steel-gray shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-steel-gray shrink-0" />
                    }
                  </div>

                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-steel-gray">{t('roadmap.progress')}</span>
                      <span className="text-[11px] font-medium" style={{ color: project.color }}>{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-[var(--subtle-bg-2)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm text-steel-gray ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {project.description}
                  </p>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)] space-y-4 animate-in fade-in duration-200">
                      {/* Features */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Layers className="w-3.5 h-3.5" style={{ color: project.color }} />
                          <span className="text-sm font-medium text-cloud-white">{t('roadmap.planned.features')} ({project.features.length})</span>
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
                        <span className="text-sm font-medium text-cloud-white mb-2 block">Tech Stack</span>
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

                      {/* Dependencies */}
                      {project.dependencies && (
                        <div>
                          <span className="text-sm font-medium text-amber-warm mb-1 block">{t('roadmap.dependencies')}</span>
                          {project.dependencies.map((dep, i) => (
                            <p key={i} className="text-sm text-steel-gray flex items-start gap-1.5">
                              <span className="text-amber-warm shrink-0">&rarr;</span> {dep}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </div>
  )
}
