import { skillTreeData } from "../../data/skill-tree"
import type { NodeStats, UserStats } from "./types"

export const createEmptyNode = (id: string): NodeStats => ({
  id,
  sequence: 9, // Apprentice
  xp: 0,
  corruption: 0,
  lastPracticed: 0, // Never
  totalSolved: 0,
  bestSpeed: 0,
  isStale: false
})

export const generateDefaultStats = (
  username: string = "Traveler"
): UserStats => {
  const nodes: Record<string, NodeStats> = {}

  // Initialize all nodes from the tree data
  skillTreeData.forEach((node) => {
    nodes[node.id] = createEmptyNode(node.id)
  })

  return {
    username,
    lastSync: Date.now(),
    nodes
  }
}
