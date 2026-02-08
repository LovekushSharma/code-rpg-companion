import { InputField } from "../components/InputField"
import { useQuestForm } from "../hooks/useQuestForm"

export const QuestForm = () => {
  const {
    formData,
    handleChange,
    saveQuest,
    isSaving,
    analyse,
    aiResult,
    isAnalysing
  } = useQuestForm()

  return (
    <div className="plasmo-w-full plasmo-h-screen plasmo-bg-skin-base plasmo-text-skin-text plasmo-p-4 plasmo-font-sans plasmo-overflow-y-auto">
      <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-mb-6 plasmo-border-b plasmo-border-slate-700 plasmo-pb-4">
        <div>
          <h1 className="plasmo-text-xl plasmo-font-bold plasmo-text-skin-accent">
            ⚔️ Code RPG
          </h1>
          <p className="plasmo-text-xs plasmo-opacity-60">
            Level placeholder get from storage
          </p>
        </div>
      </div>
      <div className="plasmo-space-y-2">
        <InputField
          label="Quest Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <InputField
          label="Problem URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
        <InputField
          type="textarea"
          label="Problem Description"
          name="problemDesc"
          value={formData.problemDesc}
          placeholder="Paste the problem description here ..."
          onChange={handleChange}
        />
        <div className="plasmo-flex plasmo-gap-2">
          <div className="plasmo-w-1/2">
            <label className="plasmo-text-xs plasmo-font-bold plasmo-uppercase plasmo-text-slate-500 plasmo-mb-1">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="plasmo-w-full plasmo-bg-skin-card plasmo-border plasmo-border-slate-700 plasmo-rounded plasmo-p-2 plasmo-text-sm plasmo-focus:border-skin-accent plasmo-outline-none">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="plasmo-w-1/2">
            <InputField
              type="number"
              label="Time Taken (mins)"
              name="timeTaken"
              value={formData.timeTaken}
              onChange={handleChange}
            />
          </div>
        </div>
        <InputField
          type="textarea"
          label="Code Solution"
          name="code"
          value={formData.code}
          placeholder="Paste code"
          onChange={handleChange}
        />
        <InputField
          type="textarea"
          label="Reflectons"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        {/* ai analysis section */}

        <div className="plasmo-border-t plasmo-border-slate-700 plasmo-pt-4">
          {!aiResult ? (
            <button
              onClick={analyse}
              disabled={isAnalysing}
              className="plasmo-w-full plasmo-bg-purple-600 hover:plasmo-bg-purple-500 disabled:plasmo-bg-slate-700 plasmo-text-white plasmo-font-bold plasmo-py-2 plasmo-rounded plasmo-transition-all plasmo-shadow-lg">
              {isAnalysing ? "🔮 Consulting the Oracle..." : "🧙‍♂️ Analyze Code"}
            </button>
          ) : (
            <div className="plasmo-bg-slate-800 plasmo-border plasmo-border-emerald-500/50 plasmo-rounded plasmo-p-3 plasmo-animate-fade-in">
              <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-mb-2">
                <span className="plasmo-font-bold plasmo-text-emerald-400">
                  Analysis Complete
                </span>
                <span className="plasmo-text-xs plasmo-bg-emerald-900 plasmo-text-emerald-200 plasmo-px-2 plasmo-py-1 plasmo-rounded-full">
                  Score: {aiResult.efficiency_score}/100
                </span>
              </div>
              <div className="plasmo-grid plasmo-grid-cols-2 plasmo-gap-2 plasmo-mb-2 plasmo-text-xs">
                <div className="plasmo-bg-slate-900 plasmo-p-2 plasmo-rounded">
                  <span className="plasmo-text-slate-400">Complexity:</span>
                  <div className="plasmo-font-mono plasmo-text-orange-300">
                    {aiResult.complexity}
                  </div>
                </div>
                <div className="plasmo-bg-slate-900 plasmo-p-2 plasmo-rounded">
                  <span className="plasmo-text-slate-400">Topics:</span>
                  <div className="plasmo-text-blue-300">
                    {aiResult.topics.join(", ")}
                  </div>
                </div>
              </div>

              <p className="plasmo-text-sm plasmo-text-slate-300 plasmo-italic border-l-2 border-emerald-500 pl-2">
                "{aiResult.feedback}"
              </p>

              <button
                onClick={analyse}
                className="plasmo-text-[10px] plasmo-text-slate-500 plasmo-mt-2 plasmo-underline hover:plasmo-text-slate-300">
                Re-analyze
              </button>
            </div>
          )}
        </div>

        <div className="plasmo-pt-4 plasmo-flex plasmo-gap-2">
          <button
            onClick={saveQuest}
            className="plasmo-flex-1 plasmo-bg-skin-accent plasmo-text-skin-base plasmo-font-bold plasmo-py-2 plasmo-px-4 plasmo-rounded hover:plasmo-opacity-90 plasmo-transition-opacity">
            {isSaving ? "💾 Saving..." : "💾 Save to Quest Log"}
          </button>
        </div>
      </div>
    </div>
  )
}
