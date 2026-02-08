import { useEffect, useState } from "react"

import { InputField } from "../components/InputField"

const AISettings = () => {
  const [config, setConfig] = useState({
    provider: "openai",
    apiKey: "",
    model: "gpt-4o-mini"
  })
  const [status, setStatus] = useState("")
  useEffect(() => {
    chrome.storage.sync.get(["aiConfig"], (result) => {
      if (result.aiConfig) setConfig(result.aiConfig)
    })
  }, [])
  const handleSave = () => {
    setStatus("Saving...")
    chrome.storage.sync.set({ aiConfig: config }, () => {
      setStatus("✅ AI Configuration Saved!")
      setTimeout(() => setStatus(""), 2000)
    })
  }

  return (
    <div className="plasmo-space-y-6">
      <div className="plasmo-border-b plasmo-pb-4">
        <h2 className="plasmo-text-xl plasmo-font-bold plasmo-text-skin-accent plasmo-mb-1">
          AI Settings
        </h2>
        <p className="plasmo-text-xs plasmo-text-slate-500 plasmo-mb-2">
          Configure your coding coach.
        </p>
      </div>
      <div className="plasmo-space-y-4">
        <div>
          <label className="plasmo-text-xs plasmo-font-bold plasmo-uppercase plasmo-text-slate-500 plasmo-block plasmo-mb-1">
            Provider
          </label>
          <select
            className="plasmo-w-full plasmo-bg-skin-card plasmo-border border-slate-700 rounded plasmo-p-2 plasmo-text-sm"
            value={config.provider}
            onChange={(e) =>
              setConfig({ ...config, provider: e.target.value })
            }>
            <option value="openai">OpenAI</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>
        <InputField
          label="API Key"
          name="apiKey"
          type="password"
          value={config.apiKey}
          placeholder="sk-..."
          onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
        />

        <InputField
          label="Model Name"
          name="model"
          value={config.model}
          placeholder="gpt-4o-mini"
          onChange={(e) => setConfig({ ...config, model: e.target.value })}
        />
      </div>
      <button
        onClick={handleSave}
        className="plasmo-w-full plasmo-bg-purple-600 hover:bg-purple-500 plasmo-text-white plasmo-font-bold plasmo-py-2 plasmo-px-4 plasmo-rounded plasmo-transition-colors">
        Save Configuration
      </button>
      {status && (
        <p className="text-center text-emerald-400 text-sm">{status}</p>
      )}
    </div>
  )
}
export default AISettings
