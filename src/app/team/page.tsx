'use client'

import { useState } from 'react'
import { Users, Star, Zap, ExternalLink, User, Bot, Cpu, Box } from 'lucide-react'
import { TEAM_STATS, TYPE_LABELS, getTeamMembers, getProjectHighlights } from '@/lib/team-data'
import { useLocale } from '@/lib/i18n'

type Filter = 'all' | 'human' | 'ai' | 'agent' | 'service'

export default function TeamPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const { locale, t } = useLocale()

  const members = getTeamMembers(locale)
  const projects = getProjectHighlights(locale)
  const filtered = filter === 'all' ? members : members.filter(m => m.type === filter)

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: t('team.all'), count: members.length },
    { id: 'human', label: 'Human', count: members.filter(m => m.type === 'human').length },
    { id: 'ai', label: 'AI Partner', count: members.filter(m => m.type === 'ai').length },
    { id: 'agent', label: 'Agents', count: members.filter(m => m.type === 'agent').length },
    { id: 'service', label: 'Services', count: members.filter(m => m.type === 'service').length },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">{t('team.title')}</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--purple-tint)] text-neon-purple">
            {members.length} {t('team.members')}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{TEAM_STATS.humans} human</span>
          <span>{TEAM_STATS.aiPartners} AI</span>
          <span>{TEAM_STATS.agents} {t('common.agents')}</span>
          <span>{TEAM_STATS.services} services</span>
        </div>
      </header>

      {/* Team Manifesto */}
      <div className="mx-4 mt-3 p-4 rounded-xl border border-[var(--glass-border)] bg-gradient-to-r from-[var(--purple-tint)] via-[var(--cyan-tint-light)] to-[var(--purple-tint)]">
        <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--cyan-tint)] border border-electric-cyan/20 text-sm font-bold text-electric-cyan">
            <User className="w-3.5 h-3.5" /> 1 Human
          </span>
          <span className="text-[var(--dim-text)]">+</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--purple-tint-strong)] border border-[var(--purple-border)] text-sm font-bold text-neon-purple">
            <Bot className="w-3.5 h-3.5" /> 1 AI
          </span>
          <span className="text-[var(--dim-text)]">+</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--amber-tint)] border border-amber-warm/20 text-sm font-bold text-amber-warm">
            <Users className="w-3.5 h-3.5" /> 13 Agents
          </span>
          <span className="text-[var(--dim-text)]">+</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--coral-tint)] border border-coral-energy/20 text-sm font-bold text-coral-energy">
            <Cpu className="w-3.5 h-3.5" /> 28 Subagents
          </span>
          <span className="text-[var(--dim-text)]">+</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--green-tint)] border border-success-green/20 text-sm font-bold text-success-green">
            <Box className="w-3.5 h-3.5" /> 30 Containers
          </span>
        </div>
        <p className="text-center text-base text-steel-gray">
          <span className="text-lg font-heading font-semibold text-success-green">{t('manifesto.pre')}</span> <span className="text-xl font-heading font-bold text-electric-cyan">{t('manifesto.human')}</span>, <span className="text-lg font-heading font-semibold text-neon-purple">{t('manifesto.ai')}</span>, <span className="text-lg font-heading font-semibold text-amber-warm">{t('manifesto.agents')}</span>.
        </p>
      </div>

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

      <div className="flex-1 overflow-auto p-4 space-y-6">

        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Skills', value: TEAM_STATS.skills, color: 'text-neon-purple' },
            { label: 'Commands', value: TEAM_STATS.commands, color: 'text-electric-cyan' },
            { label: 'Tests', value: TEAM_STATS.tests, color: 'text-success-green' },
            { label: 'Vault Notes', value: TEAM_STATS.vaultNotes, color: 'text-amber-warm' },
            { label: 'Monitors', value: TEAM_STATS.uptimeMonitors, color: 'text-coral-energy' },
          ].map(s => (
            <div key={s.label} className="glass-card p-3 text-center">
              <span className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</span>
              <p className="text-sm text-steel-gray">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(member => {
            const isSelected = selectedMember === member.id
            const typeInfo = TYPE_LABELS[member.type]
            return (
              <button
                key={member.id}
                onClick={() => setSelectedMember(prev => prev === member.id ? null : member.id)}
                className={`text-left glass-card p-4 transition-all hover:bg-[var(--subtle-bg-3)] ${
                  isSelected ? 'ring-1 ring-[var(--purple-ring)]' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: `${member.color}15` }}
                  >
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-heading font-semibold text-cloud-white">{member.name}</span>
                      <span
                        className="text-sm px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${typeInfo.color}18`, color: typeInfo.color }}
                      >
                        {typeInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-steel-gray truncate">{member.title} — {member.role}</p>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm text-steel-gray mb-3 ${isSelected ? '' : 'line-clamp-2'}`}>
                  {member.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.slice(0, isSelected ? undefined : 3).map(skill => (
                    <span
                      key={skill}
                      className="text-sm px-2 py-0.5 rounded-md bg-[var(--subtle-bg-2)] text-cloud-white"
                    >
                      {skill}
                    </span>
                  ))}
                  {!isSelected && member.skills.length > 3 && (
                    <span className="text-sm px-2 py-0.5 rounded-md bg-[var(--subtle-bg)] text-steel-gray">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Fun fact (expanded) */}
                {isSelected && member.funFact && (
                  <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)] animate-in fade-in duration-200">
                    <div className="flex items-start gap-2">
                      <Star className="w-3.5 h-3.5 text-amber-warm mt-0.5 shrink-0" />
                      <span className="text-sm text-amber-warm">{member.funFact}</span>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Project highlights */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-neon-purple" />
            <h3 className="text-base font-heading font-semibold text-cloud-white">{t('team.projects')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map(project => (
              <div key={project.id} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-heading font-semibold text-cloud-white">{project.name}</span>
                  <span className={`text-sm px-1.5 py-0.5 rounded ${
                    project.status === 'live'
                      ? 'bg-[var(--green-tint)] text-success-green'
                      : project.status === 'active'
                      ? 'bg-[var(--cyan-tint)] text-electric-cyan'
                      : 'bg-[var(--amber-tint)] text-amber-warm'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-steel-gray mb-2">{project.description}</p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-electric-cyan hover:underline"
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {project.url.replace('https://', '')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mission statement */}
        <div className="glass-card p-6 text-center">
          <p className="text-lg font-heading text-cloud-white mb-2">
            1 Human + 1 AI + 13 Agents + 28 Subagents + 30 Services
          </p>
          <p className="text-base text-steel-gray">
            {t('team.mission')}
          </p>
        </div>
      </div>
    </div>
  )
}
