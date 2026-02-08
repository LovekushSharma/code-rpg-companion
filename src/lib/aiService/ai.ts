export interface AIService {
  model: string
  apiKey: string
  AICodeAnalysis: (
    code: string,
    problemTitle: string,
    problemDesc: string
  ) => Promise<AIAnalysisResult>
}

export interface AIAnalysisResult {
  complexity: string // e.g., "O(n)"
  efficiency_score: number // 0 to 100
  topics: string[] // e.g., ["Two Pointers", "Array"]
  feedback: string // "Great use of a set for O(1) lookups."
}
