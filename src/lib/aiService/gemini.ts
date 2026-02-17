import type { AIAnalysisResult, AIService } from "./ai"
import { generateMasterPrompt,generateUserPrompt } from "./ai";
class GeminiAIService implements AIService {
  model: string
  apiKey: string

  constructor(model: string, apiKey: string) {
    this.model = model
    this.apiKey = apiKey
  }

  async AICodeAnalysis(
    code: string,
    problemTitle: string,
    problemDesc: string,
    currentSequence: number = 9 // Default to Level 1 (Beginner)
  ): Promise<AIAnalysisResult> {
    const prompt = generateMasterPrompt(currentSequence)+generateUserPrompt(code, problemTitle, problemDesc);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const err = await response.json()
      console.error("AI API Error:", err)
      throw new Error(err.error?.message || "AI Request Failed")
    }

    const rawText = await response.text()
    if (!rawText) {
      throw new Error("API returned empty response")
    }

    const data = JSON.parse(rawText)
    const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiResponseText) {
      throw new Error("Gemini response structure was unexpected.")
    }

    // 4. Clean up Markdown if Gemini adds ```json ... ```
    const cleanJson = aiResponseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(cleanJson)
  }
}
export { GeminiAIService }
