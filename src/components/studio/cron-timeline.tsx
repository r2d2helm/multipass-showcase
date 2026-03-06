'use client'

import { Clock, Shield, Database, RefreshCw, Wrench, TestTube } from 'lucide-react'
import type { CronJob } from '@/lib/infra-data'

const CATEGORY_CONFIG = {
  monitoring: { icon: Shield, color: 'text-electric-cyan', bg: 'bg-[rgba(0,212,255,0.1)]' },
  backup: { icon: Database, color: 'text-neon-purple', bg: 'bg-[rgba(139,92,246,0.1)]' },
  sync: { icon: RefreshCw, color: 'text-success-green', bg: 'bg-[rgba(74,222,128,0.1)]' },
  maintenance: { icon: Wrench, color: 'text-amber-warm', bg: 'bg-[rgba(251,191,36,0.1)]' },
  test: { icon: TestTube, color: 'text-coral-energy', bg: 'bg-[rgba(255,107,107,0.1)]' },
}

function parseScheduleToHour(schedule: string): number | null {
  const parts = schedule.split(' ')
  if (parts[1] === '*') return null
  return parseInt(parts[1], 10)
}

interface CronTimelineProps {
  jobs: CronJob[]
}

export function CronTimeline({ jobs }: CronTimelineProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-electric-cyan" />
        <h3 className="text-lg font-heading font-semibold text-cloud-white">Cron Orchestra</h3>
        <span className="text-sm text-steel-gray ml-auto">{jobs.length} jobs</span>
      </div>

      {/* 24h timeline */}
      <div className="relative mb-4">
        <div className="flex justify-between text-sm text-steel-gray mb-1">
          {[0, 3, 6, 9, 12, 15, 18, 21].map(h => (
            <span key={h}>{h.toString().padStart(2, '0')}h</span>
          ))}
        </div>
        <div className="h-8 bg-[rgba(255,255,255,0.09)] rounded-lg relative overflow-hidden">
          {jobs.map((job, i) => {
            const hour = parseScheduleToHour(job.schedule)
            if (hour === null) return null
            const left = (hour / 24) * 100
            const config = CATEGORY_CONFIG[job.category]
            return (
              <div
                key={i}
                className={`absolute top-1 w-1.5 h-6 rounded-full ${config.bg} border border-current ${config.color}`}
                style={{ left: `${left}%` }}
                title={`${job.label} — ${job.schedule}`}
              />
            )
          })}
          {/* Recurring jobs as bands */}
          {jobs.filter(j => parseScheduleToHour(j.schedule) === null).map((job, i) => {
            const config = CATEGORY_CONFIG[job.category]
            return (
              <div
                key={`recurring-${i}`}
                className={`absolute top-0 left-0 right-0 h-full ${config.bg} opacity-30`}
                title={`${job.label} — ${job.schedule} (recurring)`}
              />
            )
          })}
        </div>
      </div>

      {/* Job list */}
      <div className="space-y-1.5">
        {jobs.map((job, i) => {
          const config = CATEGORY_CONFIG[job.category]
          const Icon = config.icon
          return (
            <div key={i} className="flex items-center gap-2 py-1">
              <Icon className={`w-3 h-3 shrink-0 ${config.color}`} />
              <code className="text-sm text-steel-gray font-mono w-24 shrink-0">{job.schedule}</code>
              <span className="text-base text-cloud-white truncate">{job.label}</span>
              <span className="text-sm text-steel-gray ml-auto truncate max-w-32 hidden sm:block">{job.description}</span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
          const Icon = config.icon
          return (
            <div key={key} className="flex items-center gap-1">
              <Icon className={`w-3 h-3 ${config.color}`} />
              <span className="text-sm text-steel-gray capitalize">{key}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
