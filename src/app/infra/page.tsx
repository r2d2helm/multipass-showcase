'use client'

import { useState } from 'react'
import { Network, Server, Info, ArrowRight } from 'lucide-react'
import { VMS, NETWORK_LINKS, CRON_JOBS } from '@/lib/infra-data'
import { VMCard } from '@/components/studio/vm-card'
import { CronTimeline } from '@/components/studio/cron-timeline'

export default function InfraPage() {
  const [selectedVM, setSelectedVM] = useState<string | null>(null)
  const vm = selectedVM ? VMS.find(v => v.id === selectedVM) : null

  const activeVMs = VMS.filter(v => v.status === 'up').length
  const totalVCPU = VMS.reduce((s, v) => s + v.vcpu, 0)
  const totalLinks = NETWORK_LINKS.length

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-heading font-semibold text-cloud-white">Infrastructure</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(0,212,255,0.1)] text-electric-cyan">
            Dell R740 / Proxmox 8
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-steel-gray">
          <span><span className="text-success-green font-medium">{activeVMs}</span>/{VMS.length} VMs up</span>
          <span>{totalVCPU} vCPU total</span>
          <span>{totalLinks} network links</span>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* VM Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {VMS.map(v => (
            <VMCard
              key={v.id}
              vm={v}
              selected={selectedVM === v.id}
              onClick={() => setSelectedVM(prev => prev === v.id ? null : v.id)}
            />
          ))}
        </div>

        {/* Selected VM Detail */}
        {vm && (
          <div className="glass-card p-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-electric-cyan" />
              <h3 className="text-sm font-heading font-semibold text-cloud-white">{vm.name}</h3>
              <span className="text-[10px] text-steel-gray ml-auto">VMID {vm.vmid} — {vm.ip}</span>
            </div>
            <p className="text-xs text-steel-gray mb-3">{vm.description}</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="text-[10px] text-steel-gray uppercase tracking-wide mb-2">Services</h4>
                <div className="space-y-1">
                  {vm.services.map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs text-cloud-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-success-green" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] text-steel-gray uppercase tracking-wide mb-2">Network Connections</h4>
                <div className="space-y-1">
                  {NETWORK_LINKS
                    .filter(l => l.source === vm.id || l.target === vm.id)
                    .map(l => {
                      const peer = l.source === vm.id ? l.target : l.source
                      const peerVM = VMS.find(v => v.id === peer)
                      return (
                        <div key={l.id} className="flex items-center gap-2 text-xs text-steel-gray">
                          <ArrowRight className="w-3 h-3 text-electric-cyan" />
                          <span className="text-cloud-white">{peerVM?.name || peer}</span>
                          <span className="text-[10px] px-1 py-0.5 rounded bg-[rgba(255,255,255,0.06)]">{l.protocol}</span>
                          <span className="text-[10px]">{l.label}</span>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Network Overview */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Network className="w-4 h-4 text-neon-purple" />
            <h3 className="text-sm font-heading font-semibold text-cloud-white">Network Topology</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {NETWORK_LINKS.filter(l => l.protocol !== 'VM').map(link => {
              const src = VMS.find(v => v.id === link.source)
              const tgt = VMS.find(v => v.id === link.target)
              return (
                <div key={link.id} className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-[rgba(255,255,255,0.02)]">
                  <span className="text-xs text-cloud-white font-medium">{src?.name || link.source}</span>
                  <div className="flex items-center gap-1 flex-1">
                    <div className="flex-1 h-px bg-gradient-to-r from-electric-cyan/40 to-neon-purple/40" />
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(0,212,255,0.1)] text-electric-cyan shrink-0">
                      {link.protocol}:{link.port || '—'}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-neon-purple/40 to-electric-cyan/40" />
                  </div>
                  <span className="text-xs text-cloud-white font-medium">{tgt?.name || link.target}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cron Timeline */}
        <CronTimeline jobs={CRON_JOBS} />
      </div>
    </div>
  )
}
