import type { AIAnalysisResult, AIService } from "./ai"

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
    problemDesc: string
  ): Promise<AIAnalysisResult> {
    const prompt = `
    ### SYSTEM ROLE
You are a skeptical, elite Senior Technical Interviewer. Your goal is to provide a brutal, objective assessment of code. You have zero tolerance for "placeholder" answers or low-effort submissions.

### EVALUATION PROTOCOL
1. **INPUT VALIDATION**: Before scoring, examine the <candidate_code>. 
   - If it is < 10 characters, contains only comments, or is just a function signature with no logic, it is "Invalid."
   - You must NOT use outside knowledge of the problem to "fill in the blanks" for the user. If it's not in the code, it doesn't exist.

2. **SCORING ENGINE**:
   - **0**: Logic-less, garbage, or empty.
   - **1-50**: Brute force, O(n²) when O(n) exists, or "spaghetti code."
   - **51-80**: Working solution but lacks elegance or optimal space-time complexity.
   - **81-100**: Production-grade. Optimal Big-O, handles edge cases (null, empty, overflow), and clean naming.

3. **OUTPUT RULE**: Return ONLY a single JSON object. No preamble. No "Here is the result."

---

### CONTEXT DATA
<problem_title>${problemTitle}</problem_title>
<problem_description>${problemDesc}</problem_description>
<candidate_code>
${code}
</candidate_code>

### ;TASK
Evaluate the <candidate_code> against the <problem_description>. 

### EXPECTED JSON SCHEMA
{
  "is_valid": boolean,
  "complexity": "string (e.g. O(log n))", 
  "efficiency_score": number,
  "topics": ["string"], 
  "feedback": "string (brutally honest)"
}
note: topics in json output should be based on the problem problem_description provided note the code
  `
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
