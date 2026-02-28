import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
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
  title: 'MultiPass Architecture | Live Infrastructure Showcase',
  description: 'Real-time visualization of the MultiPass Agency microservices architecture. 15+ Docker services orchestrated on Proxmox.',
  metadataBase: new URL('https://showcase.multipass.agency'),
  openGraph: {
    title: 'MultiPass Architecture Showcase',
    description: 'Live infrastructure visualization — 15 microservices, real-time metrics.',
    type: 'website',
    url: 'https://showcase.multipass.agency',
    siteName: 'MultiPass Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MultiPass Architecture Showcase',
    description: 'Live infrastructure visualization — 15 microservices, real-time metrics.',
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
        {children}
      </body>
    </html>
  )
}
