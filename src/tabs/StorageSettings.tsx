import { useEffect, useState } from "react"

import { InputField } from "../components/InputField" 

const StorageSettings = () => {
  const [config, setConfig] = useState({
    githubToken: "",
    githubOwner: "", // e.g., "yourusername"
    githubRepo: "" // e.g., "leetcode-mastery"
  })
  const [status, setStatus] = useState("")

  // Load saved settings on mount
  useEffect(() => {
    chrome.storage.sync.get(
      ["githubToken", "githubOwner", "githubRepo"],
      (result) => {
        if (result.githubToken) {
          setConfig({
            githubToken: result.githubToken,
            githubOwner: result.githubOwner || "",
            githubRepo: result.githubRepo || ""
          })
        }
      }
    )
  }, [])

  const handleSave = () => {
    setStatus("Saving...")
    chrome.storage.sync.set(config, () => {
      setStatus("✅ Settings Saved!")
      setTimeout(() => setStatus(""), 2000)
    })
  }

  const handleChange = (e: any) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  return (
    <div className="plasmo-space-y-6 plasmo-bg-skin-base plasmo-p-4 plasmo-rounded">
      <div className="plasmo-border-b plasmo-border-skin-border plasmo-pb-4 plasmo-relative">
        <h2 className="plasmo-text-xl plasmo-font-bold plasmo-text-skin-accent plasmo-mb-1">
          Cloud Storage
        </h2>
        <p className="plasmo-text-xs plasmo-text-slate-500 plasmo-mb-2">
          Connect your GitHub Repository
        </p>
        {/* Theme fixed to Space theme; selector removed */}
      </div>

      <div className="plasmo-space-y-4">
        <InputField
          label="GitHub Username"
          name="githubOwner"
          value={config.githubOwner}
          placeholder="e.g. johndoe"
          onChange={handleChange}
        />

        <InputField
          label="Repository Name"
          name="githubRepo"
          value={config.githubRepo}
          placeholder="e.g. leetcode-tracker"
          onChange={handleChange}
        />

        <InputField
          label="Personal Access Token"
          name="githubToken"
          value={config.githubToken}
          type="password" // Assuming you update InputField to support password type
          placeholder="ghp_xxxxxxxxxxxx"
          onChange={handleChange}
        />
        <p className="plasmo-text-[10px] plasmo-text-slate-500">
          * Needs "repo" scope permission.
          <br></br>* Need to create gitrepo before connecting, the extension
          will create a folder named `problems/` in your repo.
        </p>
      </div>

      <button
        onClick={handleSave}
        className="plasmo-w-full plasmo-bg-blue-600 hover:plasmo-bg-blue-500 plasmo-text-white plasmo-font-bold plasmo-py-2 plasmo-px-4 plasmo-rounded">
        Save Connection
      </button>

      {status && (
        <p className="plasmo-text-center plasmo-text-emerald-400 plasmo-text-sm">
          {status}
        </p>
      )}
    </div>
  )
}

export default StorageSettings
