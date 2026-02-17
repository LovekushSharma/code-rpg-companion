// src/data/pathways.ts
import type { MainCategory } from "./categories"

export interface PathwayConfig {
  id: MainCategory
  name: string // The Sequence 0 Name (The "God" of this path)
  description: string // The lore flavor text
  color: string // The glow color (Tailwind-friendly hex or var)
  icon: string // Emoji or Lucide icon reference
}

export const PATHWAYS: Record<MainCategory, PathwayConfig> = {
  "Arrays & Hashing": {
    id: "Arrays & Hashing",
    name: "The Architect",
    description:
      "He who lays the foundation of reality, turning chaos into structured memory.",
    color: "#06b6d4", // Cyan-500
    icon: "🏛️"
  },
  "Two Pointers & Window": {
    id: "Two Pointers & Window",
    name: "The Traveler",
    description:
      "Manipulator of space and time, sliding through dimensions to find the perfect frame.",
    color: "#10b981", // Emerald-500
    icon: "⏳"
  },
  "Stack & Queue": {
    id: "Stack & Queue",
    name: "The Arbiter",
    description:
      "The enforcer of order. First In, Last Out. The rules are absolute.",
    color: "#94a3b8", // Slate-400 (Steel)
    icon: "⚖️"
  },
  "Binary Search": {
    id: "Binary Search",
    name: "The Seeker",
    description:
      "The hunter of truth who divides the infinite to find the singular answer.",
    color: "#f43f5e", // Rose-500 (Targeting Laser)
    icon: "🎯"
  },
  Trees: {
    id: "Trees",
    name: "The Planter",
    description:
      "Nurturing the roots of logic, branching endlessly into the fractal cosmos.",
    color: "#84cc16", // Lime-500 (Life)
    icon: "🌳"
  },
  Heaps: {
    id: "Heaps",
    name: "The Monarch",
    description:
      "The ruler of hierarchy. Only the worthy (Top K) may stand at the summit.",
    color: "#eab308", // Yellow-500 (Gold)
    icon: "👑"
  },
  Graphs: {
    id: "Graphs",
    name: "The Navigator",
    description:
      "Chart the star-ocean. Connect the islands of data in the vast void.",
    color: "#3b82f6", // Blue-500 (Deep Sea/Space)
    icon: "🧭"
  },
  "Dynamic Programming": {
    id: "Dynamic Programming",
    name: "The Oracle",
    description:
      "Weaving the threads of fate. Remembering the past to optimize the future.",
    color: "#a855f7", // Purple-500 (Mystic)
    icon: "🔮"
  },
  "Math & Geometry": {
    id: "Math & Geometry",
    name: "The Savant",
    description:
      "The calculator of universal laws. Geometry and Numbers obey his command.",
    color: "#f97316", // Orange-500 (Industrial/Logic)
    icon: "📐"
  },
  "Bit Manipulation": {
    id: "Bit Manipulation",
    name: "The Cipher",
    description:
      "Deconstructing the atomic essence. The manipulator of zeros and ones.",
    color: "#ec4899", // Pink-500 (Neon/Cyber)
    icon: "🧬"
  },
  "Advanced Data Structures": {
    id: "Advanced Data Structures",
    name: "The Archivist",
    description:
      "The keeper of forbidden history. Complex records (Segment Trees) lie here.",
    color: "#d1d5db", // Gray-300 (Ancient Scroll)
    icon: "📜"
  },
  "Advanced Algorithms": {
    id: "Advanced Algorithms",
    name: "The Visionary",
    description:
      "The dreamer of grand systems. Orchestrating flow and complexity.",
    color: "#6366f1", // Indigo-500 (Cosmic Mind)
    icon: "👁️"
  }
}
