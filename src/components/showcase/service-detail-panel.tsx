'use client'

import { useEffect, useState } from 'react'
import type { ServiceMetrics, DataFlow } from '@/lib/types'
import { getStatusColor, getCategoryColor, formatUptime, formatNumber } from '@/lib/utils'
import { SERVICE_MAP } from '@/lib/constants'
import { X } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

interface ServiceDetailPanelProps {
  service: ServiceMetrics | null
  flows: DataFlow[]
  onClose: () => void
}

function resolveDisplayName(serviceId: string): string {
  return SERVICE_MAP[serviceId]?.displayName || serviceId
}

export function ServiceDetailPanel({ service, flows, onClose }: ServiceDetailPanelProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Slide in when service changes
  useEffect(() => {
    if (service) {
      // Small delay for mount → transition trigger
      const t = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(t)
    } else {
      setIsVisible(false)
    }
  }, [service])

  if (!service) return null

  const statusColor = getStatusColor(service.status)
  const categoryColor = getCategoryColor(service.category)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Box

  const inbound = flows.filter(f => f.target === service.id)
  const outbound = flows.filter(f => f.source === service.id)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for transition to finish
  }

  return (
    <div
      className={`
        absolute right-4 top-4 bottom-4 w-80 z-50 rounded-2xl
        border border-[var(--glass-border)] bg-[var(--overlay-bg)]
        backdrop-blur-xl overflow-hidden flex flex-col
        transition-all duration-300 ease-out
        ${isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-8 opacity-0'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--subtle-bg-3)]">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: categoryColor + '15' }}
          >
            <IconComponent className="h-5 w-5" style={{ color: categoryColor }} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-cloud-white font-heading">
              {service.displayName}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: statusColor }}
              />
              <span className="text-xs capitalize text-steel-gray">{service.status}</span>
              <span className="text-[10px] text-steel-gray/60">Port {service.port}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="rounded-lg p-1.5 text-steel-gray hover:text-cloud-white hover:bg-[var(--subtle-bg-2)] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Description */}
        <p className="text-xs text-steel-gray leading-relaxed">{service.description}</p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2">
          <MetricCard label="CPU" value={`${service.cpu}%`} color="#FBBF24" />
          <MetricCard label="Memory" value={`${service.memory}%`} color="#FF6B6B" />
          <MetricCard label="Latency" value={`${service.latency}ms`} color="#8B5CF6" />
          <MetricCard label="Req/min" value={formatNumber(service.requests)} color="#00D4FF" />
          <MetricCard label="Uptime" value={formatUptime(service.uptime)} color="#4ADE80" />
          <MetricCard label="Connections" value={String(service.connections)} color="#64748B" />
        </div>

        {/* Connections */}
        {inbound.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-cloud-white mb-2">
              Inbound ({inbound.length})
            </h4>
            <div className="space-y-1">
              {inbound.map(f => (
                <ConnectionRow
                  key={f.id}
                  label={resolveDisplayName(f.source)}
                  detail={f.label}
                  protocol={f.protocol}
                  direction="in"
                />
              ))}
            </div>
          </div>
        )}
        {outbound.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-cloud-white mb-2">
              Outbound ({outbound.length})
            </h4>
            <div className="space-y-1">
              {outbound.map(f => (
                <ConnectionRow
                  key={f.id}
                  label={resolveDisplayName(f.target)}
                  detail={f.label}
                  protocol={f.protocol}
                  direction="out"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-[var(--subtle-bg-2)] bg-[var(--subtle-bg)] p-2.5">
      <span className="text-[10px] text-steel-gray block">{label}</span>
      <span className="text-sm font-semibold" style={{ color }}>{value}</span>
    </div>
  )
}

function ConnectionRow({
  label,
  detail,
  protocol,
  direction,
}: {
  label: string
  detail: string
  protocol: string
  direction: 'in' | 'out'
}) {
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs bg-[var(--subtle-bg)] hover:bg-[var(--subtle-bg)] transition-colors">
      <span className={direction === 'in' ? 'text-success-green' : 'text-electric-cyan'}>
        {direction === 'in' ? '\u2190' : '\u2192'}
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-cloud-white">{label}</span>
        <span className="text-steel-gray/60 ml-1.5 text-[10px]">{detail}</span>
      </div>
      <span className="text-steel-gray/50 uppercase text-[10px] shrink-0">{protocol}</span>
    </div>
  )
}
