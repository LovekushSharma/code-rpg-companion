import {
  generateMasterPrompt,
  generateUserPrompt,
  type AIAnalysisResult,
  type AIService
} from "./ai"

class OpenAIService implements AIService {
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
    const systemPrompt = generateMasterPrompt(currentSequence)
    const userPrompt = generateUserPrompt(code, problemTitle, problemDesc)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    })
    if (!response.ok) {
      const err = await response.json()
      console.error("AI API Error:", err)
      throw new Error(err.error?.message || "AI Request Failed")
    }
    const data = await response.json()
    const rawContent = data.choices[0].message.content
    const cleanJson = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
    return JSON.parse(cleanJson)
  }
}
export { OpenAIService }
