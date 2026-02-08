import type { AIService } from "./ai"
import { GeminiAIService } from "./gemini"
import { OpenAIService } from "./openai"

export const getAIService = (config: any): AIService => {
  if (!config || !config.apiKey) {
    throw new Error("AI not configured. Please go to AI Settings tab.")
  }

  switch (config.provider) {
    case "openai":
      return new OpenAIService(config.model || "gpt-4o-mini", config.apiKey)
    case "gemini":
      return new GeminiAIService(
        config.model || "gemini-1.5-flash",
        config.apiKey
      )
    default:
      throw new Error(`Unsupported provider: ${config.provider}`)
  }
}
