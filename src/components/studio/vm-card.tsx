'use client'

import { Server, Power, PowerOff, Cpu, MemoryStick, HardDrive } from 'lucide-react'
import type { VMDefinition } from '@/lib/infra-data'

interface VMCardProps {
  vm: VMDefinition
  selected: boolean
  onClick: () => void
}

export function VMCard({ vm, selected, onClick }: VMCardProps) {
  const isUp = vm.status === 'up'
  const statusColor = isUp ? 'text-success-green' : 'text-steel-gray'
  const StatusIcon = isUp ? Power : PowerOff

  return (
    <button
      onClick={onClick}
      className={`glass-card p-4 text-left transition-all duration-200 w-full ${
        selected
          ? 'ring-1 ring-electric-cyan bg-[rgba(0,212,255,0.08)]'
          : 'hover:bg-[rgba(255,255,255,0.09)]'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-electric-cyan" />
          <span className="text-lg font-heading font-semibold text-cloud-white">{vm.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <StatusIcon className={`w-3 h-3 ${statusColor}`} />
          <span className={`text-sm uppercase font-medium ${statusColor}`}>{vm.status}</span>
        </div>
      </div>

      <p className="text-base text-steel-gray mb-3 line-clamp-2">{vm.role}</p>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1 text-steel-gray">
          <Cpu className="w-3 h-3" />
          <span>{vm.vcpu || '—'} vCPU</span>
        </div>
        <div className="flex items-center gap-1 text-steel-gray">
          <MemoryStick className="w-3 h-3" />
          <span>{vm.ram}</span>
        </div>
        <div className="flex items-center gap-1 text-steel-gray">
          <HardDrive className="w-3 h-3" />
          <span>{vm.disk}</span>
        </div>
      </div>

      {isUp && (
        <div className="mt-2">
          <div className="flex justify-between text-sm text-steel-gray mb-1">
            <span>Disk usage</span>
            <span>{vm.diskUsage}%</span>
          </div>
          <div className="h-1 bg-[rgba(255,255,255,0.09)] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                vm.diskUsage > 85 ? 'bg-coral-energy' : vm.diskUsage > 70 ? 'bg-amber-warm' : 'bg-success-green'
              }`}
              style={{ width: `${vm.diskUsage}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1">
        {vm.services.slice(0, 3).map((s) => (
          <span key={s} className="text-sm px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.09)] text-steel-gray">
            {s}
          </span>
        ))}
        {vm.services.length > 3 && (
          <span className="text-sm px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.09)] text-steel-gray">
            +{vm.services.length - 3}
          </span>
        )}
      </div>
    </button>
  )
}
