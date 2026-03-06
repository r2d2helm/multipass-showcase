'use client'

import { useState } from 'react'
import { Shield, Radio, Layers, AlertTriangle, CheckCircle, XCircle, Eye, Wrench, Database, ChevronDown, ChevronUp, Usb, HardDrive } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import {
  EXTERNAL_PROBES, RECOVERY_LAYERS, RECONSTRUCTION_ASSETS, INCIDENT_SCENARIOS,
  CATEGORY_ICONS, SEVERITY_COLORS,
} from '@/lib/supervisor-data'

type Tab = 'probes' | 'recovery' | 'assets' | 'incidents'

export default function SupervisorPage() {
  const { t } = useLocale()
  const [tab, setTab] = useState<Tab>('probes')
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null)
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null)

  const tabs: { id: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'probes', label: 'External Probes', icon: Radio, count: EXTERNAL_PROBES.length },
    { id: 'recovery', label: 'Recovery Layers', icon: Layers, count: RECOVERY_LAYERS.length },
    { id: 'assets', label: 'Reconstruction Map', icon: Database, count: RECONSTRUCTION_ASSETS.length },
    { id: 'incidents', label: 'Incident Playbooks', icon: AlertTriangle, count: INCIDENT_SCENARIOS.length },
  ]

  const probesBySource = [...new Set(EXTERNAL_PROBES.map(p => p.source))]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">MegaSupervisor</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--coral-tint)] text-coral-energy">
            AdminSystem v2.5.0
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{EXTERNAL_PROBES.length} probes</span>
          <span>{RECOVERY_LAYERS.length} recovery layers</span>
          <span>{INCIDENT_SCENARIOS.length} playbooks</span>
        </div>
      </header>

      {/* USB Backup Highlight */}
      <div className="mx-4 mt-3 p-4 rounded-xl border-2 border-[var(--purple-ring)] bg-gradient-to-r from-[var(--purple-tint)] via-[var(--cyan-tint-light)] to-[var(--purple-tint)]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-electric-cyan flex items-center justify-center shrink-0">
            <Usb className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-lg font-heading font-bold gradient-text mb-1">{t('supervisor.usb.title')}</h3>
            <p className="text-sm text-steel-gray">
              {t('supervisor.usb.desc')} <span className="text-xl font-bold text-electric-cyan">128 Go</span>.
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-lg bg-[var(--subtle-bg-2)] border border-[var(--glass-border)]">
            <p className="text-xs text-steel-gray uppercase tracking-wider">{t('supervisor.usb.cost')}</p>
            <p className="text-3xl font-heading font-bold gradient-text">30€</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 px-4 pt-3 overflow-x-auto">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all shrink-0 ${
                tab === t.id
                  ? 'bg-[var(--coral-tint)] text-coral-energy'
                  : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
              <span className="text-sm px-1 py-0.5 rounded bg-[var(--subtle-bg-3)]">{t.count}</span>
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* ===== PROBES TAB ===== */}
        {tab === 'probes' && (
          <>
            {/* Architecture overview */}
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-coral-energy" />
                <h3 className="text-base font-heading font-semibold text-cloud-white">Monitoring Architecture</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[var(--amber-tint)] border border-[var(--amber-tint)]">
                  <p className="text-base font-medium text-amber-warm mb-1">Uptime Kuma</p>
                  <p className="text-sm text-steel-gray">r2d2-stage (.162) — monitore tous les endpoints publics depuis une VM separee</p>
                  <p className="text-sm text-steel-gray mt-1">22 monitors, alertes ntfy, octopus.watch</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--coral-tint)] border border-[var(--coral-tint)]">
                  <p className="text-base font-medium text-coral-energy mb-1">Watchdog Externe</p>
                  <p className="text-sm text-steel-gray">r2d2-monitor (.101) — sentinelle isolee, survie independante de main</p>
                  <p className="text-sm text-steel-gray mt-1">ICMP + SSH + API Proxmox recovery</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--cyan-tint-light)] border border-[var(--cyan-tint)]">
                  <p className="text-base font-medium text-electric-cyan mb-1">Cron Monitor</p>
                  <p className="text-sm text-steel-gray">r2d2-main — 44 checks toutes les 5 min, seuils gradues, anti-flapping</p>
                  <p className="text-sm text-steel-gray mt-1">Disk 70%/85%, backup freshness 26h</p>
                </div>
              </div>
            </div>

            {/* Probes by source */}
            {probesBySource.map(source => {
              const probes = EXTERNAL_PROBES.filter(p => p.source === source)
              return (
                <div key={source} className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="w-4 h-4 text-electric-cyan" />
                    <h3 className="text-base font-heading font-semibold text-cloud-white">{source}</h3>
                    <span className="text-sm text-steel-gray ml-auto">{probes.length} probes</span>
                  </div>
                  <div className="space-y-1.5">
                    {probes.map(probe => (
                      <div key={probe.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[var(--subtle-bg)]">
                        <div className="w-2 h-2 rounded-full bg-success-green shrink-0" />
                        <span className="text-sm text-cloud-white w-40 shrink-0 truncate">{probe.name}</span>
                        <span className="text-sm text-steel-gray w-48 shrink-0 truncate">{probe.target}</span>
                        <span className="text-sm px-1.5 py-0.5 rounded bg-[var(--cyan-tint)] text-electric-cyan shrink-0">{probe.method}</span>
                        <span className="text-sm text-steel-gray ml-auto shrink-0">{probe.interval}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}

        {/* ===== RECOVERY LAYERS TAB ===== */}
        {tab === 'recovery' && (
          <>
            <div className="glass-card p-4 mb-2">
              <p className="text-sm text-steel-gray">
                5 niveaux de recovery — du container individuel a la reconstruction totale de l&apos;ecosysteme. Chaque couche a un RTO (Recovery Time Objective) et peut etre automatisee ou manuelle.
              </p>
            </div>

            {RECOVERY_LAYERS.map((layer, i) => (
              <button
                key={layer.id}
                onClick={() => setExpandedLayer(prev => prev === layer.id ? null : layer.id)}
                className="w-full text-left glass-card p-4 transition-all hover:bg-[var(--subtle-bg-3)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--coral-tint)] flex items-center justify-center text-coral-energy text-base font-bold shrink-0">
                    L{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-heading font-semibold text-cloud-white">{layer.name}</span>
                      <span className={`text-sm px-1.5 py-0.5 rounded ${layer.automated ? 'bg-[var(--green-tint)] text-success-green' : 'bg-[var(--amber-tint)] text-amber-warm'}`}>
                        {layer.automated ? 'Auto' : 'Manuel'}
                      </span>
                      <span className="text-sm px-1.5 py-0.5 rounded bg-[var(--cyan-tint)] text-electric-cyan ml-auto">
                        RTO {layer.rto}
                      </span>
                      {expandedLayer === layer.id ? <ChevronUp className="w-4 h-4 text-steel-gray" /> : <ChevronDown className="w-4 h-4 text-steel-gray" />}
                    </div>
                    <p className="text-sm text-steel-gray">{layer.scope}</p>
                  </div>
                </div>

                {expandedLayer === layer.id && (
                  <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)] animate-in fade-in duration-200">
                    <p className="text-sm text-steel-gray mb-2">
                      <span className="text-electric-cyan">Trigger:</span> {layer.trigger}
                    </p>
                    <div className="space-y-1.5">
                      {layer.actions.map((action, j) => (
                        <div key={j} className="flex items-start gap-2 ml-2">
                          <span className="text-sm text-coral-energy font-mono shrink-0">{j + 1}.</span>
                          <span className="text-sm text-cloud-white">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </>
        )}

        {/* ===== RECONSTRUCTION ASSETS TAB ===== */}
        {tab === 'assets' && (
          <>
            <div className="glass-card p-4 mb-2">
              <p className="text-sm text-steel-gray">
                Carte de reconstruction complete — tous les composants necessaires pour rebuild l&apos;ecosysteme from scratch. Chaque asset a une source de backup et une methode de reconstruction.
              </p>
            </div>

            {(['config', 'data', 'service', 'infra', 'secret'] as const).map(cat => {
              const assets = RECONSTRUCTION_ASSETS.filter(a => a.category === cat)
              return (
                <div key={cat} className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">{CATEGORY_ICONS[cat]}</span>
                    <h3 className="text-base font-heading font-semibold text-cloud-white capitalize">{cat}</h3>
                    <span className="text-sm text-steel-gray ml-auto">{assets.length} assets</span>
                  </div>
                  <div className="space-y-2">
                    {assets.map(asset => (
                      <div key={asset.id} className="p-3 rounded-lg bg-[var(--subtle-bg)]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-cloud-white">{asset.name}</span>
                          <code className="text-sm text-steel-gray ml-auto font-mono truncate max-w-48">{asset.location}</code>
                        </div>
                        <div className="flex items-start gap-4 text-sm text-steel-gray">
                          <span><span className="text-electric-cyan">Backup:</span> {asset.backup}</span>
                        </div>
                        <div className="text-sm text-steel-gray mt-0.5">
                          <span className="text-amber-warm">Reconstruct:</span> {asset.reconstructMethod}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}

        {/* ===== INCIDENTS TAB ===== */}
        {tab === 'incidents' && (
          <>
            <div className="glass-card p-4 mb-2">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="text-2xl font-heading font-bold text-cloud-white">{INCIDENT_SCENARIOS.length}</span>
                  <p className="text-sm text-steel-gray">Playbooks</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-heading font-bold text-success-green">{INCIDENT_SCENARIOS.filter(i => i.tested).length}/{INCIDENT_SCENARIOS.length}</span>
                  <p className="text-sm text-steel-gray">Testes</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-heading font-bold text-coral-energy">{INCIDENT_SCENARIOS.filter(i => i.severity === 'critical').length}</span>
                  <p className="text-sm text-steel-gray">Critical</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-heading font-bold text-amber-warm">{INCIDENT_SCENARIOS.filter(i => i.severity === 'major').length}</span>
                  <p className="text-sm text-steel-gray">Major</p>
                </div>
              </div>
            </div>

            {INCIDENT_SCENARIOS.map(incident => (
              <button
                key={incident.id}
                onClick={() => setExpandedIncident(prev => prev === incident.id ? null : incident.id)}
                className="w-full text-left glass-card p-4 transition-all hover:bg-[var(--subtle-bg-3)]"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: SEVERITY_COLORS[incident.severity] }}
                  />
                  <span className="text-base font-medium text-cloud-white">{incident.name}</span>
                  <span
                    className="text-sm px-1.5 py-0.5 rounded uppercase"
                    style={{ backgroundColor: `${SEVERITY_COLORS[incident.severity]}18`, color: SEVERITY_COLORS[incident.severity] }}
                  >
                    {incident.severity}
                  </span>
                  <span className="text-sm px-1.5 py-0.5 rounded bg-[var(--cyan-tint)] text-electric-cyan">
                    RTO {incident.rto}
                  </span>
                  {incident.tested && (
                    <CheckCircle className="w-4 h-4 text-success-green ml-auto shrink-0" />
                  )}
                  {expandedIncident === incident.id ? <ChevronUp className="w-4 h-4 text-steel-gray" /> : <ChevronDown className="w-4 h-4 text-steel-gray" />}
                </div>
                <p className="text-sm text-steel-gray ml-5">{incident.description}</p>

                {expandedIncident === incident.id && (
                  <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)] ml-5 space-y-2 animate-in fade-in duration-200">
                    <p className="text-sm text-steel-gray">
                      <span className="text-electric-cyan">Detection:</span> {incident.detection}
                    </p>
                    <div>
                      <span className="text-sm text-amber-warm">Recovery steps:</span>
                      <div className="space-y-1 mt-1">
                        {incident.recovery.map((step, j) => (
                          <div key={j} className="flex items-start gap-2 ml-2">
                            <span className="text-sm text-coral-energy font-mono shrink-0">{j + 1}.</span>
                            <span className="text-sm text-cloud-white">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
