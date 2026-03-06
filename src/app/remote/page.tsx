'use client'

import { useState } from 'react'
import { Terminal, Globe, Bell, Server, Bot, Mic, Radio, Play, Clock, ChevronRight, Copy, Zap } from 'lucide-react'
import {
  REMOTE_CHANNELS, REMOTE_COMMANDS, REMOTE_WORKFLOWS, COMMAND_CATEGORIES,
  type RemoteChannel, type RemoteCommand, type RemoteWorkflow,
} from '@/lib/remote-data'
import { useLocale } from '@/lib/i18n'

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal, Globe, Bell, Server, Bot, Mic,
}

const TAB_KEYS = ['channels', 'commands', 'workflows'] as const
type Tab = typeof TAB_KEYS[number]

function ChannelCard({ channel, t }: { channel: RemoteChannel; t: (k: string) => string }) {
  const Icon = ICON_MAP[channel.icon] || Radio
  return (
    <div className="glass-card p-5 hover:bg-[var(--subtle-bg-3)] transition-all">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--cyan-tint)] flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-electric-cyan" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-heading font-semibold text-cloud-white">{t(channel.titleKey)}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--purple-tint)] text-neon-purple font-medium">
              {channel.protocol}
            </span>
          </div>
          <p className="text-sm text-steel-gray mb-3">{t(channel.descKey)}</p>
          <div className="flex flex-wrap gap-1.5">
            {channel.targets.map(target => (
              <span key={target} className="text-xs px-2 py-1 rounded-md bg-[var(--subtle-bg-2)] text-steel-gray border border-[var(--subtle-border)]">
                {target}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CommandCard({ cmd, t }: { cmd: RemoteCommand; t: (k: string) => string }) {
  const cat = COMMAND_CATEGORIES[cmd.category]
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd.command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card p-4 hover:bg-[var(--subtle-bg-3)] transition-all">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-bold uppercase ${cat?.color ?? 'text-steel-gray'}`}>
          {t(cat?.labelKey ?? cmd.category)}
        </span>
        <span className="text-xs text-steel-gray">-</span>
        <span className="text-sm font-heading font-semibold text-cloud-white">{t(cmd.titleKey)}</span>
        <span className="ml-auto text-xs text-steel-gray">{cmd.target}</span>
      </div>
      <p className="text-sm text-steel-gray mb-2">{t(cmd.descKey)}</p>
      <div className="flex items-center gap-2">
        <code className="flex-1 text-xs bg-[var(--deep-ocean)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-electric-cyan font-mono overflow-x-auto">
          {cmd.command}
        </code>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-[var(--subtle-bg-2)] text-steel-gray hover:text-cloud-white transition-colors shrink-0"
          title="Copy"
        >
          {copied ? <Zap className="w-4 h-4 text-success-green" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

function WorkflowCard({ wf, index, t }: { wf: RemoteWorkflow; index: number; t: (k: string) => string }) {
  return (
    <div className="glass-card p-5 hover:bg-[var(--subtle-bg-3)] transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-electric-cyan flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-white">{index + 1}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-heading font-semibold text-cloud-white">{t(wf.titleKey)}</h3>
          <p className="text-sm text-steel-gray">{t(wf.descKey)}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-amber-warm">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{wf.duration}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2 mb-4">
        {wf.stepsKeys.map((stepKey, i) => (
          <div key={stepKey} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[var(--subtle-bg-2)] flex items-center justify-center shrink-0 border border-[var(--subtle-border)]">
              <span className="text-xs font-bold text-steel-gray">{i + 1}</span>
            </div>
            <ChevronRight className="w-3 h-3 text-steel-gray shrink-0" />
            <span className="text-sm text-cloud-white">{t(stepKey)}</span>
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--green-tint)] border border-success-green/20">
        <Play className="w-4 h-4 text-success-green shrink-0" />
        <span className="text-sm font-medium text-success-green">{t(wf.resultKey)}</span>
      </div>
    </div>
  )
}

export default function RemotePage() {
  const { t } = useLocale()
  const [activeTab, setActiveTab] = useState<Tab>('channels')
  const [filterCat, setFilterCat] = useState<string | null>(null)

  const filteredCommands = filterCat
    ? REMOTE_COMMANDS.filter(c => c.category === filterCat)
    : REMOTE_COMMANDS

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">{t('remote.title')}</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--green-tint)] text-success-green">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-success-green mr-1 animate-pulse" />
            Online
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{REMOTE_CHANNELS.length} {t('remote.tab.channels').toLowerCase()}</span>
          <span>{REMOTE_COMMANDS.length} {t('remote.tab.commands').toLowerCase()}</span>
          <span>{REMOTE_WORKFLOWS.length} {t('remote.tab.workflows').toLowerCase()}</span>
        </div>
      </header>

      {/* Hero */}
      <div className="px-4 py-6 text-center border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-cyan to-neon-purple flex items-center justify-center">
            <Radio className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-sm text-steel-gray max-w-2xl mx-auto mb-4">{t('remote.hero.subtitle')}</p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--cyan-tint)] border border-electric-cyan/20 text-sm font-bold text-electric-cyan">
            <Terminal className="w-3.5 h-3.5" /> {t('remote.hero.pill.ssh')}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--purple-tint)] border border-[var(--purple-border)] text-sm font-bold text-neon-purple">
            <Globe className="w-3.5 h-3.5" /> {t('remote.hero.pill.tunnel')}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--green-tint)] border border-success-green/20 text-sm font-bold text-success-green">
            <Bot className="w-3.5 h-3.5" /> {t('remote.hero.pill.agents')}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--subtle-bg-2)]">
        {TAB_KEYS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-[var(--cyan-tint)] text-electric-cyan'
                : 'text-steel-gray hover:text-cloud-white hover:bg-[var(--subtle-bg-2)]'
            }`}
          >
            {t(`remote.tab.${tab}`)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Channels Grid */}
        {activeTab === 'channels' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {REMOTE_CHANNELS.map(ch => (
              <ChannelCard key={ch.id} channel={ch} t={t} />
            ))}
          </div>
        )}

        {/* Commands List */}
        {activeTab === 'commands' && (
          <div>
            {/* Category filter */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setFilterCat(null)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  !filterCat ? 'bg-[var(--cyan-tint)] text-electric-cyan' : 'text-steel-gray hover:text-cloud-white'
                }`}
              >
                Tous
              </button>
              {Object.entries(COMMAND_CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setFilterCat(key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filterCat === key ? 'bg-[var(--cyan-tint)] text-electric-cyan' : `${cat.color} hover:opacity-80`
                  }`}
                >
                  {t(cat.labelKey)}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {filteredCommands.map(cmd => (
                <CommandCard key={cmd.id} cmd={cmd} t={t} />
              ))}
            </div>
          </div>
        )}

        {/* Workflows */}
        {activeTab === 'workflows' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {REMOTE_WORKFLOWS.map((wf, i) => (
              <WorkflowCard key={wf.id} wf={wf} index={i} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
