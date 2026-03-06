'use client'

import { useState } from 'react'
import { Lock, Shield, Globe, Key, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Network, Eye } from 'lucide-react'
import {
  SECURITY_LAYERS, NETWORK_ZONES, HARDENING_CHECKS, THREAT_MODEL,
  SEVERITY_COLORS,
} from '@/lib/security-data'

type Tab = 'layers' | 'network' | 'hardening' | 'threats'

export default function SecurityPage() {
  const [tab, setTab] = useState<Tab>('layers')
  const [expandedLayer, setExpandedLayer] = useState<string | null>('perimeter')
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null)

  const totalControls = SECURITY_LAYERS.reduce((s, l) => s + l.controls.length, 0)
  const enforced = SECURITY_LAYERS.flatMap(l => l.controls).filter(c => c.status === 'enforced').length
  const passChecks = HARDENING_CHECKS.filter(c => c.status === 'pass').length

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'layers', label: 'Defense Layers', icon: Shield },
    { id: 'network', label: 'Network Zones', icon: Network },
    { id: 'hardening', label: 'Hardening Audit', icon: CheckCircle },
    { id: 'threats', label: 'Threat Model', icon: AlertTriangle },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">Security</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--green-tint)] text-success-green">
            {passChecks}/{HARDENING_CHECKS.length} checks pass
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{SECURITY_LAYERS.length} layers</span>
          <span>{totalControls} controls</span>
          <span>{enforced} enforced</span>
        </div>
      </header>

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
                  ? 'bg-[var(--green-tint)] text-success-green'
                  : 'text-steel-gray hover:bg-[var(--subtle-bg)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* ===== DEFENSE LAYERS ===== */}
        {tab === 'layers' && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-cloud-white">{SECURITY_LAYERS.length}</span>
                <p className="text-sm text-steel-gray">Defense Layers</p>
              </div>
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-cloud-white">{totalControls}</span>
                <p className="text-sm text-steel-gray">Security Controls</p>
              </div>
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-success-green">{enforced}</span>
                <p className="text-sm text-steel-gray">Enforced</p>
              </div>
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-electric-cyan">{totalControls - enforced}</span>
                <p className="text-sm text-steel-gray">Active</p>
              </div>
            </div>

            {SECURITY_LAYERS.map(layer => (
              <button
                key={layer.id}
                onClick={() => setExpandedLayer(prev => prev === layer.id ? null : layer.id)}
                className="w-full text-left glass-card p-4 transition-all hover:bg-[var(--subtle-bg-3)]"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl">{layer.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-heading font-semibold text-cloud-white">{layer.name}</span>
                      <span className="text-sm text-steel-gray ml-auto">{layer.controls.length} controls</span>
                      {expandedLayer === layer.id ? <ChevronUp className="w-4 h-4 text-steel-gray" /> : <ChevronDown className="w-4 h-4 text-steel-gray" />}
                    </div>
                    <p className="text-sm text-steel-gray">{layer.description}</p>
                  </div>
                </div>

                {expandedLayer === layer.id && (
                  <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)] space-y-2 animate-in fade-in duration-200">
                    {layer.controls.map(ctrl => (
                      <div key={ctrl.id} className="p-3 rounded-lg bg-[var(--subtle-bg)]">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${ctrl.status === 'enforced' ? 'text-success-green' : 'text-electric-cyan'}`} />
                          <span className="text-sm font-medium text-cloud-white">{ctrl.name}</span>
                          <span className={`text-sm px-1.5 py-0.5 rounded ${
                            ctrl.status === 'enforced' ? 'bg-[var(--green-tint)] text-success-green' : 'bg-[var(--cyan-tint)] text-electric-cyan'
                          }`}>
                            {ctrl.status}
                          </span>
                          <span className="text-sm text-steel-gray ml-auto">{ctrl.scope}</span>
                        </div>
                        <p className="text-sm text-steel-gray ml-6">{ctrl.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </>
        )}

        {/* ===== NETWORK ZONES ===== */}
        {tab === 'network' && (
          <>
            <div className="glass-card p-4 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-electric-cyan" />
                <h3 className="text-base font-heading font-semibold text-cloud-white">Zero Trust Network Architecture</h3>
              </div>
              <p className="text-sm text-steel-gray">
                Zero ports exposes sur Internet. Tout le trafic externe passe par Cloudflare Tunnel. Chaque zone a des regles UFW strictes — deny par defaut, allow explicite par port et source.
              </p>
            </div>

            {NETWORK_ZONES.map(zone => (
              <div key={zone.id} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Network className="w-4 h-4 text-electric-cyan" />
                  <h3 className="text-base font-heading font-semibold text-cloud-white">{zone.name}</h3>
                  <code className="text-sm text-steel-gray ml-auto font-mono">{zone.vlan}</code>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-steel-gray mb-1">Hosts:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.hosts.map(h => (
                      <span key={h} className="text-sm px-2 py-0.5 rounded-md bg-[var(--cyan-tint)] text-electric-cyan">{h}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-sm text-success-green mb-1.5">Ingress (entrant)</p>
                    {zone.ingress.map((r, i) => (
                      <p key={i} className="text-sm text-steel-gray flex items-start gap-1.5">
                        <span className="text-success-green shrink-0">→</span> {r}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-amber-warm mb-1.5">Egress (sortant)</p>
                    {zone.egress.map((r, i) => (
                      <p key={i} className="text-sm text-steel-gray flex items-start gap-1.5">
                        <span className="text-amber-warm shrink-0">←</span> {r}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-coral-energy mb-1.5">Firewall</p>
                    <p className="text-sm text-steel-gray">{zone.firewall}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ===== HARDENING AUDIT ===== */}
        {tab === 'hardening' && (
          <>
            {/* Score */}
            <div className="glass-card p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <span className="text-3xl font-heading font-bold text-success-green">{passChecks}</span>
                  <span className="text-lg text-steel-gray">/{HARDENING_CHECKS.length}</span>
                  <p className="text-sm text-steel-gray">Checks Pass</p>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-[var(--subtle-bg-2)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success-green rounded-full transition-all"
                      style={{ width: `${(passChecks / HARDENING_CHECKS.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-steel-gray mt-1">
                    {Math.round((passChecks / HARDENING_CHECKS.length) * 100)}% compliance
                  </p>
                </div>
              </div>
            </div>

            {/* Checks grouped by category */}
            {[...new Set(HARDENING_CHECKS.map(c => c.category))].map(cat => {
              const checks = HARDENING_CHECKS.filter(c => c.category === cat)
              const catPass = checks.filter(c => c.status === 'pass').length
              return (
                <div key={cat} className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4 text-success-green" />
                    <h3 className="text-base font-heading font-semibold text-cloud-white">{cat}</h3>
                    <span className="text-sm text-success-green ml-auto">{catPass}/{checks.length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {checks.map(check => (
                      <div key={check.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[var(--subtle-bg)]">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${
                          check.status === 'pass' ? 'text-success-green' : check.status === 'warn' ? 'text-amber-warm' : 'text-coral-energy'
                        }`} />
                        <span className="text-sm text-cloud-white w-48 shrink-0">{check.check}</span>
                        <span className="text-sm text-steel-gray w-24 shrink-0">{check.vm}</span>
                        <span className="text-sm text-steel-gray truncate">{check.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}

        {/* ===== THREAT MODEL ===== */}
        {tab === 'threats' && (
          <>
            <div className="glass-card p-4 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-warm" />
                <h3 className="text-base font-heading font-semibold text-cloud-white">Threat Model — {THREAT_MODEL.length} menaces identifiees</h3>
              </div>
              <div className="flex gap-4 text-sm">
                {(['critical', 'high', 'medium'] as const).map(sev => {
                  const count = THREAT_MODEL.filter(t => t.severity === sev).length
                  return (
                    <div key={sev} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SEVERITY_COLORS[sev] }} />
                      <span className="text-steel-gray capitalize">{sev}</span>
                      <span className="font-medium" style={{ color: SEVERITY_COLORS[sev] }}>{count}</span>
                    </div>
                  )
                })}
                <span className="text-success-green ml-auto">
                  {THREAT_MODEL.length}/{THREAT_MODEL.length} mitigated
                </span>
              </div>
            </div>

            {THREAT_MODEL.map(threat => (
              <button
                key={threat.id}
                onClick={() => setExpandedThreat(prev => prev === threat.id ? null : threat.id)}
                className="w-full text-left glass-card p-4 transition-all hover:bg-[var(--subtle-bg-3)]"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: SEVERITY_COLORS[threat.severity] }}
                  />
                  <span className="text-base font-medium text-cloud-white">{threat.threat}</span>
                  <span
                    className="text-sm px-1.5 py-0.5 rounded uppercase"
                    style={{ backgroundColor: `${SEVERITY_COLORS[threat.severity]}18`, color: SEVERITY_COLORS[threat.severity] }}
                  >
                    {threat.severity}
                  </span>
                  <span className="text-sm text-success-green ml-auto">{threat.coverage}</span>
                  {expandedThreat === threat.id ? <ChevronUp className="w-4 h-4 text-steel-gray" /> : <ChevronDown className="w-4 h-4 text-steel-gray" />}
                </div>
                <p className="text-sm text-steel-gray ml-5">Vecteur: {threat.vector}</p>

                {expandedThreat === threat.id && (
                  <div className="mt-3 pt-3 border-t border-[var(--subtle-bg-3)] ml-5 space-y-1.5 animate-in fade-in duration-200">
                    <p className="text-sm text-electric-cyan mb-1">Mitigations:</p>
                    {threat.mitigation.map((m, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Shield className="w-3.5 h-3.5 text-success-green mt-0.5 shrink-0" />
                        <span className="text-sm text-cloud-white">{m}</span>
                      </div>
                    ))}
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
