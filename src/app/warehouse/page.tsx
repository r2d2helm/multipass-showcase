'use client'

import { useState } from 'react'
import { Package, Users, FileText, ArrowRight, BarChart3, Star } from 'lucide-react'
import { WAREHOUSE_AGENTS, WAREHOUSE_FICHES, WAREHOUSE_STATS, FICHE_CATEGORY_COLORS } from '@/lib/warehouse-data'

type View = 'pipeline' | 'fiches'

export default function WarehousePage() {
  const [view, setView] = useState<View>('pipeline')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(WAREHOUSE_FICHES.map(f => f.category))].sort()
  const filteredFiches = selectedCategory
    ? WAREHOUSE_FICHES.filter(f => f.category === selectedCategory)
    : WAREHOUSE_FICHES

  const qualityColor = (q: string) => {
    if (q === 'A') return 'text-success-green'
    if (q === 'B') return 'text-amber-warm'
    return 'text-coral-energy'
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-heading font-semibold text-cloud-white">Warehouse</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(74,222,128,0.1)] text-success-green">
            {WAREHOUSE_STATS.totalFiches} fiches
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-steel-gray">
          <span>{WAREHOUSE_STATS.categories} categories</span>
          <span>{WAREHOUSE_STATS.avgSources} sources/fiche avg</span>
          <span>{WAREHOUSE_AGENTS.length} agents pipeline</span>
        </div>
      </header>

      {/* View switcher */}
      <div className="flex gap-1 px-4 pt-3">
        {([
          { id: 'pipeline' as View, label: 'Agent Pipeline', icon: Users },
          { id: 'fiches' as View, label: 'Fiches', icon: FileText, count: WAREHOUSE_STATS.totalFiches },
        ]).map(v => {
          const Icon = v.icon
          return (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                view === v.id
                  ? 'bg-[rgba(74,222,128,0.15)] text-success-green'
                  : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{v.label}</span>
              {v.count && (
                <span className="text-[9px] px-1 py-0.5 rounded bg-[rgba(255,255,255,0.06)]">{v.count}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Pipeline View */}
        {view === 'pipeline' && (
          <>
            {/* Pipeline flow */}
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-success-green" />
                <h3 className="text-sm font-heading font-semibold text-cloud-white">5-Agent Pipeline</h3>
              </div>

              <div className="space-y-3">
                {WAREHOUSE_AGENTS.map((agent, i) => (
                  <div key={agent.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(74,222,128,0.1)] flex items-center justify-center text-success-green text-xs font-bold">
                        {agent.step}
                      </div>
                      {i < WAREHOUSE_AGENTS.length - 1 && (
                        <div className="w-px h-6 bg-[rgba(74,222,128,0.2)] my-1" />
                      )}
                    </div>
                    <div className="flex-1 p-3 rounded-lg bg-[rgba(255,255,255,0.02)]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-cloud-white">{agent.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(74,222,128,0.1)] text-success-green">
                          {agent.role}
                        </span>
                        <ArrowRight className="w-3 h-3 text-steel-gray/30 ml-auto" />
                        <span className="text-[10px] text-steel-gray">{agent.output}</span>
                      </div>
                      <p className="text-[10px] text-steel-gray">{agent.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-cloud-white">{WAREHOUSE_STATS.totalFiches}</span>
                <p className="text-[10px] text-steel-gray mt-1">Fiches Total</p>
              </div>
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-cloud-white">{WAREHOUSE_STATS.categories}</span>
                <p className="text-[10px] text-steel-gray mt-1">Categories</p>
              </div>
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-cloud-white">{WAREHOUSE_STATS.avgSources}</span>
                <p className="text-[10px] text-steel-gray mt-1">Sources/Fiche</p>
              </div>
              <div className="glass-card p-3 text-center">
                <span className="text-2xl font-heading font-bold text-cloud-white">{WAREHOUSE_AGENTS.length}</span>
                <p className="text-[10px] text-steel-gray mt-1">Pipeline Agents</p>
              </div>
            </div>
          </>
        )}

        {/* Fiches View */}
        {view === 'fiches' && (
          <>
            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-[10px] px-2 py-1 rounded-lg transition-all ${
                  !selectedCategory
                    ? 'bg-[rgba(255,255,255,0.1)] text-cloud-white'
                    : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
                }`}
              >
                All ({WAREHOUSE_FICHES.length})
              </button>
              {categories.map(cat => {
                const count = WAREHOUSE_FICHES.filter(f => f.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(prev => prev === cat ? null : cat)}
                    className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg transition-all ${
                      selectedCategory === cat
                        ? 'bg-[rgba(255,255,255,0.1)] text-cloud-white'
                        : 'text-steel-gray hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: FICHE_CATEGORY_COLORS[cat] || '#64748B' }}
                    />
                    {cat} ({count})
                  </button>
                )
              })}
            </div>

            {/* Fiche grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredFiches.map(fiche => (
                <div key={fiche.id} className="glass-card p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-3.5 h-3.5 text-steel-gray shrink-0 mt-0.5" />
                    <span className="text-xs text-cloud-white font-medium leading-tight">{fiche.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${FICHE_CATEGORY_COLORS[fiche.category] || '#64748B'}15`,
                        color: FICHE_CATEGORY_COLORS[fiche.category] || '#64748B',
                      }}
                    >
                      {fiche.category}
                    </span>
                    <span className="text-steel-gray">{fiche.sources} sources</span>
                    <span className={`ml-auto font-medium ${qualityColor(fiche.quality)}`}>
                      {fiche.quality}
                    </span>
                    <span className="text-steel-gray/50">{fiche.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
