import { motion, easeInOut, easeOut } from "framer-motion"
import { Handle, Position, type NodeProps } from "reactflow"

import type { MainCategory } from "../../data/categories"
import { PATHWAYS } from "../../data/pathways"
import { getNodeStyle } from "../../lib/skill-tree-utils"

// Data passed to the node
interface StarNodeData {
  label: string
  category: MainCategory
  sequence: number
  isLocked: boolean
  isStale: boolean
  xp: number
}

const StarNode = ({ data, selected }: NodeProps<StarNodeData>) => {
  const { label, category, sequence, isLocked, isStale, xp } = data
  const styles = getNodeStyle(category, sequence, isStale, isLocked)

  // Get Icon from Pathway config, default to Star
  const pathwayIcon = PATHWAYS[category]?.icon || "⭐"
  const pathwayName = PATHWAYS[category]?.name || "Unknown Path"

  // --- ANIMATIONS ---

  // 1. Healthy Star: Gentle breathing
  const breathingAnim = {
    scale: [1, 1.1, 1],
    boxShadow: [
      styles.glow,
      `0 0 ${30 + (9 - sequence) * 5}px ${styles.color}`, // Brighter pulse
      styles.glow
    ],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut}
  }

  // 2. Stale Star: Glitchy flickering
  const glitchAnim = {
    opacity: [0.8, 0.4, 1, 0.6],
    x: [0, -2, 2, 0],
    boxShadow: [`0 0 5px ${styles.color}`, `0 0 15px ${styles.color}`],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }
  }

  return (
    <div className="plasmo-relative plasmo-group plasmo-flex plasmo-items-center plasmo-justify-center">
      {/* React Flow Handles (Invisible) */}
      <Handle
        type="target"
        position={Position.Top}
        className="!plasmo-bg-transparent !plasmo-border-none"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!plasmo-bg-transparent !plasmo-border-none"
      />

      {/* --- THE STAR VISUAL --- */}
      <motion.div
        className={`plasmo-rounded-full plasmo-flex plasmo-items-center plasmo-justify-center plasmo-border-2 plasmo-cursor-pointer plasmo-transition-colors`}
        style={{
          width: 50,
          height: 50,
          backgroundColor: isLocked ? "#020617" : "#0f172a", // Very dark blue bg
          borderColor: styles.borderColor,
          boxShadow: styles.glow
        }}
        // Apply animation based on state
        animate={isLocked ? {} : isStale ? glitchAnim : breathingAnim}
        whileHover={{ scale: 1.2 }}>
        <span
          className={`plasmo-text-xl plasmo-select-none ${isLocked ? "plasmo-grayscale plasmo-opacity-20" : ""}`}>
          {isLocked ? "🔒" : pathwayIcon}
        </span>
      </motion.div>

      {/* --- SEQUENCE RING (Rank Indicator) --- */}
      {!isLocked && (
        <div
          className="plasmo-absolute plasmo-inset-0 plasmo-rounded-full plasmo-border plasmo-border-dashed plasmo-pointer-events-none plasmo-opacity-30"
          style={{
            borderColor: styles.color,
            transform: `scale(${1.4 + (9 - sequence) * 0.1})`
          }}
        />
      )}

      {/* --- WARNING INDICATOR (Unshadowed Cross) --- */}
      {isStale && !isLocked && (
        <div className="plasmo-absolute -plasmo-top-3 -plasmo-right-3 plasmo-z-20">
          <motion.span
            className="plasmo-text-xs plasmo-bg-red-900 plasmo-text-red-100 plasmo-px-1 plasmo-rounded plasmo-border plasmo-border-red-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}>
            ⚠️
          </motion.span>
        </div>
      )}

      {/* --- DETAILS CARD (Visible on Click/Select) --- */}
      {/* We use the 'selected' prop from React Flow to trigger this */}
      {selected && !isLocked && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="plasmo-absolute plasmo-top-14 plasmo-z-50 plasmo-w-48">
          <div className="plasmo-bg-slate-900/95 plasmo-backdrop-blur-md plasmo-border plasmo-border-slate-700 plasmo-rounded-xl plasmo-p-3 plasmo-shadow-2xl plasmo-text-center">
            {/* Header */}
            <h3
              className="plasmo-text-sm plasmo-font-bold plasmo-mb-1"
              style={{ color: styles.color }}>
              {label}
            </h3>
            <p className="plasmo-text-[10px] plasmo-text-slate-400 plasmo-uppercase plasmo-tracking-widest plasmo-mb-2">
              {pathwayName}
            </p>

            {/* Rank Badge */}
            <div className="plasmo-inline-block plasmo-px-2 plasmo-py-0.5 plasmo-rounded plasmo-bg-slate-800 plasmo-border plasmo-border-slate-700 plasmo-mb-3">
              <span
                className="plasmo-text-xs plasmo-font-mono"
                style={{ color: styles.color }}>
                Seq {sequence}
              </span>
            </div>

            {/* Status Text */}
            {isStale ? (
              <p className="plasmo-text-xs plasmo-text-red-400 plasmo-font-bold plasmo-animate-pulse plasmo-mb-2">
                ⚠️ Sequence Unstable
                <br />
                <span className="plasmo-text-[10px] plasmo-font-normal plasmo-text-red-300">
                  Solve 1 problem to stabilize.
                </span>
              </p>
            ) : (
              <div className="plasmo-space-y-1 plasmo-mb-2">
                <div className="plasmo-flex plasmo-justify-between plasmo-text-[10px] plasmo-text-slate-400">
                  <span>XP Progress</span>
                  <span>{xp}/100</span>
                </div>
                <div className="plasmo-w-full plasmo-bg-slate-800 plasmo-h-1.5 plasmo-rounded-full plasmo-overflow-hidden">
                  <motion.div
                    className="plasmo-h-full"
                    style={{ backgroundColor: styles.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(xp, 100)}%` }}
                    transition={{ duration: 1, ease: easeOut }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default StarNode
