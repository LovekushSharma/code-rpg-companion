type InputProps = {
  label: string
  name: string
  value: string
  placeholder?: string
  type?: "text" | "number" | "url" | "textarea" | "password"
  onChange: (e: any) => void
}

export const InputField = ({
  label,
  name,
  value,
  placeholder,
  type = "text",
  onChange
}: InputProps) => {
  const baseClass =
    "plasmo-w-full plasmo-bg-skin-card plasmo-border plasmo-border-slate-700 plasmo-rounded plasmo-p-2 plasmo-text-sm plasmo-text-skin-text plasmo-outline-none plasmo-transition-colors"
  const focusClass = "focus:plasmo-border-skin-accent"

  return (
    <div className="plasmo-mb-3">
      <label className="plasmo-block plasmo-text-xs plasmo-font-bold plasmo-uppercase plasmo-text-slate-500 plasmo-mb-1 plasmo-block">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`${baseClass} ${focusClass}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`${baseClass} ${focusClass}`}
        />
      )}
    </div>
  )
}
