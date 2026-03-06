'use client'

import { useState } from 'react'
import { Mic, MessageCircle, Bot, Bell, Globe, Hand, Workflow, Play, Volume2, Headphones } from 'lucide-react'
import {
  VOICE_FEATURES, VOICE_COMMANDS, VOICE_USE_CASES, VOICE_STATS, COMMAND_CATEGORIES,
} from '@/lib/voice-data'
import { useLocale } from '@/lib/i18n'

type Tab = 'features' | 'commands' | 'usecases'

const FEATURE_ICONS: Record<string, React.ElementType> = {
  MessageCircle, Bot, Bell, Globe, Hand, Workflow,
}

export default function VoicePage() {
  const [tab, setTab] = useState<Tab>('features')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { t } = useLocale()

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'features', label: t('voice.tab.features'), icon: Volume2 },
    { id: 'commands', label: t('voice.tab.commands'), icon: Mic },
    { id: 'usecases', label: t('voice.tab.usecases'), icon: Play },
  ]

  const filteredCommands = selectedCategory
    ? VOICE_COMMANDS.filter(c => c.category === selectedCategory)
    : VOICE_COMMANDS

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">Voice</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--purple-tint)] text-neon-purple">
            ElevenLabs + MCP
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{VOICE_FEATURES.length} {t('voice.tab.features').toLowerCase()}</span>
          <span>{VOICE_COMMANDS.length} {t('voice.tab.commands').toLowerCase()}</span>
          <span>{VOICE_USE_CASES.length} {t('voice.tab.usecases').toLowerCase()}</span>
        </div>
      </header>

      {/* Hero banner */}
      <div className="mx-4 mt-3 p-5 rounded-xl border-2 border-[var(--purple-ring)] bg-gradient-to-r from-[var(--purple-tint)] via-[var(--cyan-tint-light)] to-[var(--purple-tint)]">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-electric-cyan flex items-center justify-center shrink-0">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-xl font-heading font-bold gradient-text mb-1">{t('voice.hero.title')}</h3>
            <p className="text-sm text-steel-gray mb-3">{t('voice.hero.subtitle')}</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--purple-tint-strong)] border border-[var(--purple-border)] text-sm font-medium text-neon-purple">
                <Bot className="w-3.5 h-3.5" />
                {t('voice.hero.pill1')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--cyan-tint)] border border-electric-cyan/20 text-sm font-medium text-electric-cyan">
                <Workflow className="w-3.5 h-3.5" />
                {t('voice.hero.pill2')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--coral-tint)] border border-coral-energy/20 text-sm font-medium text-coral-energy">
                <Bell className="w-3.5 h-3.5" />
                {t('voice.hero.pill3')}
              </span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4 pt-4 border-t border-[var(--glass-border)]">
          {VOICE_STATS.map(stat => (
            <div key={stat.labelKey} className="text-center">
              <p className="text-lg font-heading font-bold text-electric-cyan">{stat.value}</p>
              <p className="text-xs text-steel-gray">{t(stat.labelKey)}</p>
            </div>
          ))}
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
                  ? 'bg-[var(--purple-tint-strong)] text-neon-purple'
                  : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tb.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* ===== FEATURES TAB ===== */}
        {tab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VOICE_FEATURES.map(feat => {
              const Icon = FEATURE_ICONS[feat.icon] || MessageCircle
              return (
                <div key={feat.id} className="glass-card p-5 transition-all hover:bg-[var(--subtle-bg-3)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-electric-cyan flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-heading font-semibold text-cloud-white">{t(feat.titleKey)}</h3>
                      {feat.highlight && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--cyan-tint)] text-electric-cyan">{feat.highlight}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-steel-gray leading-relaxed">{t(feat.descKey)}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* ===== COMMANDS TAB ===== */}
        {tab === 'commands' && (
          <>
            {/* Category filters */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  selectedCategory === null
                    ? 'bg-[var(--purple-tint-strong)] text-neon-purple'
                    : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
                }`}
              >
                {t('common.all')} ({VOICE_COMMANDS.length})
              </button>
              {Object.entries(COMMAND_CATEGORIES).map(([key, cat]) => {
                const count = VOICE_COMMANDS.filter(c => c.category === key).length
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCategory === key
                        ? 'bg-[var(--purple-tint-strong)] text-neon-purple'
                        : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
                    }`}
                  >
                    {t(cat.labelKey)} ({count})
                  </button>
                )
              })}
            </div>

            {/* Command list */}
            <div className="glass-card p-4">
              <div className="space-y-2">
                {filteredCommands.map(cmd => {
                  const cat = COMMAND_CATEGORIES[cmd.category]
                  return (
                    <div key={cmd.id} className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-[var(--subtle-bg)] hover:bg-[var(--subtle-bg-3)] transition-all">
                      <Mic className={`w-4 h-4 shrink-0 ${cat.color}`} />
                      <code className="text-sm font-mono text-electric-cyan bg-[var(--subtle-bg-2)] px-2 py-0.5 rounded shrink-0">
                        &quot;{cmd.command}&quot;
                      </code>
                      <span className="text-sm text-steel-gray flex-1">{t(cmd.descKey)}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded bg-[var(--subtle-bg-2)] ${cat.color} shrink-0`}>
                        {t(cat.labelKey)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* ===== USE CASES TAB ===== */}
        {tab === 'usecases' && (
          <div className="space-y-4">
            {VOICE_USE_CASES.map((uc, idx) => (
              <div key={uc.id} className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--purple-tint-strong)] flex items-center justify-center text-neon-purple text-base font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-semibold text-cloud-white">{t(uc.titleKey)}</h3>
                    <p className="text-sm text-steel-gray">{t(uc.descKey)}</p>
                  </div>
                </div>

                <div className="space-y-2 ml-2">
                  {uc.stepsKeys.map((stepKey, j) => (
                    <div key={j} className="flex items-start gap-3 py-2 px-3 rounded-lg bg-[var(--subtle-bg)]">
                      <span className="text-sm text-neon-purple font-mono shrink-0">{j + 1}.</span>
                      <span className="text-sm text-cloud-white">{t(stepKey)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)]">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--green-tint)]">
                    <Play className="w-4 h-4 text-success-green shrink-0" />
                    <span className="text-sm font-medium text-success-green">{t('voice.result')}:</span>
                    <span className="text-sm text-cloud-white">{t(uc.resultKey)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
