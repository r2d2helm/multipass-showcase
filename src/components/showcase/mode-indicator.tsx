'use client'

import { Badge } from '@/components/ui/badge'

interface ModeIndicatorProps {
  mode: 'live' | 'fake'
}

export function ModeIndicator({ mode }: ModeIndicatorProps) {
  const isLive = mode === 'live'

  return (
    <Badge
      variant={isLive ? 'success' : 'default'}
      className="gap-1.5 px-3 py-1"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isLive ? 'bg-success-green animate-pulse' : 'bg-electric-cyan'
        }`}
      />
      {isLive ? 'LIVE' : 'DEMO'}
    </Badge>
  )
}
