'use client'

import type { AggregateStats } from '@/lib/types'
import { formatNumber, formatUptime } from '@/lib/utils'
import {
  Server,
  Activity,
  Clock,
  Cpu,
  MemoryStick,
  Gauge,
} from 'lucide-react'

interface StatsBarProps {
  stats: AggregateStats
}

const StatItem = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  value: string
  color: string
}) => (
  <div className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1.5">
    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
    <span className="text-xs text-steel-gray hidden lg:inline">{label}</span>
    <span className="text-[10px] sm:text-xs font-semibold text-cloud-white">{value}</span>
  </div>
)

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-2 py-1 backdrop-blur-xl">
      <StatItem
        icon={Server}
        label="Services"
        value={`${stats.healthyServices}/${stats.totalServices}`}
        color="#4ADE80"
      />
      <div className="h-4 w-px bg-[rgba(255,255,255,0.1)] hidden sm:block" />
      <StatItem
        icon={Activity}
        label="Req/min"
        value={formatNumber(stats.totalRequests)}
        color="#00D4FF"
      />
      <div className="h-4 w-px bg-[rgba(255,255,255,0.1)] hidden sm:block" />
      <StatItem
        icon={Gauge}
        label="Latency"
        value={`${stats.avgLatency}ms`}
        color="#8B5CF6"
      />
      <div className="h-4 w-px bg-[rgba(255,255,255,0.1)] hidden sm:block" />
      <StatItem
        icon={Cpu}
        label="CPU"
        value={`${stats.avgCpu}%`}
        color="#FBBF24"
      />
      <div className="h-4 w-px bg-[rgba(255,255,255,0.1)] hidden sm:block" />
      <StatItem
        icon={MemoryStick}
        label="RAM"
        value={`${stats.avgMemory}%`}
        color="#FF6B6B"
      />
      <div className="h-4 w-px bg-[rgba(255,255,255,0.1)] hidden sm:block" />
      <StatItem
        icon={Clock}
        label="Uptime"
        value={formatUptime(stats.totalUptime)}
        color="#4ADE80"
      />
    </div>
  )
}
