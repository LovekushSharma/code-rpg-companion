import type { NodeStats } from "./storage/types"

interface EngineInput {
  currentStats: NodeStats
  aiScore: number // 0-100 (Authority Factor)
  difficulty: "Easy" | "Medium" | "Hard"
  
}
