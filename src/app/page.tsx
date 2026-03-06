'use client'

import Link from 'next/link'
import { Server, Layers, Brain, Workflow, ShieldCheck, Lock, ShieldAlert, BookOpen, Users, Crown, Clock, ArrowRight } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/studio/fade-in'
import { AnimatedCounter } from '@/components/studio/animated-counter'

const HERO_STATS = [
  { value: 6, label: 'VMs Proxmox', suffix: '' },
  { value: 30, label: 'Containers', suffix: '' },
  { value: 13, label: 'Agents IA', suffix: '' },
  { value: 28, label: 'Subagents', suffix: '' },
  { value: 15, label: 'Skills PAI', suffix: '' },
  { value: 663, label: 'Tests Auto', suffix: '' },
  { value: 575, label: 'Vault Notes', suffix: '+' },
  { value: 22, label: 'Monitors', suffix: '' },
]

const PAGES = [
  { href: '/infra', label: 'Infrastructure', icon: Server, color: '#00D4FF', description: '6 VMs Proxmox 9, Dell R740, 128 Go RAM, reseau segmente' },
  { href: '/stack', label: 'Stack', icon: Layers, color: '#8B5CF6', description: '30 containers Docker, 7 stacks Compose, architecture interactive' },
  { href: '/brain', label: 'Brain', icon: Brain, color: '#F472B6', description: 'PAI Algorithm v1.8.0, 13 agents, 28 subagents, 15 skills' },
  { href: '/flows', label: 'Flows', icon: Workflow, color: '#FBBF24', description: 'Workflows interactifs: dev cycle, warehouse, incident recovery' },
  { href: '/monitoring', label: 'Monitoring', icon: ShieldCheck, color: '#4ADE80', description: '22 monitors Uptime Kuma, alertes ntfy, backups quotidiens' },
  { href: '/security', label: 'Security', icon: Lock, color: '#4ADE80', description: '6 couches defense, 31 controles, zero ports ouverts' },
  { href: '/supervisor', label: 'MegaSupervisor', icon: ShieldAlert, color: '#FF6B6B', description: 'Recovery L1-L5, reconstruction ecosysteme, incident playbooks' },
  { href: '/warehouse', label: 'Warehouse', icon: BookOpen, color: '#00D4FF', description: '23 fiches knowledge, pipeline 5 agents, indexation Mem0' },
  { href: '/team', label: 'Team', icon: Users, color: '#8B5CF6', description: '1 human + 1 AI + 13 agents + 3 services core' },
  { href: '/franchise', label: 'Franchise', icon: Crown, color: '#FBBF24', description: 'Pack commercial, 3 tiers, comparatif features, FAQ' },
  { href: '/timeline', label: 'Timeline', icon: Clock, color: '#8B5CF6', description: 'How We Built This: serveur nu → ecosysteme complet en 3 mois' },
]

export default function HomePage() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Hero */}
      <div className="relative px-6 py-12 lg:py-16 text-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,212,255,0.06)] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

        <FadeIn>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] mb-6">
              <span className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
              <span className="text-sm text-neon-purple font-medium">Ecosystem Live — Production</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-cloud-white mb-3">
              MultiPass <span className="gradient-text">Studio</span>
            </h1>
            <p className="text-lg text-steel-gray max-w-xl mx-auto mb-8">
              L&apos;ecosysteme complet d&apos;une equipe IA autonome — infrastructure, agents, knowledge, securite — en un coup d&apos;oeil.
            </p>
          </div>
        </FadeIn>

        {/* Animated stats */}
        <FadeIn delay={0.2}>
          <div className="relative z-10 grid grid-cols-4 lg:grid-cols-8 gap-3 max-w-4xl mx-auto mb-8">
            {HERO_STATS.map(s => (
              <div key={s.label} className="glass-card p-3 text-center">
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="text-xl lg:text-2xl font-heading font-bold text-cloud-white"
                />
                <p className="text-[11px] lg:text-xs text-steel-gray mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Signature */}
        <FadeIn delay={0.35}>
          <div className="relative z-10 flex items-center justify-center gap-3 text-sm text-steel-gray">
            <span className="text-xl">👨‍💻</span>
            <span>Mike</span>
            <span className="text-[rgba(255,255,255,0.2)]">+</span>
            <span className="text-xl">🤖</span>
            <span>R2D2</span>
            <span className="text-[rgba(255,255,255,0.2)]">|</span>
            <span>Dell R740 / Proxmox 9 / Ubuntu 24.04</span>
          </div>
        </FadeIn>
      </div>

      {/* Pages grid */}
      <div className="px-6 pb-8">
        <FadeIn delay={0.1}>
          <h2 className="text-lg font-heading font-semibold text-cloud-white mb-4">Explorer l&apos;ecosysteme</h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" staggerDelay={0.06}>
          {PAGES.map(page => {
            const Icon = page.icon
            return (
              <StaggerItem key={page.href}>
                <Link
                  href={page.href}
                  className="glass-card p-4 flex items-start gap-3 transition-all hover:bg-[rgba(255,255,255,0.08)] hover:scale-[1.02] group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${page.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: page.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-heading font-semibold text-cloud-white">{page.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel-gray opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-steel-gray leading-relaxed">{page.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>

      {/* Bottom tagline */}
      <FadeIn className="px-6 pb-6">
        <div className="glass-card p-5 text-center border border-[rgba(139,92,246,0.15)]">
          <p className="text-base font-heading text-cloud-white">
            1 Human + 1 AI + 13 Agents + 28 Subagents + 30 Containers
          </p>
          <p className="text-sm text-steel-gray mt-1">
            Ecosystem protege par brevet &copy; MultiPass Agency
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
