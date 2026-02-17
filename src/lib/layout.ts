import dagre from "dagre"
import { Position } from "reactflow"
import type { Edge, Node } from "reactflow"

import { skillTreeData } from "../data/skill-tree"

// Size of the nodes for layout calculation
const NODE_WIDTH = 100
const NODE_HEIGHT = 120

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  // Set Layout Direction: Top-to-Bottom (TB) looks best for "Ascension" themes
  dagreGraph.setGraph({ rankdir: "TB", ranksep: 150, nodesep: 80 })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)

    // Slight random offset to make it look like a constellation, not a perfect grid
    const randomOffset = (Math.random() - 0.5) * 20

    return {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: {
        x: nodeWithPosition.x - NODE_WIDTH / 2 + randomOffset,
        y: nodeWithPosition.y - NODE_HEIGHT / 2
      }
    }
  })

  return { nodes: layoutedNodes, edges }
}
