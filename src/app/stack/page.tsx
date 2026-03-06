'use client'

import { useMetrics } from '@/hooks/use-metrics'
import { ArchitectureGraph } from '@/components/showcase/architecture-graph'
import { StatsBar } from '@/components/showcase/stats-bar'
import { ModeIndicator } from '@/components/showcase/mode-indicator'
import { ErrorBoundary } from '@/components/showcase/error-boundary'
import { Loader2 } from 'lucide-react'

export default function StackPage() {
  const { data, error, loading } = useMetrics()

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-electric-cyan" />
          <span className="text-sm text-steel-gray font-body">Loading architecture...</span>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center px-6">
          <p className="text-coral-energy text-sm font-body">Failed to load architecture data</p>
          <p className="text-steel-gray text-xs mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)] gap-2">
          <div className="flex items-center gap-3 shrink-0">
            <h2 className="text-sm font-heading font-semibold text-cloud-white">
              Technical Stack
            </h2>
            <ModeIndicator mode={data.mode} />
          </div>
          <StatsBar stats={data.aggregates} />
        </header>

        {/* Graph canvas */}
        <div className="flex-1 relative">
          <ArchitectureGraph data={data} />
        </div>
      </div>
    </ErrorBoundary>
  )
}
