'use client'

import { useState, useCallback } from 'react'
import { Brain, Globe, Box, BookOpen, ShieldCheck, Server, GitBranch, ArrowRight, ArrowLeftRight, Zap, X } from 'lucide-react'
import { ECO_NODES, ECO_EDGES, type EcoNode, type EcoEdge } from '@/lib/ecosystem-data'
import { useLocale } from '@/lib/i18n'

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Globe, Box, BookOpen, ShieldCheck, Server, GitBranch,
}

const SIZE_MAP = { lg: 14, md: 11, sm: 9 }
const ICON_SIZE_MAP = { lg: 7, md: 5.5, sm: 4.5 }

function getEdgePath(from: EcoNode, to: EcoNode): string {
  const x1 = from.x
  const y1 = from.y
  const x2 = to.x
  const y2 = to.y
  // Curved path using quadratic bezier
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  // Offset the midpoint perpendicular to the line for a nice curve
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.sqrt(dx * dx + dy * dy)
  const offset = dist * 0.15
  const nx = -dy / dist * offset
  const ny = dx / dist * offset
  return `M ${x1} ${y1} Q ${mx + nx} ${my + ny} ${x2} ${y2}`
}

function EdgeLine({ edge, nodes, isHighlighted, isActive, onClick }: {
  edge: EcoEdge
  nodes: EcoNode[]
  isHighlighted: boolean
  isActive: boolean
  onClick: () => void
}) {
  const from = nodes.find(n => n.id === edge.from)!
  const to = nodes.find(n => n.id === edge.to)!
  const path = getEdgePath(from, to)
  const edgeId = `edge-${edge.from}-${edge.to}`

  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Invisible wider hit area */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth="3"
      />
      {/* Visible line */}
      <path
        d={path}
        fill="none"
        stroke={edge.color}
        strokeWidth={isActive ? 0.6 : isHighlighted ? 0.4 : 0.2}
        strokeOpacity={isHighlighted ? 0.8 : 0.15}
        strokeDasharray={edge.animated && isHighlighted ? undefined : '1 1'}
        className="transition-all duration-300"
      />
      {/* Animated particle */}
      {edge.animated && isHighlighted && (
        <>
          <circle r="0.8" fill={edge.color} opacity="0.9">
            <animateMotion dur="3s" repeatCount="indefinite" path={path} />
          </circle>
          <circle r="0.5" fill="white" opacity="0.6">
            <animateMotion dur="3s" repeatCount="indefinite" path={path} begin="1.5s" />
          </circle>
        </>
      )}
    </g>
  )
}

function NodeCircle({ node, isHighlighted, isSelected, onClick, t }: {
  node: EcoNode
  isHighlighted: boolean
  isSelected: boolean
  onClick: () => void
  t: (k: string) => string
}) {
  const Icon = ICON_MAP[node.icon] || Brain
  const size = SIZE_MAP[node.size]
  const iconSize = ICON_SIZE_MAP[node.size]
  const halfSize = size / 2

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Glow ring */}
      {isHighlighted && (
        <circle
          r={halfSize + 1.5}
          fill="none"
          stroke={node.color}
          strokeWidth="0.4"
          opacity="0.3"
        >
          <animate attributeName="r" values={`${halfSize + 1};${halfSize + 2.5};${halfSize + 1}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      {/* Selection ring */}
      {isSelected && (
        <circle
          r={halfSize + 1}
          fill="none"
          stroke={node.color}
          strokeWidth="0.5"
          opacity="0.7"
        />
      )}
      {/* Background circle */}
      <circle
        r={halfSize}
        fill={`${node.color}${isHighlighted ? '20' : '10'}`}
        stroke={node.color}
        strokeWidth={isHighlighted ? 0.5 : 0.3}
        strokeOpacity={isHighlighted ? 0.6 : 0.2}
        className="transition-all duration-300"
      />
      {/* Icon */}
      <foreignObject
        x={-iconSize / 2}
        y={-iconSize / 2 - (node.size === 'lg' ? 1 : 0.5)}
        width={iconSize}
        height={iconSize}
      >
        <Icon
          style={{ width: iconSize, height: iconSize, color: node.color }}
        />
      </foreignObject>
      {/* Label */}
      <text
        y={halfSize + 3}
        textAnchor="middle"
        fill={isHighlighted ? node.color : 'var(--steel-gray)'}
        fontSize={node.size === 'lg' ? 3 : node.size === 'md' ? 2.5 : 2.2}
        fontWeight="700"
        fontFamily="var(--font-heading)"
        className="transition-all duration-300 select-none"
      >
        {t(node.labelKey)}
      </text>
    </g>
  )
}

export default function EcosystemPage() {
  const { t } = useLocale()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null)

  const connectedNodes = useCallback((nodeId: string) => {
    const connected = new Set<string>([nodeId])
    ECO_EDGES.forEach(e => {
      if (e.from === nodeId || e.to === nodeId) {
        connected.add(e.from)
        connected.add(e.to)
      }
    })
    return connected
  }, [])

  const highlightedNodes = selectedNode ? connectedNodes(selectedNode) : new Set(ECO_NODES.map(n => n.id))
  const highlightedEdges = selectedNode
    ? new Set(ECO_EDGES.filter(e => e.from === selectedNode || e.to === selectedNode).map(e => `${e.from}-${e.to}`))
    : new Set(ECO_EDGES.map(e => `${e.from}-${e.to}`))

  const selectedNodeData = selectedNode ? ECO_NODES.find(n => n.id === selectedNode) : null
  const selectedEdgeData = selectedEdge ? ECO_EDGES.find(e => `${e.from}-${e.to}` === selectedEdge) : null
  const nodeEdges = selectedNode ? ECO_EDGES.filter(e => e.from === selectedNode || e.to === selectedNode) : []

  const handleNodeClick = (id: string) => {
    setSelectedEdge(null)
    setSelectedNode(prev => prev === id ? null : id)
  }

  const handleEdgeClick = (edgeKey: string) => {
    setSelectedNode(null)
    setSelectedEdge(prev => prev === edgeKey ? null : edgeKey)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--subtle-bg-2)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-cloud-white">{t('eco.title')}</h2>
          <span className="text-sm px-2 py-0.5 rounded-full bg-[var(--purple-tint)] text-neon-purple">
            {t('eco.badge')}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-steel-gray">
          <span>{ECO_NODES.length} {t('eco.systems')}</span>
          <span>{ECO_EDGES.length} {t('eco.connections')}</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Graph area */}
        <div className="flex-1 relative">
          {/* Subtitle */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-center">
            <p className="text-sm text-steel-gray">{t('eco.subtitle')}</p>
          </div>

          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background grid dots */}
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="0.15" fill="var(--steel-gray)" opacity="0.15" />
              </pattern>
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Edges */}
            {ECO_EDGES.map(edge => {
              const key = `${edge.from}-${edge.to}`
              return (
                <EdgeLine
                  key={key}
                  edge={edge}
                  nodes={ECO_NODES}
                  isHighlighted={highlightedEdges.has(key)}
                  isActive={selectedEdge === key}
                  onClick={() => handleEdgeClick(key)}
                />
              )
            })}

            {/* Nodes */}
            {ECO_NODES.map(node => (
              <NodeCircle
                key={node.id}
                node={node}
                isHighlighted={highlightedNodes.has(node.id)}
                isSelected={selectedNode === node.id}
                onClick={() => handleNodeClick(node.id)}
                t={t}
              />
            ))}
          </svg>

          {/* Click hint */}
          {!selectedNode && !selectedEdge && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
              <span className="text-xs text-steel-gray bg-[var(--subtle-bg-2)] px-3 py-1.5 rounded-full">
                {t('eco.hint')}
              </span>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {(selectedNodeData || selectedEdgeData) && (
          <div className="w-72 lg:w-80 border-l border-[var(--subtle-bg-2)] overflow-auto p-4 space-y-4">
            {/* Close button */}
            <button
              onClick={() => { setSelectedNode(null); setSelectedEdge(null) }}
              className="absolute top-3 right-3 p-1 rounded-lg text-steel-gray hover:text-cloud-white hover:bg-[var(--subtle-bg-2)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {selectedNodeData && (
              <>
                {/* Node header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${selectedNodeData.color}15` }}
                  >
                    {(() => {
                      const Icon = ICON_MAP[selectedNodeData.icon] || Brain
                      return <Icon className="w-6 h-6" style={{ color: selectedNodeData.color }} />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-semibold text-cloud-white">
                      {t(selectedNodeData.labelKey)}
                    </h3>
                    <p className="text-xs text-steel-gray">{t(selectedNodeData.descKey)}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  {selectedNodeData.stats.map(stat => (
                    <div key={stat.labelKey} className="glass-card p-2.5 text-center">
                      <p className="text-lg font-heading font-bold text-cloud-white">{stat.value}</p>
                      <p className="text-xs text-steel-gray">{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>

                {/* Connections */}
                <div>
                  <h4 className="text-xs font-bold text-steel-gray uppercase mb-2">{t('eco.panel.connections')}</h4>
                  <div className="space-y-1.5">
                    {nodeEdges.map(edge => {
                      const isOutgoing = edge.from === selectedNode
                      const otherId = isOutgoing ? edge.to : edge.from
                      const other = ECO_NODES.find(n => n.id === otherId)!
                      const OtherIcon = ICON_MAP[other.icon] || Brain
                      return (
                        <div
                          key={`${edge.from}-${edge.to}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-[var(--subtle-bg-2)] hover:bg-[var(--subtle-bg-3)] transition-colors cursor-pointer"
                          onClick={() => handleNodeClick(otherId)}
                        >
                          {edge.bidirectional ? (
                            <ArrowLeftRight className="w-3 h-3 text-steel-gray shrink-0" />
                          ) : isOutgoing ? (
                            <ArrowRight className="w-3 h-3 text-steel-gray shrink-0" />
                          ) : (
                            <ArrowRight className="w-3 h-3 text-steel-gray shrink-0 rotate-180" />
                          )}
                          <OtherIcon className="w-3.5 h-3.5 shrink-0" style={{ color: other.color }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-cloud-white truncate">{t(edge.labelKey)}</p>
                            <p className="text-xs text-steel-gray">{edge.protocol}</p>
                          </div>
                          {edge.animated && (
                            <Zap className="w-3 h-3 text-amber-warm shrink-0" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedEdgeData && (
              <>
                {/* Edge detail */}
                <div>
                  <h3 className="text-base font-heading font-semibold text-cloud-white mb-1">
                    {t(selectedEdgeData.labelKey)}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-steel-gray">
                    <span className="font-medium" style={{ color: selectedEdgeData.color }}>{selectedEdgeData.protocol}</span>
                    {selectedEdgeData.bidirectional && <ArrowLeftRight className="w-3 h-3" />}
                    {selectedEdgeData.animated && <Zap className="w-3 h-3 text-amber-warm" />}
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--subtle-bg-2)]">
                  {(() => {
                    const from = ECO_NODES.find(n => n.id === selectedEdgeData.from)!
                    const to = ECO_NODES.find(n => n.id === selectedEdgeData.to)!
                    const FromIcon = ICON_MAP[from.icon] || Brain
                    const ToIcon = ICON_MAP[to.icon] || Brain
                    return (
                      <>
                        <div className="flex items-center gap-1.5">
                          <FromIcon className="w-4 h-4" style={{ color: from.color }} />
                          <span className="text-sm font-medium text-cloud-white">{t(from.labelKey)}</span>
                        </div>
                        {selectedEdgeData.bidirectional ? (
                          <ArrowLeftRight className="w-4 h-4 text-steel-gray" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-steel-gray" />
                        )}
                        <div className="flex items-center gap-1.5">
                          <ToIcon className="w-4 h-4" style={{ color: to.color }} />
                          <span className="text-sm font-medium text-cloud-white">{t(to.labelKey)}</span>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
