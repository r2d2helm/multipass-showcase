'use client'

import { useState } from 'react'
import {
  HardDrive, Server, Layers, Box, Brain, ShieldCheck, Lock, Mic,
  Monitor, Cpu, Clock, Wrench, Zap, CheckCircle, Star, Award,
} from 'lucide-react'
import {
  HARDWARE_PARTNERS, HARDWARE_CONFIGS, INCLUDED_ITEMS, CERT_LEVEL_CONFIG,
  TURNKEY_ADVANTAGES,
} from '@/lib/hardware-data'
import { useLocale } from '@/lib/i18n'

type Tab = 'partners' | 'configs' | 'included'

const ICON_MAP: Record<string, React.ElementType> = {
  Server, Layers, Box, Brain, ShieldCheck, Lock, Mic, HardDrive,
  Clock, Wrench, Zap, Monitor,
}

export default function HardwarePage() {
  const [tab, setTab] = useState<Tab>('partners')
  const { t } = useLocale()

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'partners', label: t('hw.tab.partners'), icon: Award, count: HARDWARE_PARTNERS.length },
    { id: 'configs', label: t('hw.tab.configs'), icon: Cpu, count: HARDWARE_CONFIGS.length },
    { id: 'included', label: t('hw.tab.included'), icon: CheckCircle, count: INCLUDED_ITEMS.length },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">Hardware Partners</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--cyan-tint)] text-electric-cyan">
            Turnkey Appliance
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{HARDWARE_PARTNERS.length} {t('hw.tab.partners').toLowerCase()}</span>
          <span>{HARDWARE_CONFIGS.length} {t('hw.tab.configs').toLowerCase()}</span>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-4 mt-3 p-5 rounded-xl border-2 border-[var(--purple-ring)] bg-gradient-to-r from-[var(--cyan-tint-light)] via-[var(--purple-tint)] to-[var(--cyan-tint-light)]">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-cyan to-neon-purple flex items-center justify-center shrink-0">
            <HardDrive className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-xl font-heading font-bold gradient-text mb-1">{t('hw.hero.title')}</h3>
            <p className="text-sm text-steel-gray mb-3">{t('hw.hero.subtitle')}</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--green-tint)] border border-success-green/20 text-sm font-medium text-success-green">
                <CheckCircle className="w-3.5 h-3.5" />
                {t('hw.hero.pill1')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--purple-tint-strong)] border border-[var(--purple-border)] text-sm font-medium text-neon-purple">
                <Box className="w-3.5 h-3.5" />
                {t('hw.hero.pill2')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--cyan-tint)] border border-electric-cyan/20 text-sm font-medium text-electric-cyan">
                <Wrench className="w-3.5 h-3.5" />
                {t('hw.hero.pill3')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 px-4 pt-3 overflow-x-auto">
        {tabs.map(tb => {
          const Icon = tb.icon
          return (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all shrink-0 ${
                tab === tb.id
                  ? 'bg-[var(--cyan-tint)] text-electric-cyan'
                  : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tb.label}</span>
              {tb.count != null && (
                <span className="text-sm px-1 py-0.5 rounded bg-[var(--subtle-bg-3)]">{tb.count}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* ===== PARTNERS TAB ===== */}
        {tab === 'partners' && (
          <div className="space-y-3">
            {HARDWARE_PARTNERS.map(partner => {
              const cert = CERT_LEVEL_CONFIG[partner.certLevel]
              return (
                <div key={partner.id} className="glass-card p-5 transition-all hover:bg-[var(--subtle-bg-3)]">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${cert.bgClass} flex items-center justify-center shrink-0`}>
                      <span className={`text-base font-heading font-bold ${cert.colorClass}`}>{partner.logo}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-heading font-semibold text-cloud-white">{partner.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${cert.bgClass} ${cert.colorClass} font-medium`}>
                          {t(cert.labelKey)}
                        </span>
                        {partner.highlight && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--green-tint)] text-success-green font-medium">
                            {t('hw.our.config')}: {partner.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-steel-gray mb-2">{t(partner.descKey)}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-xs text-steel-gray">{t('hw.models')}:</span>
                        {partner.models.map(model => (
                          <span key={model} className="text-xs px-2 py-0.5 rounded bg-[var(--subtle-bg-2)] text-cloud-white">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ===== CONFIGS TAB ===== */}
        {tab === 'configs' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {HARDWARE_CONFIGS.map(config => (
                <div
                  key={config.id}
                  className={`glass-card p-5 relative ${
                    config.recommended ? 'ring-2 ring-electric-cyan' : ''
                  }`}
                >
                  {config.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-electric-cyan text-white text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" /> {t('hw.recommended')}
                    </div>
                  )}
                  <h3 className="text-base font-heading font-bold text-cloud-white mb-1 mt-1">{t(config.nameKey)}</h3>
                  <p className="text-sm text-steel-gray mb-3">{t(config.descKey)}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded bg-[var(--subtle-bg)]">
                      <Cpu className="w-3.5 h-3.5 text-electric-cyan shrink-0" />
                      <span className="text-sm text-cloud-white">{config.specs.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded bg-[var(--subtle-bg)]">
                      <Layers className="w-3.5 h-3.5 text-neon-purple shrink-0" />
                      <span className="text-sm text-cloud-white">{config.specs.ram}</span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded bg-[var(--subtle-bg)]">
                      <HardDrive className="w-3.5 h-3.5 text-amber-warm shrink-0" />
                      <span className="text-sm text-cloud-white">{config.specs.storage}</span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded bg-[var(--subtle-bg)]">
                      <Monitor className="w-3.5 h-3.5 text-success-green shrink-0" />
                      <span className="text-sm text-cloud-white">{config.specs.network}</span>
                    </div>
                  </div>

                  <div className="py-2 px-3 rounded-lg bg-[var(--subtle-bg-2)] mb-3">
                    <p className="text-xs text-steel-gray">{t('hw.capacity')}</p>
                    <p className="text-sm text-cloud-white">{t(config.capacityKey)}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--glass-border)] text-center">
                    <p className="text-xs text-steel-gray">{t('hw.price')}</p>
                    <p className="text-xl font-heading font-bold gradient-text">{config.priceRange} &euro;</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Turnkey advantages */}
            <div className="glass-card p-5">
              <h3 className="text-base font-heading font-semibold text-cloud-white mb-4">{t('hw.section.advantages')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TURNKEY_ADVANTAGES.map(adv => {
                  const Icon = ICON_MAP[adv.iconKey] || Zap
                  return (
                    <div key={adv.id} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--subtle-bg)]">
                      <div className="w-9 h-9 rounded-lg bg-[var(--cyan-tint)] flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-electric-cyan" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-cloud-white">{t(adv.titleKey)}</p>
                        <p className="text-sm text-steel-gray">{t(adv.descKey)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* ===== INCLUDED TAB ===== */}
        {tab === 'included' && (
          <>
            <div className="glass-card p-4 mb-2">
              <p className="text-sm text-steel-gray">{t('hw.section.whats.included')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INCLUDED_ITEMS.map(item => {
                const Icon = ICON_MAP[item.icon] || Box
                return (
                  <div key={item.id} className="glass-card p-4 transition-all hover:bg-[var(--subtle-bg-3)]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-cyan to-neon-purple flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-base font-heading font-semibold text-cloud-white">{t(item.titleKey)}</h4>
                    </div>
                    <p className="text-sm text-steel-gray">{t(item.descKey)}</p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
