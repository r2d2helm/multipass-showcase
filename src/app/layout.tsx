import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import { Sidebar } from '@/components/studio/sidebar'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MultiPass Studio | Interactive Infrastructure Showcase',
  description: 'Interactive visualization of the MultiPass Agency ecosystem — infrastructure, services, AI agents, monitoring.',
  metadataBase: new URL('https://showcase.multipass.agency'),
  openGraph: {
    title: 'MultiPass Studio',
    description: 'Interactive ecosystem showcase — infrastructure, services, AI agents, monitoring.',
    type: 'website',
    url: 'https://showcase.multipass.agency',
    siteName: 'MultiPass Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MultiPass Studio',
    description: 'Interactive ecosystem showcase — infrastructure, services, AI agents, monitoring.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
          <div className="fixed bottom-4 right-6 pointer-events-none select-none z-[9999] bg-[rgba(10,22,40,0.75)] px-4 py-2 rounded-lg backdrop-blur-sm border border-[rgba(139,92,246,0.3)]">
            <p className="text-xs font-mono tracking-wider text-neon-purple leading-tight">
              COPYRIGHT &copy; MultiPass Agency — Ecosystem Protege Par Brevet
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
