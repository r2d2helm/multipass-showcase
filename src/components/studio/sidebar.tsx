'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Server,
  Layers,
  Brain,
  ShieldCheck,
  BookOpen,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/infra', label: 'Infrastructure', icon: Server, description: 'VMs & Network' },
  { href: '/stack', label: 'Stack', icon: Layers, description: 'Services & Flows' },
  { href: '/brain', label: 'Brain', icon: Brain, description: 'PAI & Agents' },
  { href: '/monitoring', label: 'Monitoring', icon: ShieldCheck, description: 'Alerts & Backup' },
  { href: '/warehouse', label: 'Warehouse', icon: BookOpen, description: 'Knowledge Base' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-16 lg:w-56 shrink-0 border-r border-[rgba(255,255,255,0.06)] bg-[rgba(10,22,40,0.6)]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 lg:px-4 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-cyan to-neon-purple flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-white">MP</span>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-sm font-heading font-bold gradient-text">MultiPass</h1>
          <p className="text-[10px] text-steel-gray">Studio</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-1 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon, description }) => {
          const isActive = pathname === href || (href === '/stack' && pathname === '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[rgba(0,212,255,0.1)] text-electric-cyan'
                  : 'text-steel-gray hover:text-cloud-white hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-electric-cyan' : 'text-steel-gray group-hover:text-cloud-white'}`} />
              <div className="hidden lg:block">
                <span className="text-sm font-medium">{label}</span>
                <p className={`text-[10px] ${isActive ? 'text-electric-cyan/60' : 'text-steel-gray/60'}`}>{description}</p>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 lg:px-4 py-3 border-t border-[rgba(255,255,255,0.06)]">
        <div className="hidden lg:block">
          <p className="text-[10px] text-steel-gray">v2.5.0 — AdminSystem</p>
          <p className="text-[10px] text-steel-gray/50">Dell R740 / Proxmox 8</p>
        </div>
      </div>
    </aside>
  )
}
