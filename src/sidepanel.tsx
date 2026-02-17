import React, { useState } from "react"

import { Navigation } from "./components/Navigation"
import AISettings from "./tabs/AISettings"
import { QuestForm } from "./tabs/QuestForm"
import SkillTreeTab from "./tabs/SkillTree"
import StorageSettings from "./tabs/StorageSettings"

import "./styles/global.css"

function SidePanel() {
  const [activeTab, setActiveTab] = useState("map") // Default to map for testing

  const renderContent = () => {
    switch (activeTab) {
      case "form":
        return <QuestForm />
      case "storage":
        return <StorageSettings />
      case "ai":
        return <AISettings />
      case "map":
        return <SkillTreeTab />
      default:
        return <QuestForm />
    }
  }

  // Helper boolean
  const isMapTab = activeTab === "map"

  return (
    <div className="plasmo-w-full plasmo-h-screen plasmo-bg-skin-base plasmo-text-skin-text plasmo-flex plasmo-flex-col plasmo-font-sans">
      {/* 
         CRITICAL CSS FIX:
         1. plasmo-relative: Needed so the Map's 'absolute' positioning knows where to start.
         2. Conditional Class: 
            - IF MAP: 'plasmo-overflow-hidden' (No scrollbars) and NO padding.
            - IF FORM: 'plasmo-overflow-y-auto' (Scrollable) and Padding.
      */}
      <div
        className={`plasmo-flex-1 plasmo-relative ${
          isMapTab
            ? "plasmo-overflow-hidden plasmo-p-0"
            : "plasmo-overflow-y-auto plasmo-p-4 plasmo-pb-20"
        }`}>
        {renderContent()}
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default SidePanel
