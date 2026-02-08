import React from "react"

import { Navigation } from "./components/Navigation"
import { QuestForm } from "./tabs/QuestForm"
import StorageSettings from "./tabs/StorageSettings"

import "./styles/global.css"

import AISettings from "./tabs/AISettings"

function SidePanel() {
  const [activeTab, setActiveTab] = React.useState("Form")
  const renderContent = () => {
    switch (activeTab) {
      case "form":
        return <QuestForm />
      case "storage":
        return <StorageSettings />
      case "ai":
        return <AISettings />
      // case "map":
      //   return <SkillTree />
      default:
        return <QuestForm />
    }
  }
  return (
    <div className="plasmo-w-full plasmo-h-screen plasmo-bg-skin-base plasmo-text-skin-text plasmo-flex plasmo-flex-col plasmo-font-sans">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="plasmo-flex-1 plasmo-overflow-y-auto plasmo-pb-20 plasmo-p-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default SidePanel
