import type { DataFlow } from './types'

// Node positions for the architecture graph
// Layout: top-to-bottom, gateway → app → services → data
export const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  // Layer 0 — Entry point
  'traefik':           { x: 500, y: 0 },

  // Layer 1 — Application tier
  'nextjs':            { x: 300, y: 150 },
  'kong':              { x: 700, y: 150 },

  // Layer 2 — Support services
  'supabase-studio':   { x: 900, y: 300 },
  'redis':             { x: 100, y: 300 },
  'litellm':           { x: 300, y: 300 },
  'langfuse':          { x: 500, y: 300 },

  // Layer 3 — Core Supabase services
  'supabase-auth':     { x: 500, y: 450 },
  'supabase-rest':     { x: 700, y: 450 },
  'supabase-realtime': { x: 900, y: 450 },
  'supabase-storage':  { x: 1100, y: 450 },

  // Layer 4 — Data tier
  'supabase-db':       { x: 600, y: 600 },
  'supabase-meta':     { x: 800, y: 600 },
  'supabase-imgproxy': { x: 1100, y: 600 },
  'langfuse-db':       { x: 400, y: 600 },
  'neo4j':             { x: 200, y: 600 },

  // Layer 5 — Operations & Monitoring (right side)
  'ntfy':              { x: -100, y: 150 },
  'netbox':            { x: -100, y: 300 },
  'taskyn':            { x: -100, y: 450 },
  'netdata':           { x: -100, y: 0 },
}

// 24 connections between services
export const EDGE_DEFINITIONS: Omit<DataFlow, 'id'>[] = [
  // Traefik → frontends
  { source: 'traefik', target: 'nextjs', label: 'HTTP/S', protocol: 'https', animated: true },
  { source: 'traefik', target: 'kong', label: 'API proxy', protocol: 'https', animated: true },
  { source: 'traefik', target: 'supabase-studio', label: 'Dashboard', protocol: 'https', animated: false },
  { source: 'traefik', target: 'langfuse', label: 'Observability', protocol: 'https', animated: false },

  // Next.js → backend services
  { source: 'nextjs', target: 'kong', label: 'Supabase API', protocol: 'http', animated: true },
  { source: 'nextjs', target: 'redis', label: 'Cache + Jobs', protocol: 'tcp', animated: true },
  { source: 'nextjs', target: 'litellm', label: 'LLM calls', protocol: 'http', animated: true },
  { source: 'nextjs', target: 'langfuse', label: 'Tracing SDK', protocol: 'http', animated: false },

  // Kong → Supabase services
  { source: 'kong', target: 'supabase-auth', label: 'Auth routes', protocol: 'http', animated: true },
  { source: 'kong', target: 'supabase-rest', label: 'REST proxy', protocol: 'http', animated: true },
  { source: 'kong', target: 'supabase-realtime', label: 'WebSocket', protocol: 'ws', animated: true },
  { source: 'kong', target: 'supabase-storage', label: 'Storage routes', protocol: 'http', animated: false },

  // Supabase services → PostgreSQL
  { source: 'supabase-auth', target: 'supabase-db', label: 'Auth data', protocol: 'pg', animated: true },
  { source: 'supabase-rest', target: 'supabase-db', label: 'SQL queries', protocol: 'pg', animated: true },
  { source: 'supabase-realtime', target: 'supabase-db', label: 'WAL stream', protocol: 'pg', animated: true },
  { source: 'supabase-storage', target: 'supabase-db', label: 'Metadata', protocol: 'pg', animated: false },
  { source: 'supabase-storage', target: 'supabase-rest', label: 'PostgREST', protocol: 'http', animated: false },
  { source: 'supabase-storage', target: 'supabase-imgproxy', label: 'Transforms', protocol: 'http', animated: false },

  // Meta + Studio
  { source: 'supabase-meta', target: 'supabase-db', label: 'Schema read', protocol: 'pg', animated: false },
  { source: 'supabase-studio', target: 'supabase-meta', label: 'Introspection', protocol: 'http', animated: false },
  { source: 'supabase-studio', target: 'kong', label: 'API access', protocol: 'http', animated: false },

  // LiteLLM
  { source: 'litellm', target: 'supabase-db', label: 'Usage logs', protocol: 'pg', animated: false },
  { source: 'litellm', target: 'langfuse', label: 'LLM traces', protocol: 'http', animated: true },

  // Langfuse → own DB
  { source: 'langfuse', target: 'langfuse-db', label: 'Trace data', protocol: 'pg', animated: true },

  // Operations & Monitoring
  { source: 'traefik', target: 'netbox', label: 'CMDB UI', protocol: 'https', animated: false },
  { source: 'traefik', target: 'taskyn', label: 'PM UI', protocol: 'https', animated: false },
  { source: 'netbox', target: 'supabase-db', label: 'Inventory', protocol: 'pg', animated: false },
  { source: 'taskyn', target: 'supabase-db', label: 'Tasks data', protocol: 'pg', animated: false },
  { source: 'neo4j', target: 'supabase-db', label: 'Graph sync', protocol: 'pg', animated: false },
  { source: 'ntfy', target: 'netdata', label: 'Alert source', protocol: 'http', animated: false },
]

export const EDGES: DataFlow[] = EDGE_DEFINITIONS.map((e, i) => ({
  ...e,
  id: `e-${e.source}-${e.target}-${i}`,
}))
