'use client'

import { useState } from 'react'
import { ArrowRight, Users, Server, Globe, GitBranch, Radio, ChevronDown, ChevronUp } from 'lucide-react'
import { FLOW_SCENARIOS, ACTOR_CONFIG, PHASE_CONFIG } from '@/lib/flows-data'
import type { FlowActor, FlowStep } from '@/lib/flows-data'

function ActorBadge({ actor }: { actor: FlowActor }) {
  const cfg = ACTOR_CONFIG[actor]
  return (
    <span
      className="text-sm font-medium px-2 py-0.5 rounded-md"
      style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}
    >
      {cfg.name}
    </span>
  )
}

function StepCard({ step, index }: { step: FlowStep; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const phase = PHASE_CONFIG[step.phase]
  const fromCfg = ACTOR_CONFIG[step.from]
  const toCfg = ACTOR_CONFIG[step.to]
  const isSelf = step.from === step.to

  return (
    <div className="flex gap-3">
      {/* Timeline */}
      <div className="flex flex-col items-center w-10 shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
        >
          {index + 1}
        </div>
        <div className="w-px flex-1 min-h-[16px]" style={{ backgroundColor: `${phase.color}30` }} />
      </div>

      {/* Card */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex-1 mb-2 text-left glass-card p-3 transition-all hover:bg-[rgba(255,255,255,0.08)]"
      >
        {/* Header row */}
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <ActorBadge actor={step.from} />
          {!isSelf && (
            <>
              <ArrowRight className="w-3.5 h-3.5 text-steel-gray shrink-0" />
              <ActorBadge actor={step.to} />
            </>
          )}
          {step.protocol && (
            <span className="text-sm px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.07)] text-steel-gray ml-auto">
              {step.protocol}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-steel-gray ml-auto shrink-0" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-steel-gray ml-auto shrink-0" />
          )}
        </div>

        {/* Action title */}
        <p className="text-base font-medium text-cloud-white mb-0.5">{step.action}</p>
        <p className="text-sm text-steel-gray">{step.detail}</p>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.08)] space-y-2 animate-in fade-in duration-200">
            {step.agents && step.agents.length > 0 && (
              <div className="flex items-start gap-2">
                <Users className="w-3.5 h-3.5 text-neon-purple mt-0.5 shrink-0" />
                <div className="flex flex-wrap gap-1.5">
                  {step.agents.map(a => (
                    <span key={a} className="text-sm px-2 py-0.5 rounded-md bg-[rgba(139,92,246,0.12)] text-neon-purple">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {step.services && step.services.length > 0 && (
              <div className="flex items-start gap-2">
                <Server className="w-3.5 h-3.5 text-electric-cyan mt-0.5 shrink-0" />
                <div className="flex flex-wrap gap-1.5">
                  {step.services.map(s => (
                    <span key={s} className="text-sm px-2 py-0.5 rounded-md bg-[rgba(0,212,255,0.12)] text-electric-cyan">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </button>
    </div>
  )
}

export default function FlowsPage() {
  const [activeScenario, setActiveScenario] = useState(FLOW_SCENARIOS[0].id)
  const scenario = FLOW_SCENARIOS.find(s => s.id === activeScenario)!

  // Group steps by phase
  const phases = [...new Set(scenario.steps.map(s => s.phase))]
  // Count unique actors
  const actors = new Set<FlowActor>()
  scenario.steps.forEach(s => { actors.add(s.from); actors.add(s.to) })

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">Interaction Flows</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[rgba(139,92,246,0.1)] text-neon-purple">
            {FLOW_SCENARIOS.length} scenarios
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{actors.size} actors</span>
          <span>{scenario.steps.length} steps</span>
        </div>
      </header>

      {/* Scenario selector */}
      <div className="flex gap-1.5 px-4 pt-3 overflow-x-auto">
        {FLOW_SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScenario(s.id)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeScenario === s.id
                ? 'bg-[rgba(139,92,246,0.15)] text-neon-purple'
                : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Scenario description */}
        <div className="glass-card p-4">
          <p className="text-base text-cloud-white font-medium mb-2">{scenario.name}</p>
          <p className="text-sm text-steel-gray mb-3">{scenario.description}</p>

          {/* Actor legend */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[...actors].map(a => {
              const cfg = ACTOR_CONFIG[a]
              const icon = cfg.type === 'human' ? '👤' : cfg.type === 'external' ? '🌐' : '🖥️'
              return (
                <div key={a} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[rgba(255,255,255,0.04)]">
                  <span className="text-sm">{icon}</span>
                  <span className="text-sm font-medium" style={{ color: cfg.color }}>{cfg.name}</span>
                </div>
              )
            })}
          </div>

          {/* Phase legend */}
          <div className="flex flex-wrap gap-2">
            {phases.map(p => {
              const cfg = PHASE_CONFIG[p]
              const count = scenario.steps.filter(s => s.phase === p).length
              return (
                <div key={p} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                  <span className="text-sm text-steel-gray">{cfg.label}</span>
                  <span className="text-sm text-steel-gray">({count})</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Steps by phase */}
        {phases.map(phase => {
          const cfg = PHASE_CONFIG[phase]
          const phaseSteps = scenario.steps.filter(s => s.phase === phase)
          return (
            <div key={phase}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color }} />
                <h3 className="text-base font-heading font-semibold text-cloud-white">{cfg.label}</h3>
                <div className="flex-1 h-px ml-2" style={{ backgroundColor: `${cfg.color}30` }} />
                <span className="text-sm text-steel-gray">{phaseSteps.length} steps</span>
              </div>
              {phaseSteps.map((step, i) => (
                <StepCard
                  key={step.id}
                  step={step}
                  index={scenario.steps.indexOf(step)}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
