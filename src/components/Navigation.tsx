import { Database, Home, Map, Settings } from "lucide-react"

interface NavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const Navigation = ({ activeTab, onTabChange }: NavProps) => {
  const tabs = [
    { id: "form", icon: Home, label: "Quests" },
    { id: "map", icon: Map, label: "Skill Tree" },
    { id: "ai", icon: Settings, label: "AI Config" },
    { id: "storage", icon: Database, label: "Storage setting" }
  ]
  return (
    <div className="plasmo-fixed plasmo-bottom-0 plasmo-left-0 plasmo-w-full plasmo-bg-skin-base plasmo-border-skin-border plasmo-flex plasmo-justify-around">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`plasmo-flex plasmo-flex-col plasmo-items-center plasmo-p-2 plasmo-rounded plasmo-transition-colors ${activeTab === tab.id ? "plasmo-text-skin-accent" : "plasmo-bg-slate-500 hover:plasmo-text-slate-300"}`}>
          <tab.icon size={20} className="plasmo-mb-1" />
          <span className="plasmo-text-[10px] plasmo-mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
