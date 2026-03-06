'use client'

import { useState } from 'react'
import { Users, Star, Zap, ExternalLink } from 'lucide-react'
import { TEAM_MEMBERS, PROJECT_HIGHLIGHTS, TEAM_STATS, TYPE_LABELS, type TeamMember } from '@/lib/team-data'

type Filter = 'all' | 'human' | 'ai' | 'agent' | 'service'

export default function TeamPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const filtered = filter === 'all' ? TEAM_MEMBERS : TEAM_MEMBERS.filter(m => m.type === filter)

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'Tous', count: TEAM_MEMBERS.length },
    { id: 'human', label: 'Human', count: TEAM_MEMBERS.filter(m => m.type === 'human').length },
    { id: 'ai', label: 'AI Partner', count: TEAM_MEMBERS.filter(m => m.type === 'ai').length },
    { id: 'agent', label: 'Agents', count: TEAM_MEMBERS.filter(m => m.type === 'agent').length },
    { id: 'service', label: 'Services', count: TEAM_MEMBERS.filter(m => m.type === 'service').length },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">L&apos;Equipe MultiPass</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[rgba(139,92,246,0.1)] text-neon-purple">
            {TEAM_MEMBERS.length} membres
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{TEAM_STATS.humans} human</span>
          <span>{TEAM_STATS.aiPartners} AI</span>
          <span>{TEAM_STATS.agents} agents</span>
          <span>{TEAM_STATS.services} services</span>
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
                ? 'bg-[rgba(139,92,246,0.15)] text-neon-purple'
                : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
            }`}
          >
            <span>{f.label}</span>
            <span className="text-sm px-1 py-0.5 rounded bg-[rgba(255,255,255,0.09)]">{f.count}</span>
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
                className={`text-left glass-card p-4 transition-all hover:bg-[rgba(255,255,255,0.08)] ${
                  isSelected ? 'ring-1 ring-[rgba(139,92,246,0.4)]' : ''
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
                      className="text-sm px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.06)] text-cloud-white"
                    >
                      {skill}
                    </span>
                  ))}
                  {!isSelected && member.skills.length > 3 && (
                    <span className="text-sm px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.04)] text-steel-gray">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Fun fact (expanded) */}
                {isSelected && member.funFact && (
                  <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)] animate-in fade-in duration-200">
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
            <h3 className="text-base font-heading font-semibold text-cloud-white">Projets de l&apos;Ecosysteme</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROJECT_HIGHLIGHTS.map(project => (
              <div key={project.id} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-heading font-semibold text-cloud-white">{project.name}</span>
                  <span className={`text-sm px-1.5 py-0.5 rounded ${
                    project.status === 'live'
                      ? 'bg-[rgba(74,222,128,0.1)] text-success-green'
                      : project.status === 'active'
                      ? 'bg-[rgba(0,212,255,0.1)] text-electric-cyan'
                      : 'bg-[rgba(255,191,36,0.1)] text-amber-warm'
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
            Une equipe ou l&apos;humain decide, l&apos;IA orchestre, et les agents executent.
            Chaque membre a un role precis dans l&apos;ecosysteme MultiPass.
          </p>
        </div>
      </div>
    </div>
  )
}
