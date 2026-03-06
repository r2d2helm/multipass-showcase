'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, Area, AreaChart,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { BarChart3 } from 'lucide-react'
import {
  VM_RESOURCES, CONTAINER_DISTRIBUTION, TEST_COVERAGE,
  UPTIME_DATA, AGENT_CAPABILITIES, BACKUP_HEALTH,
} from '@/lib/charts-data'
import { useLocale } from '@/lib/i18n'

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-base font-heading font-semibold text-cloud-white mb-0.5">{title}</h3>
      <p className="text-sm text-steel-gray mb-4">{subtitle}</p>
      {children}
    </div>
  )
}

export default function ChartsPage() {
  const { t } = useLocale()

  const unitTests = TEST_COVERAGE.filter(tc => tc.type === 'unit')
  const e2eTests = TEST_COVERAGE.filter(tc => tc.type === 'e2e')
  const allTests = [...unitTests, ...e2eTests]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">{t('charts.title')}</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--cyan-tint)] text-electric-cyan">
            Live Data
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>6 {t('nav.charts').toLowerCase()}</span>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* 1. VM Resources */}
          <ChartCard title={t('charts.vm.title')} subtitle={t('charts.vm.subtitle')}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={VM_RESOURCES} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--steel-gray)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--steel-gray)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--deep-ocean)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--cloud-white)' }}
                  labelStyle={{ color: 'var(--cloud-white)' }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="cpu" name="CPU (cores)" fill="#00D4FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ram" name="RAM (Go)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="disk" name="Disk (%)" fill="#FBBF24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 2. Container Distribution */}
          <ChartCard title={t('charts.containers.title')} subtitle={t('charts.containers.subtitle')}>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="55%" height={250}>
                <PieChart>
                  <Pie
                    data={CONTAINER_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {CONTAINER_DISTRIBUTION.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--deep-ocean)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--cloud-white)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {CONTAINER_DISTRIBUTION.map(item => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-steel-gray flex-1 truncate">{item.name}</span>
                    <span className="text-cloud-white font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          {/* 3. Test Coverage */}
          <ChartCard title={t('charts.tests.title')} subtitle={t('charts.tests.subtitle')}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={allTests} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis type="number" tick={{ fill: 'var(--steel-gray)', fontSize: 11 }} />
                <YAxis dataKey="category" type="category" tick={{ fill: 'var(--steel-gray)', fontSize: 10 }} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--deep-ocean)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--cloud-white)' }}
                />
                <Bar dataKey="count" name="Tests" radius={[0, 4, 4, 0]}>
                  {allTests.map((entry) => (
                    <Cell key={entry.category} fill={entry.type === 'unit' ? '#8B5CF6' : '#00D4FF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 4. Uptime 30 days */}
          <ChartCard title={t('charts.uptime.title')} subtitle={t('charts.uptime.subtitle')}>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={UPTIME_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis dataKey="day" tick={{ fill: 'var(--steel-gray)', fontSize: 10 }} interval={4} />
                <YAxis domain={[90, 100]} tick={{ fill: 'var(--steel-gray)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--deep-ocean)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--cloud-white)' }}
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Uptime']}
                />
                <defs>
                  <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="uptime" stroke="#4ADE80" fill="url(#uptimeGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 5. Agent Capabilities Radar */}
          <ChartCard title={t('charts.agents.title')} subtitle={t('charts.agents.subtitle')}>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={AGENT_CAPABILITIES} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="var(--glass-border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--steel-gray)', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--steel-gray)', fontSize: 9 }} />
                <Radar name="Engineer" dataKey="Engineer" stroke="#00D4FF" fill="#00D4FF" fillOpacity={0.15} />
                <Radar name="Architect" dataKey="Architect" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.15} />
                <Radar name="Researcher" dataKey="Researcher" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.15} />
                <Radar name="Analyst" dataKey="Analyst" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.15} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--deep-ocean)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--cloud-white)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 6. Backup Health */}
          <ChartCard title={t('charts.backup.title')} subtitle={t('charts.backup.subtitle')}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={BACKUP_HEALTH} layout="vertical" margin={{ top: 5, right: 20, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis type="number" tick={{ fill: 'var(--steel-gray)', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: 'var(--steel-gray)', fontSize: 11 }} width={70} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--deep-ocean)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--cloud-white)' }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="sizeMB" name="Taille (MB)" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="freshHours" name="Age (heures)" fill="#4ADE80" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>
      </div>
    </div>
  )
}
