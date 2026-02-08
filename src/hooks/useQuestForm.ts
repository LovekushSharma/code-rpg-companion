import { data } from "autoprefixer"
import { useState } from "react"

import type { AIAnalysisResult, AIService } from "../lib/aiService/ai"
import { getAIService } from "../lib/aiService/factory"
import { pushToGitHub } from "../lib/github"

export const useQuestForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    difficulty: "Easy",
    timeTaken: "",
    problemDesc: "",
    code: "",
    notes: ""
  })
  const [aiResult, setAIResult] = useState<AIAnalysisResult | null>(null)
  const [isAnalysing, setIsAnalysing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const analyse = async () => {
    if (!formData.title || !formData.code || !formData.problemDesc) {
      alert(
        "Please fill in the title, problem description, and code before analysis."
      )
      return
    }
    setIsAnalysing(true)
    try {
      const aiConfig = await chrome.storage.sync.get(["aiConfig"])
      const aiService = getAIService(aiConfig.aiConfig)
      const analysis = await aiService.AICodeAnalysis(
        formData.code,
        formData.title,
        formData.problemDesc
      )
      setAIResult(analysis)
      alert(
        "✅ AI Analysis Completed! Check the AI Analysis section for insights."
      )
    } catch (error: any) {
      alert(`AI Analysis Error: ${error.message}`)
    } finally {
      setIsAnalysing(false)
    }
  }

  const saveQuest = async () => {
    setIsSaving(true)
    try {
      await pushToGitHub(formData)
      alert("🚀 Successfully pushed to GitHub!")
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    formData,
    handleChange,
    saveQuest,
    isSaving,
    analyse,
    aiResult,
    isAnalysing
  }
}
