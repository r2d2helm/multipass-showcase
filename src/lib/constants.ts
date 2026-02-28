import type { ServiceCategory } from './types'

export interface ServiceDefinition {
  id: string
  name: string
  displayName: string
  category: ServiceCategory
  icon: string
  description: string
  port: number
  baseMemory: number  // typical memory usage %
  baseCpu: number     // typical CPU %
  baseLatency: number // typical latency ms
  baseRequests: number // typical req/min
  containerName: string      // Docker container name
  healthUrl: string | null   // Health endpoint URL (from inside Docker network)
}

export const SERVICES: ServiceDefinition[] = [
  {
    id: 'traefik',
    name: 'traefik',
    displayName: 'Traefik',
    category: 'gateway',
    icon: 'Globe',
    description: 'Reverse proxy & TLS termination. Routes all external traffic to internal services.',
    port: 443,
    baseMemory: 12, baseCpu: 5, baseLatency: 2, baseRequests: 450,
    containerName: 'traefik', healthUrl: 'http://localhost:8099/ping',
  },
  {
    id: 'nextjs',
    name: 'nextjs-app',
    displayName: 'Next.js 15',
    category: 'application',
    icon: 'AppWindow',
    description: 'React 19 frontend with server components. Handles SSR, API routes, and static assets.',
    port: 3000,
    baseMemory: 35, baseCpu: 18, baseLatency: 45, baseRequests: 320,
    containerName: 'multipass-nextjs', healthUrl: 'http://localhost:3000/',
  },
  {
    id: 'kong',
    name: 'supabase-kong',
    displayName: 'Kong Gateway',
    category: 'gateway',
    icon: 'Shield',
    description: 'API gateway for Supabase services. Handles auth, rate limiting, and CORS.',
    port: 8000,
    baseMemory: 18, baseCpu: 8, baseLatency: 5, baseRequests: 280,
    containerName: 'multipass-supabase-kong', healthUrl: 'http://localhost:8000/',
  },
  {
    id: 'supabase-db',
    name: 'supabase-db',
    displayName: 'PostgreSQL',
    category: 'database',
    icon: 'Database',
    description: 'PostgreSQL 15 with pgvector extension. Primary data store for all application data.',
    port: 5432,
    baseMemory: 55, baseCpu: 15, baseLatency: 3, baseRequests: 520,
    containerName: 'multipass-supabase-db', healthUrl: null,
  },
  {
    id: 'supabase-auth',
    name: 'supabase-auth',
    displayName: 'GoTrue Auth',
    category: 'auth',
    icon: 'KeyRound',
    description: 'Authentication service. JWT issuance, OAuth (Google, GitHub), email verification.',
    port: 9999,
    baseMemory: 15, baseCpu: 4, baseLatency: 25, baseRequests: 85,
    containerName: 'multipass-supabase-auth', healthUrl: null,
  },
  {
    id: 'supabase-rest',
    name: 'supabase-rest',
    displayName: 'PostgREST',
    category: 'application',
    icon: 'Plug',
    description: 'Auto-generated REST API from PostgreSQL schema. Instant CRUD endpoints.',
    port: 3000,
    baseMemory: 10, baseCpu: 6, baseLatency: 8, baseRequests: 240,
    containerName: 'multipass-supabase-rest', healthUrl: null,
  },
  {
    id: 'supabase-realtime',
    name: 'supabase-realtime',
    displayName: 'Realtime',
    category: 'realtime',
    icon: 'Radio',
    description: 'WebSocket server for real-time data subscriptions. Broadcasts database changes.',
    port: 4000,
    baseMemory: 20, baseCpu: 7, baseLatency: 12, baseRequests: 150,
    containerName: 'multipass-supabase-realtime', healthUrl: null,
  },
  {
    id: 'supabase-storage',
    name: 'supabase-storage',
    displayName: 'Storage',
    category: 'storage',
    icon: 'HardDrive',
    description: 'S3-compatible object storage. File uploads, image transformations, CDN delivery.',
    port: 5000,
    baseMemory: 14, baseCpu: 3, baseLatency: 18, baseRequests: 60,
    containerName: 'multipass-supabase-storage', healthUrl: null,
  },
  {
    id: 'supabase-imgproxy',
    name: 'supabase-imgproxy',
    displayName: 'ImgProxy',
    category: 'storage',
    icon: 'ImageIcon',
    description: 'On-the-fly image transformation. Resizing, cropping, format conversion.',
    port: 8080,
    baseMemory: 22, baseCpu: 12, baseLatency: 35, baseRequests: 40,
    containerName: 'multipass-supabase-imgproxy', healthUrl: null,
  },
  {
    id: 'supabase-meta',
    name: 'supabase-meta',
    displayName: 'PG Meta',
    category: 'database',
    icon: 'TableProperties',
    description: 'PostgreSQL introspection API. Provides schema metadata to Supabase Studio.',
    port: 8080,
    baseMemory: 8, baseCpu: 2, baseLatency: 15, baseRequests: 20,
    containerName: 'multipass-supabase-meta', healthUrl: null,
  },
  {
    id: 'supabase-studio',
    name: 'supabase-studio',
    displayName: 'Studio',
    category: 'application',
    icon: 'LayoutDashboard',
    description: 'Database management dashboard. Table editor, SQL runner, auth management.',
    port: 3001,
    baseMemory: 30, baseCpu: 10, baseLatency: 55, baseRequests: 15,
    containerName: 'multipass-supabase-studio', healthUrl: 'http://localhost:3001/',
  },
  {
    id: 'redis',
    name: 'redis',
    displayName: 'Redis',
    category: 'cache',
    icon: 'Zap',
    description: 'In-memory data store. Session cache, BullMQ job queues, rate limiting.',
    port: 6379,
    baseMemory: 8, baseCpu: 2, baseLatency: 1, baseRequests: 680,
    containerName: 'multipass-redis', healthUrl: null,
  },
  {
    id: 'litellm',
    name: 'litellm',
    displayName: 'LiteLLM',
    category: 'ai',
    icon: 'Brain',
    description: 'LLM gateway proxy. Routes to Claude, GPT-4, Mistral. Cost tracking and fallbacks.',
    port: 4000,
    baseMemory: 25, baseCpu: 20, baseLatency: 850, baseRequests: 45,
    containerName: 'multipass-litellm', healthUrl: 'http://localhost:4000/health/liveliness',
  },
  {
    id: 'langfuse',
    name: 'langfuse',
    displayName: 'Langfuse',
    category: 'observability',
    icon: 'Activity',
    description: 'LLM observability platform. Traces, costs, latency, prompt management.',
    port: 3002,
    baseMemory: 28, baseCpu: 9, baseLatency: 30, baseRequests: 95,
    containerName: 'multipass-langfuse', healthUrl: 'http://localhost:3002/',
  },
  {
    id: 'langfuse-db',
    name: 'langfuse-db',
    displayName: 'Langfuse DB',
    category: 'database',
    icon: 'Database',
    description: 'Dedicated PostgreSQL 17 instance for Langfuse. Isolated for performance.',
    port: 5432,
    baseMemory: 40, baseCpu: 8, baseLatency: 3, baseRequests: 180,
    containerName: 'multipass-langfuse-db', healthUrl: null,
  },
]

export const SERVICE_MAP = Object.fromEntries(SERVICES.map(s => [s.id, s]))
