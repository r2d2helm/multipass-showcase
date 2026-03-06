'use client'

import { useState } from 'react'
import { Crown, Zap, Rocket, CheckCircle, ChevronDown, ChevronUp, Shield, Brain, Server, Settings, HelpCircle, Star } from 'lucide-react'
import {
  FRANCHISE_TIERS, FRANCHISE_FEATURES, FRANCHISE_STATS, FAQ_ITEMS, TIER_COLORS,
} from '@/lib/franchise-data'

type Tab = 'offers' | 'features' | 'faq'

export default function FranchisePage() {
  const [tab, setTab] = useState<Tab>('offers')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<string>('pro')

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'offers', label: 'Offres Franchise', icon: Crown },
    { id: 'features', label: 'Comparatif', icon: Star },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ]

  const categoryIcons: Record<string, React.ElementType> = {
    'Infrastructure': Server,
    'AI & Agents': Brain,
    'Knowledge': Zap,
    'Security': Shield,
    'Operations': Settings,
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">Pack Commercial Franchise</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[rgba(251,191,36,0.1)] text-amber-warm">
            Ecosystem MultiPass
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{FRANCHISE_STATS.ecosystemComponents} composants</span>
          <span>{FRANCHISE_STATS.agentsAvailable} agents</span>
          <span>{FRANCHISE_STATS.securityControls} controles securite</span>
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
                  ? 'bg-[rgba(251,191,36,0.15)] text-amber-warm'
                  : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* ===== OFFRES FRANCHISE ===== */}
        {tab === 'offers' && (
          <>
            {/* Hero */}
            <div className="glass-card p-6 text-center border border-[rgba(251,191,36,0.15)]">
              <h3 className="text-2xl font-heading font-bold gradient-text mb-2">
                Devenez Franchiseur MultiPass
              </h3>
              <p className="text-base text-steel-gray max-w-2xl mx-auto">
                Deployez votre propre ecosysteme IA complet — infrastructure, agents intelligents, knowledge base, securite enterprise. Une stack prouvee en production, prete a scale.
              </p>
              <div className="flex justify-center gap-6 mt-4">
                {[
                  { value: FRANCHISE_STATS.ecosystemComponents, label: 'Composants' },
                  { value: FRANCHISE_STATS.automatedTests, label: 'Tests auto' },
                  { value: FRANCHISE_STATS.uptimeTarget, label: 'Uptime cible' },
                  { value: FRANCHISE_STATS.recoveryTime, label: 'Recovery' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <span className="text-xl font-heading font-bold text-cloud-white">{s.value}</span>
                    <p className="text-sm text-steel-gray">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {FRANCHISE_TIERS.map(tier => {
                const isSelected = selectedTier === tier.id
                const isPro = tier.id === 'pro'
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`text-left glass-card p-5 transition-all hover:bg-[rgba(255,255,255,0.08)] ${
                      isPro ? 'ring-1 ring-[rgba(139,92,246,0.4)] relative' : ''
                    } ${isSelected ? 'bg-[rgba(255,255,255,0.06)]' : ''}`}
                  >
                    {isPro && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neon-purple text-white text-xs font-medium">
                        Recommande
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ backgroundColor: `${tier.color}15` }}
                      >
                        {tier.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-bold" style={{ color: tier.color }}>{tier.name}</h4>
                        <p className="text-sm text-steel-gray">{tier.tagline}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-3xl font-heading font-bold text-cloud-white">{tier.price}</span>
                      <span className="text-base text-steel-gray">{tier.period ? ` EUR${tier.period}` : ''}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 mb-4">
                      {tier.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tier.color }} />
                          <span className="text-sm text-cloud-white">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limits */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {tier.limits.map(l => (
                        <div key={l.label} className="text-center p-2 rounded-lg bg-[rgba(255,255,255,0.04)]">
                          <span className="text-sm font-heading font-bold" style={{ color: tier.color }}>{l.value}</span>
                          <p className="text-[11px] text-steel-gray">{l.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Includes (expanded) */}
                    {isSelected && (
                      <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] space-y-1.5 animate-in fade-in duration-200">
                        <p className="text-sm font-medium mb-2" style={{ color: tier.color }}>Inclus :</p>
                        {tier.includes.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-sm shrink-0" style={{ color: tier.color }}>+</span>
                            <span className="text-sm text-steel-gray">{inc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* CTA */}
            <div className="glass-card p-5 text-center border border-[rgba(251,191,36,0.15)]">
              <p className="text-lg font-heading font-semibold text-cloud-white mb-1">
                Pret a lancer votre franchise ?
              </p>
              <p className="text-sm text-steel-gray mb-3">
                Contactez-nous pour une demo personnalisee de l&apos;ecosysteme complet.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-electric-cyan to-neon-purple text-white font-medium text-base">
                <Rocket className="w-4 h-4" />
                contact@multipass.agency
              </div>
            </div>
          </>
        )}

        {/* ===== COMPARATIF FEATURES ===== */}
        {tab === 'features' && (
          <>
            <div className="glass-card p-4 mb-2">
              <p className="text-sm text-steel-gray">
                Comparatif complet des {FRANCHISE_FEATURES.length} fonctionnalites par tier. Chaque franchise inclut l&apos;ecosysteme de base et scale selon vos besoins.
              </p>
            </div>

            {[...new Set(FRANCHISE_FEATURES.map(f => f.category))].map(cat => {
              const features = FRANCHISE_FEATURES.filter(f => f.category === cat)
              const CatIcon = categoryIcons[cat] || Zap
              return (
                <div key={cat} className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CatIcon className="w-4 h-4 text-amber-warm" />
                    <h3 className="text-base font-heading font-semibold text-cloud-white">{cat}</h3>
                    <span className="text-sm text-steel-gray ml-auto">{features.length} features</span>
                  </div>

                  {/* Column headers */}
                  <div className="flex items-center gap-2 mb-2 pl-4">
                    <span className="flex-1" />
                    {['Starter', 'Pro', 'Enterprise'].map(t => (
                      <span
                        key={t}
                        className="w-20 text-center text-sm font-medium"
                        style={{ color: TIER_COLORS[t.toLowerCase()] }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1">
                    {features.map(feature => (
                      <div key={feature.id} className="flex items-center gap-2 py-2 px-3 rounded-lg bg-[rgba(255,255,255,0.04)]">
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-cloud-white">{feature.name}</span>
                          <p className="text-[11px] text-steel-gray truncate">{feature.description}</p>
                        </div>
                        {(['starter', 'pro', 'enterprise'] as const).map(t => (
                          <div key={t} className="w-20 flex justify-center shrink-0">
                            {feature.tiers.includes(t) ? (
                              <CheckCircle className="w-4 h-4" style={{ color: TIER_COLORS[t] }} />
                            ) : (
                              <span className="w-4 h-4 flex items-center justify-center text-[rgba(255,255,255,0.15)]">—</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}

        {/* ===== FAQ ===== */}
        {tab === 'faq' && (
          <>
            <div className="glass-card p-4 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-amber-warm" />
                <h3 className="text-base font-heading font-semibold text-cloud-white">Questions Frequentes</h3>
              </div>
              <p className="text-sm text-steel-gray">
                Tout ce que vous devez savoir avant de rejoindre le reseau de franchise MultiPass.
              </p>
            </div>

            {FAQ_ITEMS.map(faq => (
              <button
                key={faq.id}
                onClick={() => setExpandedFaq(prev => prev === faq.id ? null : faq.id)}
                className="w-full text-left glass-card p-4 transition-all hover:bg-[rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-amber-warm shrink-0" />
                  <span className="text-base font-medium text-cloud-white flex-1">{faq.question}</span>
                  {expandedFaq === faq.id
                    ? <ChevronUp className="w-4 h-4 text-steel-gray" />
                    : <ChevronDown className="w-4 h-4 text-steel-gray" />
                  }
                </div>
                {expandedFaq === faq.id && (
                  <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)] ml-7 animate-in fade-in duration-200">
                    <p className="text-sm text-steel-gray leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </button>
            ))}

            {/* Contact CTA */}
            <div className="glass-card p-5 text-center border border-[rgba(251,191,36,0.15)]">
              <p className="text-base font-heading font-semibold text-cloud-white mb-1">
                Une question non listee ?
              </p>
              <p className="text-sm text-steel-gray">
                contact@multipass.agency — reponse sous 24h
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
