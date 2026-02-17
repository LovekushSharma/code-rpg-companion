// import type { MainCategory } from "../data/categories"
// import { PATHWAYS } from "../data/pathways"

// // The "Rarity" Colors for Sequences 9 to 0
// export const SEQUENCE_COLORS: Record<number, string> = {
//   9: "#94a3b8", // Slate (Novice) - Dim
//   8: "#cbd5e1", // White (Common)
//   7: "#67e8f9", // Cyan (Uncommon)
//   6: "#34d399", // Emerald (Rare)
//   5: "#3b82f6", // Blue (Rare+)
//   4: "#a855f7", // Purple (Epic)
//   3: "#f472b6", // Pink (Legendary)
//   2: "#fbbf24", // Amber (Mythic)
//   1: "#ef4444", // Red (Ancient)
//   0: "#ffffff" // Pure White Core with Rainbow Glow (God)
// }

// export const getNodeStyle = (
//   category: MainCategory,
//   sequence: number,
//   isStale: boolean,
//   isLocked: boolean
// ) => {
//   if (isLocked) {
//     return {
//       color: "#1e293b", // Dark Slate
//       glow: "none",
//       scale: 0.8,
//       opacity: 0.3
//     }
//   }

//   const baseColor = SEQUENCE_COLORS[sequence] || "#94a3b8"
//   const pathwayColor = PATHWAYS[category]?.color || baseColor

//   // If Stale: Desaturate and flicker
//   if (isStale) {
//     return {
//       color: "#475569", // Dull Grey
//       glow: `0 0 5px ${baseColor}`, // Weak glow
//       scale: 0.9,
//       opacity: 0.8,
//       animation: "glitch" // We will handle this in Framer Motion
//     }
//   }

//   // Normal Healthy Star
//   return {
//     color: baseColor,
//     glow: `0 0 ${10 + (9 - sequence) * 5}px ${pathwayColor}`, // Higher rank = Bigger glow
//     scale: 1 + (9 - sequence) * 0.1, // Higher rank = Bigger star
//     opacity: 1
//   }
// }
// src/lib/skill-tree-utils.ts
import { PATHWAYS } from "../data/pathways"
import type { MainCategory } from "../data/categories"

// The "Rarity" Colors for Sequences 9 to 0
export const SEQUENCE_COLORS: Record<number, string> = {
  9: "#94a3b8", // Slate (Novice)
  8: "#cbd5e1", // White (Common)
  7: "#67e8f9", // Cyan (Uncommon)
  6: "#34d399", // Emerald (Rare)
  5: "#3b82f6", // Blue (Rare+)
  4: "#a855f7", // Purple (Epic)
  3: "#f472b6", // Pink (Legendary)
  2: "#fbbf24", // Amber (Mythic)
  1: "#ef4444", // Red (Ancient)
  0: "#ffffff"  // Pure White (God)
}

export const getNodeStyle = (
  category: MainCategory,
  sequence: number,
  isStale: boolean,
  isLocked: boolean
) => {
  if (isLocked) {
    return {
      color: "#334155", // Dark Slate
      glow: "none",
      scale: 0.8,
      opacity: 0.4
    }
  }

  const baseColor = SEQUENCE_COLORS[sequence] || "#94a3b8"
  // If specific pathway color exists, use it, otherwise use rank color
  const pathwayColor = PATHWAYS[category]?.color || baseColor

  // 1. Stale State (The Unshadowed Cross)
  if (isStale) {
    return {
      color: "#ef4444", // Red tint
      glow: `0 0 5px #ef4444`, // Weak red glow
      scale: 0.95,
      opacity: 0.9,
      borderColor: "#7f1d1d"
    }
  }

  // 2. Healthy State (Star)
  return {
    color: pathwayColor,
    // Higher rank = Bigger glow radius
    glow: `0 0 ${15 + (9 - sequence) * 3}px ${pathwayColor}`, 
    scale: 1 + (9 - sequence) * 0.05,
    opacity: 1,
    borderColor: baseColor
  }
}