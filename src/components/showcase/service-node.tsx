'use client'

import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ServiceMetrics } from '@/lib/types'
import { getStatusColor, getCategoryColor } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

type ServiceNodeData = {
  metrics: ServiceMetrics
  selected: boolean
}

function ServiceNodeComponent({ data }: NodeProps) {
  const { metrics, selected } = data as unknown as ServiceNodeData
  const statusColor = getStatusColor(metrics.status)
  const categoryColor = getCategoryColor(metrics.category)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[metrics.icon] || LucideIcons.Box

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-3 !h-3" />
      <div
        className={`
          group relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
          ${selected ? 'ring-2 ring-electric-cyan/50 scale-105' : ''}
        `}
        style={{
          background: 'var(--subtle-bg)',
          border: `1px solid ${selected ? categoryColor + '40' : 'var(--subtle-bg-3)'}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          minWidth: 160,
        }}
      >
        {/* Status dot */}
        <div
          className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-deep-ocean"
          style={{ backgroundColor: statusColor }}
        />

        {/* Category accent line */}
        <div
          className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-60"
          style={{ backgroundColor: categoryColor }}
        />

        <div className="flex items-center gap-3 mt-1">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: categoryColor + '15' }}
          >
            <IconComponent className="h-4.5 w-4.5" style={{ color: categoryColor }} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-cloud-white truncate">
              {metrics.displayName}
            </span>
            <span className="text-[10px] text-steel-gray capitalize">
              {metrics.category}
            </span>
          </div>
        </div>

        {/* Metrics row */}
        <div className="mt-2.5 flex items-center gap-3 text-[10px] text-steel-gray">
          <span>
            CPU <span className="text-cloud-white font-medium">{metrics.cpu}%</span>
          </span>
          <span>
            RAM <span className="text-cloud-white font-medium">{metrics.memory}%</span>
          </span>
          <span>
            <span className="text-cloud-white font-medium">{metrics.requests}</span> r/m
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-3 !h-3" />
    </>
  )
}

export const ServiceNode = memo(ServiceNodeComponent)
