// import { useCallback, useEffect, useMemo } from "react"
// import ReactFlow, {
//   Background,
//   ConnectionLineType,
//   Controls,
//   useEdgesState,
//   useNodesState
// } from "reactflow"
// import type { Edge } from "reactflow"

// import "reactflow/dist/style.css" // Import styles!

// import StarNode from "../components/skillTree/StarNode"
// import { skillTreeData } from "../data/skill-tree"
// import { getLayoutedElements } from "../lib/layout"

// // --- MOCK USER STATS (We will replace this with GitHub data later) ---
// const MOCK_USER_STATS = {
//   arrays_basics: { sequence: 6, xp: 80, lastPracticed: Date.now() },
//   hash_maps: { sequence: 7, xp: 40, lastPracticed: Date.now() },
//   two_pointers: {
//     sequence: 9,
//     xp: 10,
//     lastPracticed: Date.now() - 1000 * 60 * 60 * 24 * 20
//   } // 20 days old (Stale!)
// }

// // 1. Define Node Types
// const nodeTypes = {
//   star: StarNode
// }

// const SkillTree = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([])
//   const [edges, setEdges, onEdgesChange] = useEdgesState([])

//   // 2. Initial Data Processing
//   useEffect(() => {
//     // A. Generate Nodes from Static Data
//     const initialNodes = skillTreeData.map((nodeData) => {
//       const userStat = MOCK_USER_STATS[nodeData.id]
//       const isUnlocked =
//         userStat ||
//         nodeData.dependencies.length === 0 ||
//         nodeData.dependencies.some((dep) => MOCK_USER_STATS[dep])

//       // Calculate "Staleness" (Unshadowed Cross)
//       const daysSincePractice = userStat
//         ? (Date.now() - userStat.lastPracticed) / (1000 * 60 * 60 * 24)
//         : 0
//       const isStale = daysSincePractice > 14

//       return {
//         id: nodeData.id,
//         type: "star", // Use our Custom Component
//         data: {
//           label: nodeData.label,
//           category: nodeData.mainCategory,
//           sequence: userStat ? userStat.sequence : 9,
//           xp: userStat ? userStat.xp : 0,
//           isLocked: !isUnlocked,
//           isStale: isStale
//         },
//         position: { x: 0, y: 0 } // Layout engine will fix this
//       }
//     })

//     // B. Generate Edges
//     const initialEdges: Edge[] = []
//     skillTreeData.forEach((node) => {
//       node.dependencies.forEach((depId) => {
//         const isSourceUnlocked =
//           initialNodes.find((n) => n.id === depId)?.data.isLocked === false

//         initialEdges.push({
//           id: `${depId}-${node.id}`,
//           source: depId,
//           target: node.id,
//           type: "default",
//           animated: isSourceUnlocked, // Animate line if path is active
//           style: {
//             stroke: isSourceUnlocked ? "#38bdf8" : "#334155", // Cyan vs Slate
//             strokeWidth: isSourceUnlocked ? 2 : 1,
//             opacity: 0.6
//           }
//         })
//       })
//     })

//     // C. Apply Auto-Layout
//     const layout = getLayoutedElements(initialNodes, initialEdges)
//     setNodes(layout.nodes)
//     setEdges(layout.edges)
//   }, [])

//   return (
//     <div className="w-full h-full bg-[#090A0F] relative overflow-hidden">
//       {/* Background Ambience (Nebula) */}
//       <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#000000_100%)] opacity-80" />

//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         nodeTypes={nodeTypes}
//         fitView
//         minZoom={0.2}
//         className="w-full h-full">
//         <Background color="#334155" gap={50} size={1} />
//         <Controls className="!bg-slate-800 !border-slate-700 !fill-white" />
//       </ReactFlow>

//       {/* Overlay Title */}
//       <div className="absolute top-4 left-4 pointer-events-none">
//         <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 filter drop-shadow-lg">
//           Stellar Ascension
//         </h1>
//         <p className="text-xs text-slate-400">Sequence 9: Stardust Drifter</p>
//       </div>
//     </div>
//   )
// }

// export default SkillTree
// import { useEffect } from "react"
// import ReactFlow, {
//   Background,
//   Controls,
//   useEdgesState,
//   useNodesState,
//   type Edge
// } from "reactflow"

// import "reactflow/dist/style.css"

// import StarNode from "../components/skillTree/StarNode"
// import { skillTreeData } from "../data/skill-tree"
// import { getLayoutedElements } from "../lib/layout"

// // --- MOCK USER STATS ---
// const MOCK_USER_STATS = {
//   arrays_basics: { sequence: 6, xp: 80, lastPracticed: Date.now() },
//   hash_maps: { sequence: 7, xp: 40, lastPracticed: Date.now() },
//   two_pointers: {
//     sequence: 9,
//     xp: 10,
//     lastPracticed: Date.now() - 1000 * 60 * 60 * 24 * 20
//   }
// }

// const nodeTypes = {
//   star: StarNode
// }

// const SkillTree = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([])
//   const [edges, setEdges, onEdgesChange] = useEdgesState([])

//   useEffect(() => {
//     // A. Nodes
//     const initialNodes = skillTreeData.map((nodeData) => {
//       const userStat = MOCK_USER_STATS[nodeData.id]
//       const isUnlocked =
//         userStat ||
//         nodeData.dependencies.length === 0 ||
//         nodeData.dependencies.some((dep) => MOCK_USER_STATS[dep])

//       const daysSincePractice = userStat
//         ? (Date.now() - userStat.lastPracticed) / (1000 * 60 * 60 * 24)
//         : 0
//       const isStale = daysSincePractice > 14

//       return {
//         id: nodeData.id,
//         type: "star",
//         data: {
//           label: nodeData.label,
//           category: nodeData.mainCategory,
//           sequence: userStat ? userStat.sequence : 9,
//           xp: userStat ? userStat.xp : 0,
//           isLocked: !isUnlocked,
//           isStale: isStale
//         },
//         position: { x: 0, y: 0 }
//       }
//     })

//     // B. Edges
//     const initialEdges: Edge[] = []
//     skillTreeData.forEach((node) => {
//       node.dependencies.forEach((depId) => {
//         const isSourceUnlocked =
//           initialNodes.find((n) => n.id === depId)?.data.isLocked === false

//         initialEdges.push({
//           id: `${depId}-${node.id}`,
//           source: depId,
//           target: node.id,
//           type: "default",
//           animated: isSourceUnlocked,
//           style: {
//             stroke: isSourceUnlocked ? "#38bdf8" : "#334155",
//             strokeWidth: isSourceUnlocked ? 2 : 1,
//             opacity: 0.6
//           }
//         })
//       })
//     })

//     // C. Layout
//     const layout = getLayoutedElements(initialNodes, initialEdges)
//     setNodes(layout.nodes)
//     setEdges(layout.edges)
//   }, [])

//   return (
//     // CRITICAL FIX:
//     // 'absolute inset-0' forces this div to fill the 'relative' parent in SidePanel.
//     // This gives React Flow the explicit height it demands.
//     <div className="plasmo-absolute plasmo-inset-0 plasmo-w-full plasmo-h-full plasmo-bg-[#090A0F]">
//       {/* Background Nebula */}
//       <div className="plasmo-absolute plasmo-inset-0 plasmo-pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#000000_100%)] plasmo-opacity-80" />

//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         nodeTypes={nodeTypes}
//         fitView
//         minZoom={0.1}
//         maxZoom={1.5}
//         className="w-full h-full">
//         <Background color="#334155" gap={50} size={1} />

//         <Controls
//           className="!bg-slate-800 !border-slate-700 !fill-white"
//           position="bottom-right"
//         />
//       </ReactFlow>

//       {/* Title Overlay */}
//       <div className="absolute top-4 left-4 pointer-events-none z-10">
//         <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 filter drop-shadow-lg">
//           Stellar Ascension
//         </h1>
//         <p className="text-xs text-slate-400">Sequence 9: Stardust Drifter</p>
//       </div>
//     </div>
//   )
// }

// export default SkillTree
import { useEffect, useMemo } from "react"
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  type Edge
} from "reactflow"

import "reactflow/dist/style.css"

import StarNode from "../components/skillTree/StarNode"
import { skillTreeData } from "../data/skill-tree"
import { getLayoutedElements } from "../lib/layout"

// --- MOCK USER STATS ---
const MOCK_USER_STATS = {
  arrays_basics: { sequence: 6, xp: 80, lastPracticed: Date.now() },
  hash_maps: { sequence: 7, xp: 40, lastPracticed: Date.now() },
  two_pointers: {
    sequence: 9,
    xp: 10,
    lastPracticed: Date.now() - 1000 * 60 * 60 * 24 * 20
  }
}

// Define nodeTypes OUTSIDE the component
const nodeTypes = {
  star: StarNode
}

const SkillTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    // A. Nodes
    const initialNodes = skillTreeData.map((nodeData) => {
      const userStat = MOCK_USER_STATS[nodeData.id]
      const isUnlocked =
        userStat ||
        nodeData.dependencies.length === 0 ||
        nodeData.dependencies.some((dep) => MOCK_USER_STATS[dep])

      const daysSincePractice = userStat
        ? (Date.now() - userStat.lastPracticed) / (1000 * 60 * 60 * 24)
        : 0
      const isStale = daysSincePractice > 14

      return {
        id: nodeData.id,
        type: "star",
        data: {
          label: nodeData.label,
          category: nodeData.mainCategory,
          sequence: userStat ? userStat.sequence : 9,
          xp: userStat ? userStat.xp : 0,
          isLocked: !isUnlocked,
          isStale: isStale
        },
        position: { x: 0, y: 0 }
      }
    })

    // B. Edges
    const initialEdges: Edge[] = []
    skillTreeData.forEach((node) => {
      node.dependencies.forEach((depId) => {
        const isSourceUnlocked =
          initialNodes.find((n) => n.id === depId)?.data.isLocked === false

        initialEdges.push({
          id: `${depId}-${node.id}`,
          source: depId,
          target: node.id,
          type: "default",
          animated: isSourceUnlocked,
          style: {
            stroke: isSourceUnlocked ? "#38bdf8" : "#334155",
            strokeWidth: isSourceUnlocked ? 2 : 1,
            opacity: 0.6
          }
        })
      })
    })

    // C. Layout
    const layout = getLayoutedElements(initialNodes, initialEdges)
    setNodes(layout.nodes)
    setEdges(layout.edges)
  }, [])

  return (
    // FIX 1: Applied plasmo- prefix to outer container
    <div className="plasmo-absolute plasmo-inset-0 plasmo-w-full plasmo-h-full plasmo-bg-[#090A0F]">
      {/* Background Nebula */}
      {/* FIX 2: Applied plasmo- prefix to overlay styles */}
      <div className="plasmo-absolute plasmo-inset-0 plasmo-pointer-events-none plasmo-bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#000000_100%)] plasmo-opacity-80" />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        // FIX 3: Applied plasmo- prefix to ReactFlow container
        className="plasmo-w-full plasmo-h-full">
        <Background color="#334155" gap={50} size={1} />

        <Controls
          // FIX 4: Applied plasmo- prefix to Controls styles
          className="!plasmo-bg-slate-800 !plasmo-border-slate-700 !plasmo-fill-white"
          position="bottom-right"
        />
      </ReactFlow>

      {/* Title Overlay */}
      {/* FIX 5: Applied plasmo- prefix to all title/text styles */}
      <div className="plasmo-absolute plasmo-top-4 plasmo-left-4 plasmo-pointer-events-none plasmo-z-10">
        <h1 className="plasmo-text-xl plasmo-font-bold plasmo-text-transparent plasmo-bg-clip-text plasmo-bg-gradient-to-r plasmo-from-cyan-400 plasmo-to-purple-500 plasmo-filter plasmo-drop-shadow-lg">
          Stellar Ascension
        </h1>
        <p className="plasmo-text-xs plasmo-text-slate-400">
          Sequence 9: Stardust Drifter
        </p>
      </div>
    </div>
  )
}

export default SkillTree
