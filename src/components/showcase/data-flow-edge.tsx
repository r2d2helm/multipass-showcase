'use client'

import { memo } from 'react'
import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react'

const PROTOCOL_COLORS: Record<string, string> = {
  https: '#00D4FF',
  http: '#00D4FF',
  pg: '#4ADE80',
  tcp: '#FBBF24',
  ws: '#8B5CF6',
}

function DataFlowEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  const edgeData = data as { label?: string; protocol?: string; animated?: boolean } | undefined
  const isAnimated = edgeData?.animated ?? false
  const protocol = edgeData?.protocol ?? 'http'
  const color = PROTOCOL_COLORS[protocol] || '#64748B'

  const baseOpacity = selected ? 1 : 0.35
  const strokeWidth = selected ? 2.5 : 1
  const particleRadius = selected ? 4 : 2.5

  return (
    <>
      {/* Glow layer for selected edges */}
      {selected && (
        <BaseEdge
          id={`${id}-glow`}
          path={edgePath}
          style={{
            stroke: color,
            strokeWidth: 6,
            opacity: 0.15,
            filter: 'blur(4px)',
          }}
        />
      )}

      {/* Main edge line */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: color,
          strokeWidth,
          opacity: baseOpacity,
        }}
      />

      {/* Animated particles — staggered for flow effect */}
      {isAnimated && (
        <g>
          {/* Primary particle */}
          <circle r={particleRadius} fill={color} opacity={selected ? 0.95 : 0.7}>
            <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
          </circle>
          {/* Secondary particle — offset by 1/3 */}
          <circle r={particleRadius * 0.7} fill={color} opacity={selected ? 0.7 : 0.45}>
            <animateMotion dur="3s" begin="-1s" repeatCount="indefinite" path={edgePath} />
          </circle>
          {/* Tertiary particle — offset by 2/3, smallest */}
          <circle r={particleRadius * 0.45} fill={color} opacity={selected ? 0.5 : 0.3}>
            <animateMotion dur="3s" begin="-2s" repeatCount="indefinite" path={edgePath} />
          </circle>

          {/* Glow halos on particles when selected */}
          {selected && (
            <>
              <circle r={particleRadius * 2.5} fill={color} opacity={0.12}>
                <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
              </circle>
              <circle r={particleRadius * 2} fill={color} opacity={0.08}>
                <animateMotion dur="3s" begin="-1s" repeatCount="indefinite" path={edgePath} />
              </circle>
            </>
          )}
        </g>
      )}

      {/* Protocol label on selected edges */}
      {selected && edgeData?.label && (
        <text dy={-8}>
          <textPath
            href={`#${id}`}
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="text-before-edge"
            style={{
              fontSize: 10,
              fill: color,
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
          >
            {edgeData.label}
          </textPath>
        </text>
      )}
    </>
  )
}

export const DataFlowEdge = memo(DataFlowEdgeComponent)
