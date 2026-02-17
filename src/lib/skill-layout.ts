import { debugPort } from "process"
import dagre from "dagre"
import { Position } from "reactflow"

import { skillTreeData, type SkillNode } from "../data/skill-tree"

const NODE_WIDTH = 180
const NODE_HEIGHT = 100

//Helper: Color mapping for categories
export const CATEGORY_COLORS: Record<string, string> = {
  math: "#3b82f6", // Blue
  ds: "#10b981", // Emerald
  algo: "#f59e0b", // Amber
  pattern: "#6366f1", // Indigo
  graph: "#8b5cf6", // Violet
  dp: "#f43f5e", // Rose
  string: "#06b6d4", // Cyan
  advanced: "#d946ef" // Fuchsia
}
// import dagre from "dagre"
// import { Position } from "reactflow"

// import { skillTreeData, type SkillNode } from "../data/skill-tree"

// // Define the size of our "Stars"
// const NODE_WIDTH = 180
// const NODE_HEIGHT = 100

// // Helper: Color mapping for categories
// export const CATEGORY_COLORS: Record<string, string> = {
//   math: "#3b82f6", // Blue
//   ds: "#10b981", // Emerald
//   algo: "#f59e0b", // Amber
//   pattern: "#6366f1", // Indigo
//   graph: "#8b5cf6", // Violet
//   dp: "#f43f5e", // Rose
//   string: "#06b6d4", // Cyan
//   advanced: "#d946ef" // Fuchsia
// }

// export const getLayoutElements = (userStats: any) => {
//   const dagreGraph = new dagre.graphlib.Graph()
//   dagreGraph.setDefaultEdgeLabel(() => ({}))

//   // Set direction: Top to Bottom
//   dagreGraph.setGraph({ rankdir: "TB", ranksep: 150, nodesep: 50 })

//   // 1. Create Nodes & Edges for Dagre
//   skillTreeData.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
//   })

//   const edges: any[] = []
//   skillTreeData.forEach((node) => {
//     node.dependencies.forEach((depId) => {
//       dagreGraph.setEdge(depId, node.id)
//       edges.push({
//         id: `${depId}-${node.id}`,
//         source: depId,
//         target: node.id,
//         animated: true,
//         style: { stroke: "#334155", strokeWidth: 2 }, // Dark grey initially
//         type: "smoothstep"
//       })
//     })
//   })

//   // 2. Calculate Layout
//   dagre.layout(dagreGraph)

//   // 3. Create React Flow Nodes with "Fog of War" Logic
//   const nodes = skillTreeData.map((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id)

//     // --- STATUS LOGIC ---
//     // Check if parents are mastered (mock logic for now)
//     // In real app, check userStats[depId].level >= 1
//     const parents = node.dependencies

//     // Logic: Unlocked if ALL dependencies are met
//     // For MVP: If stats has entry for parents, we consider them "met"
//     // Root nodes (tier 1) are always unlocked
//     let status: "locked" | "unlocked" | "mastered" = "locked"

//     if (node.tier === 1) {
//       status = "unlocked"
//     } else {
//       const allParentsMet = parents.every(
//         (pid) => userStats?.topics?.[pid]?.count > 0
//       )
//       if (allParentsMet) status = "unlocked"
//     }

//     // Check if current node is started
//     const userProgress = userStats?.topics?.[node.id]
//     if (userProgress?.count > 0) {
//       status = userProgress.level >= 5 ? "mastered" : "active"
//     }

//     return {
//       id: node.id,
//       type: "cosmicNode", // We will build this custom component next
//       position: {
//         x: nodeWithPosition.x - NODE_WIDTH / 2,
//         y: nodeWithPosition.y - NODE_HEIGHT / 2
//       },
//       data: {
//         ...node,
//         status,
//         progress: userProgress || { count: 0, level: 0 }
//       }
//     }
//   })

//   return { nodes, edges }
// }
