'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import type { ArchitectureData, ServiceMetrics } from '@/lib/types'
import { NODE_POSITIONS } from '@/lib/graph-config'
import { getCategoryColor } from '@/lib/utils'
import { ServiceNode } from './service-node'
import { DataFlowEdge } from './data-flow-edge'
import { ServiceDetailPanel } from './service-detail-panel'

interface ArchitectureGraphProps {
  data: ArchitectureData
}

const nodeTypes = { service: ServiceNode }
const edgeTypes = { dataflow: DataFlowEdge }

export function ArchitectureGraph({ data }: ArchitectureGraphProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)

  const nodes: Node[] = useMemo(
    () =>
      data.services.map((service) => ({
        id: service.id,
        type: 'service',
        position: NODE_POSITIONS[service.id] || { x: 0, y: 0 },
        data: {
          metrics: service,
          selected: service.id === selectedServiceId,
        },
      })),
    [data.services, selectedServiceId]
  )

  const edges: Edge[] = useMemo(
    () =>
      data.flows.map((flow) => ({
        id: flow.id,
        source: flow.source,
        target: flow.target,
        type: 'dataflow',
        data: {
          label: flow.label,
          protocol: flow.protocol,
          animated: flow.animated,
        },
        selected: flow.source === selectedServiceId || flow.target === selectedServiceId,
      })),
    [data.flows, selectedServiceId]
  )

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedServiceId((prev) => (prev === node.id ? null : node.id))
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedServiceId(null)
  }, [])

  const selectedService: ServiceMetrics | undefined = useMemo(
    () => data.services.find((s) => s.id === selectedServiceId),
    [data.services, selectedServiceId]
  )

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ type: 'dataflow' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="var(--subtle-bg-2)"
        />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(node) => {
            const metrics = (node.data as { metrics: ServiceMetrics }).metrics
            return getCategoryColor(metrics.category)
          }}
          maskColor="var(--overlay-bg)"
          style={{ borderRadius: '0.75rem' }}
        />
      </ReactFlow>

      <ServiceDetailPanel
        service={selectedService ?? null}
        flows={data.flows}
        onClose={() => setSelectedServiceId(null)}
      />
    </div>
  )
}
