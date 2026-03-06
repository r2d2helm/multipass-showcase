import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Monitoring | MultiPass Studio', description: '22 monitors Uptime Kuma, alertes ntfy, backups quotidiens, status page publique.' }
export default function Layout({ children }: { children: React.ReactNode }) { return children }
