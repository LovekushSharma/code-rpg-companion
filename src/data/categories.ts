// src/data/categories.ts

// 1. High-Level Grouping (For broad filtering/coloring)
export type MainCategory =
  | "Arrays & Hashing"
  | "Two Pointers & Window"
  | "Stack & Queue"
  | "Binary Search"
  | "Trees"
  | "Heaps"
  | "Graphs"
  | "Dynamic Programming"
  | "Math & Geometry"
  | "Bit Manipulation"
  | "Advanced Data Structures"
  | "Advanced Algorithms"

// 2. Granular Grouping (For surgical precision)
export type SubCategory =
  // --- Arrays ---
  | "Basic Arrays"
  | "Prefix Sums"
  | "Matrices"
  | "Simulation"

  // --- Pointers ---
  | "Two Pointers"
  | "Sliding Window"
  | "Fast & Slow Pointers"

  // --- Stack/Queue ---
  | "Monotonic Stack"
  | "Monotonic Queue"
  | "Parentheses"

  // --- Trees ---
  | "BFS/DFS Traversal"
  | "BST Operations"
  | "Tries"
  | "Advanced Tree Algos" // LCA, HLD, Centroid

  // --- Graphs ---
  | "Grid Traversal" // Islands, Flood Fill
  | "Graph Connectivity" // Union Find, Topo Sort
  | "Shortest Path" // Dijkstra, Bellman-Ford
  | "Network Flow" // Max Flow, Bipartite Matching
  | "Advanced Graphs" // SCC, 2-SAT, Johnson's

  // --- DP ---
  | "1D DP"
  | "2D/Grid DP"
  | "Knapsack Patterns"
  | "LCS Patterns"
  | "Bitmask DP"
  | "Digit DP"
  | "DP Optimization" // CHT, D&C Opt

  // --- Advanced DS ---
  | "Range Queries" // Segment Tree, Fenwick, Sparse Table
  | "Sqrt Decomposition" // Mo's Algo
  | "String Algorithms" // KMP, Rolling Hash, Suffix Structures

  // --- Math ---
  | "Number Theory"
  | "Combinatorics"
  | "Geometry"
  | "Game Theory"
