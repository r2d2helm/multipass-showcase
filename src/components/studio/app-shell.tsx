'use client'

import { LocaleProvider, useLocale } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import { Sidebar } from '@/components/studio/sidebar'
import { ReactNode } from 'react'

function CopyrightStamp() {
  const { t } = useLocale()
  return (
    <div className="fixed bottom-4 right-6 pointer-events-none select-none z-[9999] px-4 py-2 rounded-lg backdrop-blur-sm border" style={{ backgroundColor: 'var(--copyright-bg)', borderColor: 'var(--ring-color)' }}>
      <p className="text-xs font-mono tracking-wider text-neon-purple leading-tight">
        COPYRIGHT &copy; MultiPass Agency — {t('common.copyright')}
      </p>
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
          <CopyrightStamp />
        </div>
      </LocaleProvider>
    </ThemeProvider>
  )
}
