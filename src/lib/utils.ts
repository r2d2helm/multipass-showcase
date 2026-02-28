import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  if (days > 0) return `${days}d ${hours}h`
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy': return '#4ADE80'
    case 'degraded': return '#FBBF24'
    case 'down': return '#FF6B6B'
    default: return '#64748B'
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'gateway': return '#00D4FF'
    case 'application': return '#8B5CF6'
    case 'database': return '#4ADE80'
    case 'cache': return '#FBBF24'
    case 'ai': return '#FF6B6B'
    case 'observability': return '#00D4FF'
    case 'auth': return '#8B5CF6'
    case 'storage': return '#FBBF24'
    case 'realtime': return '#4ADE80'
    default: return '#64748B'
  }
}
