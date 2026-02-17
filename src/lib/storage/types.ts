// src/lib/storage/types.ts

export interface NodeStats {
  id: string;             // e.g., "sliding_window"
  
  // Progression
  sequence: number;       // 9 (Apprentice) to 0 (God)
  xp: number;             // 0 to 100 (Satiation)
  corruption: number;     // 0 to 100 (Loss of Control)
  
  // Anchor / Time
  lastPracticed: number;  // Timestamp (ms)
  
  // Metrics
  totalSolved: number;    // How many problems for this specific node?
  bestSpeed: number;      // Best time (optional, for King of Angels)
  
  // State
  isStale: boolean;       // True if "Unshadowed Cross" effect is active
}

export interface UserStats {
  username: string;
  lastSync: number;
  // The big map: Key is the ID from skill-tree-data.ts
  nodes: Record<string, NodeStats>; 
}