'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ArchitectureData } from '@/lib/types'

const POLL_INTERVAL = 10_000 // 10 seconds

export function useMetrics() {
  const [data, setData] = useState<ArchitectureData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/metrics', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch metrics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchMetrics])

  return { data, error, loading }
}
