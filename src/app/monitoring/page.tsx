'use client'

import { useState } from 'react'
import { Shield, Activity, HardDrive, Bell, Database, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { MONITOR_CHECKS, ALERT_RULES, BACKUP_JOBS, CHECK_TYPE_COLORS } from '@/lib/monitoring-data'

type View = 'checks' | 'alerts' | 'backups'

export default function MonitoringPage() {
  const [view, setView] = useState<View>('checks')

  const okCount = MONITOR_CHECKS.filter(c => c.status === 'ok').length
  const warnCount = MONITOR_CHECKS.filter(c => c.status === 'warn').length
  const critCount = MONITOR_CHECKS.filter(c => c.status === 'critical').length
  const checkTypes = [...new Set(MONITOR_CHECKS.map(c => c.type))]

  const statusIcon = (status: string) => {
    if (status === 'ok') return <CheckCircle className="w-3 h-3 text-success-green" />
    if (status === 'warn') return <AlertTriangle className="w-3 h-3 text-amber-warm" />
    return <XCircle className="w-3 h-3 text-coral-energy" />
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-heading font-semibold text-cloud-white">Monitoring</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(74,222,128,0.1)] text-success-green">
            All Systems Operational
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-steel-gray">
          <span className="text-success-green font-medium">{okCount} OK</span>
          {warnCount > 0 && <span className="text-amber-warm font-medium">{warnCount} WARN</span>}
          {critCount > 0 && <span className="text-coral-energy font-medium">{critCount} CRIT</span>}
          <span>Cron */5</span>
        </div>
      </header>

      {/* View switcher */}
      <div className="flex gap-1 px-4 pt-3">
        {([
          { id: 'checks' as View, label: 'Health Checks', icon: Activity, count: MONITOR_CHECKS.length },
          { id: 'alerts' as View, label: 'Alert Rules', icon: Bell, count: ALERT_RULES.length },
          { id: 'backups' as View, label: 'Backups', icon: Database, count: BACKUP_JOBS.length },
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
              <span className="text-[9px] px-1 py-0.5 rounded bg-[rgba(255,255,255,0.06)]">{v.count}</span>
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Health Checks */}
        {view === 'checks' && (
          <>
            {/* Type filter legend */}
            <div className="flex flex-wrap gap-2 mb-1">
              {checkTypes.map(type => (
                <div key={type} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHECK_TYPE_COLORS[type] }} />
                  <span className="text-[10px] text-steel-gray uppercase">{type}</span>
                  <span className="text-[9px] text-steel-gray/50">
                    ({MONITOR_CHECKS.filter(c => c.type === type).length})
                  </span>
                </div>
              ))}
            </div>

            <div className="glass-card p-4">
              <div className="space-y-1.5">
                {MONITOR_CHECKS.map(check => (
                  <div key={check.id} className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-[rgba(255,255,255,0.02)]">
                    {statusIcon(check.status)}
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: CHECK_TYPE_COLORS[check.type] }}
                    />
                    <span className="text-xs text-cloud-white w-36 shrink-0 truncate">{check.name}</span>
                    <span className="text-[10px] text-steel-gray w-20 shrink-0">{check.target}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded shrink-0"
                          style={{ backgroundColor: `${CHECK_TYPE_COLORS[check.type]}15`, color: CHECK_TYPE_COLORS[check.type] }}>
                      {check.type}
                    </span>
                    {check.value && (
                      <span className="text-[10px] text-steel-gray ml-auto">{check.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Alert Rules */}
        {view === 'alerts' && (
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-amber-warm" />
              <h3 className="text-sm font-heading font-semibold text-cloud-white">Alert Rules</h3>
              <span className="text-[10px] text-steel-gray ml-auto">ntfy push notifications</span>
            </div>
            <div className="space-y-2">
              {ALERT_RULES.map(rule => (
                <div key={rule.id} className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)]">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-3 h-3 text-amber-warm" />
                    <span className="text-xs text-cloud-white font-medium">{rule.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(251,191,36,0.1)] text-amber-warm ml-auto">
                      {rule.channel}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-steel-gray">
                    <span>IF {rule.condition}</span>
                    <span className="text-steel-gray/30">→</span>
                    <span>{rule.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backups */}
        {view === 'backups' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <HardDrive className="w-4 h-4 text-electric-cyan" />
                  <h4 className="text-xs font-heading font-semibold text-cloud-white">Local</h4>
                </div>
                <p className="text-[10px] text-steel-gray">/mnt/shared/backups/ — NFS sur r2d2-store</p>
                <p className="text-[10px] text-steel-gray">Retention: 14 jours</p>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-neon-purple" />
                  <h4 className="text-xs font-heading font-semibold text-cloud-white">Offsite</h4>
                </div>
                <p className="text-[10px] text-steel-gray">Google Drive via rclone</p>
                <p className="text-[10px] text-steel-gray">14.7 Go libres, sync quotidien</p>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-success-green" />
                  <h4 className="text-xs font-heading font-semibold text-cloud-white">Restore Test</h4>
                </div>
                <p className="text-[10px] text-steel-gray">Mensuel, 4 backups testes</p>
                <p className="text-[10px] text-steel-gray">Containers ephemeres, 4/4 OK</p>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-4 h-4 text-electric-cyan" />
                <h3 className="text-sm font-heading font-semibold text-cloud-white">Backup Jobs</h3>
              </div>
              <div className="space-y-2">
                {BACKUP_JOBS.map(job => (
                  <div key={job.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[rgba(255,255,255,0.02)]">
                    {statusIcon(job.status)}
                    <span className="text-xs text-cloud-white w-48 shrink-0">{job.name}</span>
                    <code className="text-[10px] text-steel-gray font-mono w-24 shrink-0">{job.schedule}</code>
                    <span className="text-[10px] text-steel-gray flex-1 truncate">{job.target}</span>
                    <span className="text-[10px] text-steel-gray w-16 text-right">{job.retention}</span>
                    {job.lastSize && (
                      <span className="text-[10px] text-electric-cyan w-12 text-right">{job.lastSize}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
