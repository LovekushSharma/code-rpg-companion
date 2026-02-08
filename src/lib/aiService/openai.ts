import type { AIAnalysisResult, AIService } from "./ai"

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
    problemDesc: string
  ): Promise<AIAnalysisResult> {
    const systemPrompt = `
  You are a skeptical Senior Technical Interviewer and LeetCode Judge. 
  Your goal is to provide a brutal, objective assessment of code submissions. 

  CRITICAL VALIDATION RULES:
  1. If the User's Code is empty, contains no logical operations, or is purely non-code text, you MUST set "efficiency_score" to 0 and "is_valid" to false.
  2. Do not "hallucinate" logic. If the user provided a function stub with no implementation, it is a 0.
  3. You must output a strictly valid JSON object.

  SCORING RUBRIC:
  - 90-100: Production-grade. Optimal Big-O, handles edge cases, clean naming.
  - 70-89: Correct approach but sub-optimal space/time or minor cleanliness issues.
  - 40-69: Sub-optimal (e.g., O(n^2) when O(n) is possible) but works.
  - 0-39: Logic errors, incomplete code, or garbage input.

  JSON SCHEMA:
  {
    "is_valid": boolean,
    "complexity": "string (Big O)",
    "efficiency_score": number (0-100),
    "topics": string[],
    "feedback": "string (Actionable, 2-sentence maximum)"
  }
note: topics in json output should be based on the problem problem_description provided note the code
`

    const userPrompt = `
  Analyze the following submission:

  PROBLEM TITLE: ${problemTitle}
  PROBLEM DESCRIPTION: ${problemDesc}
  
  CANDIDATE CODE:
  """
  ${code}
  """
`
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
