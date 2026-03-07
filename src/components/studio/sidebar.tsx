'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Server,
  Layers,
  Brain,
  ShieldCheck,
  BookOpen,
  Workflow,
  ShieldAlert,
  Lock,
  Users,
  Crown,
  Clock,
  Rocket,
  Briefcase,
  Mic,
  HardDrive,
  BarChart3,
  Radio,
  GraduationCap,
  Network,
  Sun,
  Moon,
} from 'lucide-react'
import { useLocale, LOCALE_LABELS, LOCALE_FLAGS, type Locale } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

const NAV_ITEMS = [
  { href: '/infra', labelKey: 'nav.infra', icon: Server, descKey: 'nav.infra.desc' },
  { href: '/stack', labelKey: 'nav.stack', icon: Layers, descKey: 'nav.stack.desc' },
  { href: '/brain', labelKey: 'nav.brain', icon: Brain, descKey: 'nav.brain.desc' },
  { href: '/flows', labelKey: 'nav.flows', icon: Workflow, descKey: 'nav.flows.desc' },
  { href: '/monitoring', labelKey: 'nav.monitoring', icon: ShieldCheck, descKey: 'nav.monitoring.desc' },
  { href: '/security', labelKey: 'nav.security', icon: Lock, descKey: 'nav.security.desc' },
  { href: '/supervisor', labelKey: 'nav.supervisor', icon: ShieldAlert, descKey: 'nav.supervisor.desc' },
  { href: '/warehouse', labelKey: 'nav.warehouse', icon: BookOpen, descKey: 'nav.warehouse.desc' },
  { href: '/team', labelKey: 'nav.team', icon: Users, descKey: 'nav.team.desc' },
  { href: '/franchise', labelKey: 'nav.franchise', icon: Crown, descKey: 'nav.franchise.desc' },
  { href: '/timeline', labelKey: 'nav.timeline', icon: Clock, descKey: 'nav.timeline.desc' },
  { href: '/roadmap', labelKey: 'nav.roadmap', icon: Rocket, descKey: 'nav.roadmap.desc' },
  { href: '/portfolio', labelKey: 'nav.portfolio', icon: Briefcase, descKey: 'nav.portfolio.desc' },
  { href: '/voice', labelKey: 'nav.voice', icon: Mic, descKey: 'nav.voice.desc' },
  { href: '/hardware', labelKey: 'nav.hardware', icon: HardDrive, descKey: 'nav.hardware.desc' },
  { href: '/charts', labelKey: 'nav.charts', icon: BarChart3, descKey: 'nav.charts.desc' },
  { href: '/remote', labelKey: 'nav.remote', icon: Radio, descKey: 'nav.remote.desc' },
  { href: '/learn', labelKey: 'nav.learn', icon: GraduationCap, descKey: 'nav.learn.desc' },
  { href: '/ecosystem', labelKey: 'nav.ecosystem', icon: Network, descKey: 'nav.ecosystem.desc' },
]

const LOCALES: Locale[] = ['fr', 'en', 'nl']

export function Sidebar() {
  const pathname = usePathname()
  const { locale, setLocale, t } = useLocale()
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="flex flex-col w-16 lg:w-56 shrink-0 border-r" style={{ borderColor: 'var(--sidebar-border)', backgroundColor: 'var(--sidebar-bg)' }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-3 lg:px-4 py-4 border-b transition-colors" style={{ borderColor: 'var(--sidebar-border)' }}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-cyan to-neon-purple flex items-center justify-center shrink-0">
          <span className="text-base font-bold text-white">MP</span>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-lg font-heading font-bold gradient-text">MultiPass</h1>
          <p className="text-sm text-steel-gray">Studio</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-1 space-y-0.5 px-2 overflow-y-auto">
        {NAV_ITEMS.map(({ href, labelKey, icon: Icon, descKey }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-2 lg:px-3 py-1.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[var(--cyan-tint)] text-electric-cyan'
                  : 'text-steel-gray hover:text-cloud-white'
              }`}
              style={!isActive ? { } : {}}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-electric-cyan' : 'text-steel-gray group-hover:text-cloud-white'}`} />
              <div className="hidden lg:block min-w-0">
                <span className="text-sm font-medium leading-tight">{t(labelKey)}</span>
                <p className={`text-xs leading-tight truncate ${isActive ? 'text-electric-cyan/60' : 'text-steel-gray'}`}>{t(descKey)}</p>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 lg:px-4 py-3 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
        {/* Theme toggle + Language switcher */}
        <div className="flex items-center justify-center lg:justify-between gap-1 mb-2">
          <div className="flex gap-1">
            {LOCALES.map(l => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2 py-1 rounded text-sm transition-all ${
                  locale === l
                    ? 'bg-[var(--purple-border)] text-neon-purple font-medium'
                    : 'text-steel-gray hover:text-cloud-white'
                }`}
                title={LOCALE_LABELS[l]}
              >
                <span className="lg:hidden">{LOCALE_FLAGS[l]}</span>
                <span className="hidden lg:inline">{LOCALE_FLAGS[l]} {LOCALE_LABELS[l]}</span>
              </button>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-steel-gray hover:text-cloud-white transition-colors"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <div className="hidden lg:block">
          <p className="text-sm text-steel-gray">v2.5.0 — AdminSystem</p>
          <p className="text-sm text-steel-gray">Dell R740 / Proxmox 9</p>
        </div>
      </div>
    </aside>
  )
}
