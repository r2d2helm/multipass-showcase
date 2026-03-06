'use client'

import { useState } from 'react'
import { Brain, Users, Zap, Shield, BookOpen, Cpu, Eye, ClipboardList, Hammer, Activity, CheckCircle, ChevronRight } from 'lucide-react'
import { ALGORITHM_PHASES, AGENTS, SKILLS, HOOKS, TEAM_COLORS, CATEGORY_COLORS } from '@/lib/brain-data'

type Tab = 'algorithm' | 'agents' | 'skills' | 'hooks'

export default function BrainPage() {
  const [tab, setTab] = useState<Tab>('algorithm')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'algorithm', label: 'Algorithm', icon: Brain },
    { id: 'agents', label: 'Agents', icon: Users, count: AGENTS.length },
    { id: 'skills', label: 'Skills', icon: Zap, count: SKILLS.length },
    { id: 'hooks', label: 'Hooks', icon: Shield, count: HOOKS.length },
  ]

  const phaseIcons: Record<string, React.ElementType> = {
    observe: Eye,
    think: Brain,
    plan: ClipboardList,
    build: Hammer,
    execute: Activity,
    verify: CheckCircle,
    learn: BookOpen,
  }

  const teams = [...new Set(AGENTS.map(a => a.team))]
  const categories = [...new Set(SKILLS.map(s => s.category))]
  const totalCommands = SKILLS.reduce((s, sk) => s + sk.commands, 0)
  const totalWizards = SKILLS.reduce((s, sk) => s + sk.wizards, 0)
  const totalSubagents = AGENTS.reduce((s, a) => s + (a.subagents?.length || 0), 0)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">PAI Brain</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[rgba(139,92,246,0.1)] text-neon-purple">
            Algorithm v1.8.0
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{AGENTS.length} agents</span>
          <span>{totalSubagents} subagents</span>
          <span>{SKILLS.length} skills</span>
          <span>{totalCommands} commands</span>
        </div>
      </header>

      {/* Tab bar */}
      <div className="flex gap-1 px-4 pt-3">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-base transition-all ${
                tab === t.id
                  ? 'bg-[rgba(139,92,246,0.15)] text-neon-purple'
                  : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
              {t.count && (
                <span className="text-sm px-1 py-0.5 rounded bg-[rgba(255,255,255,0.09)]">{t.count}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Algorithm Tab */}
        {tab === 'algorithm' && (
          <>
            {/* Phase Flow */}
            <div className="glass-card p-4">
              <h3 className="text-lg font-heading font-semibold text-cloud-white mb-4">7-Phase Algorithm Flow</h3>
              <div className="flex flex-col gap-2">
                {ALGORITHM_PHASES.map((phase, i) => {
                  const Icon = phaseIcons[phase.id] || Brain
                  return (
                    <div key={phase.id} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-8 justify-center">
                        <span className="text-sm text-steel-gray font-mono">{i + 1}</span>
                      </div>
                      <div
                        className="flex items-center gap-3 flex-1 py-2.5 px-3 rounded-lg transition-all"
                        style={{ backgroundColor: `${phase.color}10` }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${phase.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: phase.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-heading font-semibold text-cloud-white">{phase.name}</span>
                            <span className="text-xs">{phase.emoji}</span>
                          </div>
                          <p className="text-sm text-steel-gray truncate">{phase.description}</p>
                        </div>
                      </div>
                      {i < ALGORITHM_PHASES.length - 1 && (
                        <ChevronRight className="w-3 h-3 text-steel-gray/50 shrink-0 rotate-90" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Core Concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-electric-cyan" />
                  <h4 className="text-base font-heading font-semibold text-cloud-white">Ideal State Criteria</h4>
                </div>
                <p className="text-sm text-steel-gray leading-relaxed">
                  8-12 word binary testable criteria that define IDEAL STATE. The Algorithm hill-climbs toward these criteria through iterative phases.
                </p>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-neon-purple" />
                  <h4 className="text-base font-heading font-semibold text-cloud-white">Memory v2</h4>
                </div>
                <p className="text-sm text-steel-gray leading-relaxed">
                  SQLite + embeddings with hybrid search. Recency boost, type-aware decay, vector-enhanced merge. 813+ chunks indexed from vault.
                </p>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-coral-energy" />
                  <h4 className="text-base font-heading font-semibold text-cloud-white">Security Layer</h4>
                </div>
                <p className="text-sm text-steel-gray leading-relaxed">
                  Pre-execution validation on every Bash command. Path guard for sensitive files. 493+ tests ensuring hook safety.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Agents Tab */}
        {tab === 'agents' && (
          <>
            {teams.map(team => (
              <div key={team} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: TEAM_COLORS[team] }}
                  />
                  <h3 className="text-lg font-heading font-semibold text-cloud-white">{team}</h3>
                  <span className="text-sm text-steel-gray ml-auto">
                    {AGENTS.filter(a => a.team === team).length} agents
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AGENTS.filter(a => a.team === team).map(agent => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(prev => prev === agent.id ? null : agent.id)}
                      className={`text-left p-3 rounded-lg transition-all ${
                        selectedAgent === agent.id
                          ? 'bg-[rgba(255,255,255,0.08)] ring-1 ring-[rgba(255,255,255,0.1)]'
                          : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-3 h-3" style={{ color: TEAM_COLORS[team] }} />
                        <span className="text-base font-medium text-cloud-white">{agent.name}</span>
                        <span className="text-sm px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.09)] text-steel-gray ml-auto">
                          {agent.role}
                        </span>
                      </div>
                      {selectedAgent === agent.id && (
                        <div className="mt-2 animate-in fade-in duration-200">
                          <p className="text-sm text-steel-gray mb-2">
                            {agent.description}
                          </p>
                          {agent.subagents && agent.subagents.length > 0 && (
                            <div className="space-y-1.5 pt-2 border-t border-[rgba(255,255,255,0.08)]">
                              <span className="text-sm text-steel-gray font-medium">Subagents ({agent.subagents.length})</span>
                              {agent.subagents.map(sub => (
                                <div key={sub.id} className="flex items-start gap-2 ml-2 py-1 px-2 rounded bg-[rgba(255,255,255,0.04)]">
                                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: TEAM_COLORS[team] }} />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-cloud-white">{sub.name}</span>
                                      <span className="text-sm px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.07)]" style={{ color: TEAM_COLORS[team] }}>
                                        {sub.type}
                                      </span>
                                    </div>
                                    <p className="text-sm text-steel-gray">{sub.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Skills Tab */}
        {tab === 'skills' && (
          <>
            <div className="flex items-center gap-4 text-sm text-steel-gray mb-1">
              <span>{totalCommands} commands total</span>
              <span>{totalWizards} wizards total</span>
              <span>{categories.length} categories</span>
            </div>

            {/* Category legend */}
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map(cat => (
                <div key={cat} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] }} />
                  <span className="text-sm text-steel-gray uppercase">{cat}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SKILLS.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(prev => prev === skill.id ? null : skill.id)}
                  className={`glass-card p-3 text-left transition-all ${
                    selectedSkill === skill.id
                      ? 'ring-1 ring-[rgba(255,255,255,0.15)]'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[skill.category] }}
                    />
                    <span className="text-base font-heading font-semibold text-cloud-white">{skill.name}</span>
                    <code className="text-sm text-steel-gray ml-auto font-mono">{skill.prefix}</code>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-steel-gray">
                    <span>{skill.commands} cmd</span>
                    <span>{skill.wizards} wiz</span>
                    <span className="uppercase text-sm px-1 py-0.5 rounded"
                          style={{ backgroundColor: `${CATEGORY_COLORS[skill.category]}15`, color: CATEGORY_COLORS[skill.category] }}>
                      {skill.category}
                    </span>
                  </div>
                  {selectedSkill === skill.id && (
                    <p className="text-sm text-steel-gray mt-2 animate-in fade-in duration-200">
                      {skill.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Hooks Tab */}
        {tab === 'hooks' && (
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-coral-energy" />
              <h3 className="text-lg font-heading font-semibold text-cloud-white">Hook Pipeline</h3>
              <span className="text-sm text-steel-gray ml-auto">{HOOKS.length} hooks active</span>
            </div>
            <div className="space-y-2">
              {HOOKS.map((hook, i) => (
                <div key={hook.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[rgba(255,255,255,0.05)]">
                  <span className="text-sm text-steel-gray font-mono w-5 text-right shrink-0">{i + 1}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-success-green shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-cloud-white font-medium">{hook.name}</span>
                      <code className="text-sm px-1.5 py-0.5 rounded bg-[rgba(255,107,107,0.1)] text-coral-energy font-mono">
                        {hook.event}
                      </code>
                    </div>
                    <p className="text-sm text-steel-gray truncate">{hook.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hook event flow */}
            <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <h4 className="text-sm text-steel-gray uppercase tracking-wide mb-2">Event Flow</h4>
              <div className="flex flex-wrap gap-2">
                {['SessionStart', 'UserPromptSubmit', 'PreToolUse', 'PostToolUse', 'SubagentStop', 'Stop', 'Notification', 'Cron'].map(event => {
                  const count = HOOKS.filter(h => h.event.startsWith(event) || h.event === event).length
                  return (
                    <div key={event} className="flex items-center gap-1 px-2 py-1 rounded bg-[rgba(255,255,255,0.09)]">
                      <span className="text-sm text-cloud-white">{event}</span>
                      {count > 0 && (
                        <span className="text-sm px-1 rounded-full bg-[rgba(255,107,107,0.1)] text-coral-energy">{count}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
