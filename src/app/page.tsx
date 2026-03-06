'use client'

import Link from 'next/link'
import { Server, Layers, Brain, Workflow, ShieldCheck, Lock, ShieldAlert, BookOpen, Users, Crown, Clock, Rocket, Briefcase, Mic, HardDrive, BarChart3, Radio, GraduationCap, ArrowRight, User, Bot, Cpu, Box } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/studio/fade-in'
import { AnimatedCounter } from '@/components/studio/animated-counter'
import { useLocale } from '@/lib/i18n'

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
  { href: '/infra', labelKey: 'nav.infra', icon: Server, color: '#00D4FF', descKey: 'landing.desc.infra' },
  { href: '/stack', labelKey: 'nav.stack', icon: Layers, color: '#8B5CF6', descKey: 'landing.desc.stack' },
  { href: '/brain', labelKey: 'nav.brain', icon: Brain, color: '#F472B6', descKey: 'landing.desc.brain' },
  { href: '/flows', labelKey: 'nav.flows', icon: Workflow, color: '#FBBF24', descKey: 'landing.desc.flows' },
  { href: '/monitoring', labelKey: 'nav.monitoring', icon: ShieldCheck, color: '#4ADE80', descKey: 'landing.desc.monitoring' },
  { href: '/security', labelKey: 'nav.security', icon: Lock, color: '#4ADE80', descKey: 'landing.desc.security' },
  { href: '/supervisor', labelKey: 'nav.supervisor', icon: ShieldAlert, color: '#FF6B6B', descKey: 'landing.desc.supervisor' },
  { href: '/warehouse', labelKey: 'nav.warehouse', icon: BookOpen, color: '#00D4FF', descKey: 'landing.desc.warehouse' },
  { href: '/team', labelKey: 'nav.team', icon: Users, color: '#8B5CF6', descKey: 'landing.desc.team' },
  { href: '/franchise', labelKey: 'nav.franchise', icon: Crown, color: '#FBBF24', descKey: 'landing.desc.franchise' },
  { href: '/timeline', labelKey: 'nav.timeline', icon: Clock, color: '#8B5CF6', descKey: 'landing.desc.timeline' },
  { href: '/roadmap', labelKey: 'nav.roadmap', icon: Rocket, color: '#00D4FF', descKey: 'landing.desc.roadmap' },
  { href: '/portfolio', labelKey: 'nav.portfolio', icon: Briefcase, color: '#F472B6', descKey: 'landing.desc.portfolio' },
  { href: '/voice', labelKey: 'nav.voice', icon: Mic, color: '#8B5CF6', descKey: 'landing.desc.voice' },
  { href: '/hardware', labelKey: 'nav.hardware', icon: HardDrive, color: '#00D4FF', descKey: 'landing.desc.hardware' },
  { href: '/charts', labelKey: 'nav.charts', icon: BarChart3, color: '#4ADE80', descKey: 'landing.desc.charts' },
  { href: '/remote', labelKey: 'nav.remote', icon: Radio, color: '#FF6B6B', descKey: 'landing.desc.remote' },
  { href: '/learn', labelKey: 'nav.learn', icon: GraduationCap, color: '#FBBF24', descKey: 'landing.desc.learn' },
]

export default function HomePage() {
  const { t } = useLocale()

  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Hero */}
      <div className="relative px-6 py-6 lg:py-8 text-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cyan-tint-light)] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--purple-glow)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--purple-tint)] border border-[var(--purple-border)] mb-3">
            <span className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
            <span className="text-sm text-neon-purple font-medium">{t('landing.badge')}</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-3 flex-wrap">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-cloud-white">
              MultiPass <span className="gradient-text">Studio</span>
            </h1>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--green-tint)] border border-success-green/30 text-success-green text-sm font-bold">
              <span className="text-lg font-heading">100/100</span> Production Ready
            </span>
          </div>
          <p className="text-base text-steel-gray max-w-3xl mx-auto mb-4">
            {t('landing.subtitle')}
          </p>
        </div>

        {/* Animated stats */}
        <div className="relative z-10 grid grid-cols-4 lg:grid-cols-8 gap-2 max-w-4xl mx-auto mb-4">
          {HERO_STATS.map(s => (
            <div key={s.label} className="glass-card p-2 text-center">
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                className="text-xl lg:text-2xl font-heading font-bold text-cloud-white"
              />
              <p className="text-[11px] lg:text-xs text-steel-gray mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="relative z-10 flex items-center justify-center gap-3 text-sm text-steel-gray">
          <span className="text-xl">👨‍💻</span>
          <span>Mike</span>
          <span className="text-[var(--dim-text)]">+</span>
          <span className="text-xl">🤖</span>
          <span>R2D2</span>
          <span className="text-[var(--dim-text)]">|</span>
          <span>Dell R740 / Proxmox 9 / Ubuntu 24.04</span>
        </div>

        {/* Team Manifesto */}
        <div className="relative z-10 max-w-3xl mx-auto mt-3">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--cyan-tint)] border border-electric-cyan/20 text-sm font-bold text-electric-cyan">
                <User className="w-3.5 h-3.5" /> 1 Human
              </span>
              <span className="text-[var(--dim-text)]">+</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--purple-tint-strong)] border border-[var(--purple-border)] text-sm font-bold text-neon-purple">
                <Bot className="w-3.5 h-3.5" /> 1 AI
              </span>
              <span className="text-[var(--dim-text)]">+</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--amber-tint)] border border-amber-warm/20 text-sm font-bold text-amber-warm">
                <Users className="w-3.5 h-3.5" /> 13 Agents
              </span>
              <span className="text-[var(--dim-text)]">+</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--coral-tint)] border border-coral-energy/20 text-sm font-bold text-coral-energy">
                <Cpu className="w-3.5 h-3.5" /> 28 Subagents
              </span>
              <span className="text-[var(--dim-text)]">+</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--green-tint)] border border-success-green/20 text-sm font-bold text-success-green">
                <Box className="w-3.5 h-3.5" /> 30 Containers
              </span>
            </div>
            <p className="text-center text-base text-steel-gray">
              <span className="text-lg font-heading font-semibold text-success-green">{t('manifesto.pre')}</span> <span className="text-xl font-heading font-bold text-electric-cyan">{t('manifesto.human')}</span>, <span className="text-lg font-heading font-semibold text-neon-purple">{t('manifesto.ai')}</span>, <span className="text-lg font-heading font-semibold text-amber-warm">{t('manifesto.agents')}</span>.
            </p>
          </div>
      </div>

      {/* Pages grid */}
      <div className="px-6 pb-8">
        <FadeIn delay={0.1}>
          <h2 className="text-lg font-heading font-semibold text-cloud-white mb-4">{t('landing.explore')}</h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" staggerDelay={0.06}>
          {PAGES.map(page => {
            const Icon = page.icon
            return (
              <StaggerItem key={page.href}>
                <Link
                  href={page.href}
                  className="glass-card p-4 flex items-start gap-3 transition-all hover:bg-[var(--subtle-bg-3)] hover:scale-[1.02] group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${page.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: page.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-heading font-semibold text-cloud-white">{t(page.labelKey)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel-gray opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-steel-gray leading-relaxed">{t(page.descKey)}</p>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>

      {/* Bottom tagline */}
      <FadeIn className="px-6 pb-6">
        <div className="glass-card p-5 text-center border border-[var(--purple-tint-strong)]">
          <p className="text-base font-heading text-cloud-white">
            1 Human + 1 AI + 13 Agents + 28 Subagents + 30 Containers
          </p>
          <p className="text-sm text-steel-gray mt-1">
            {t('landing.tagline')}
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
