// src/data/skill-tree.ts
import type { MainCategory, SubCategory } from "./categories"

export interface SkillNode {
  id: string
  label: string
  description: string
  mainCategory: MainCategory
  subCategory: SubCategory
  tier: 1 | 2 | 3 | 4 | 5 | 6
  dependencies: string[]
}

export const skillTreeData: SkillNode[] = [
  // ==========================================
  // TIER 1: FOUNDATIONS
  // ==========================================
  {
    id: "big_o",
    label: "Big O Analysis",
    description: "Time/Space complexity, Master Theorem.",
    mainCategory: "Math & Geometry",
    subCategory: "Number Theory",
    tier: 1,
    dependencies: []
  },
  {
    id: "basic_math",
    label: "Basic Math",
    description: "GCD, LCM, Primes (Sieve), Modulo.",
    mainCategory: "Math & Geometry",
    subCategory: "Number Theory",
    tier: 1,
    dependencies: []
  },
  {
    id: "arrays_basics",
    label: "Dynamic Arrays",
    description: "Vectors, Resizing, Memory Layout.",
    mainCategory: "Arrays & Hashing",
    subCategory: "Basic Arrays",
    tier: 1,
    dependencies: []
  },
  {
    id: "hash_maps",
    label: "Hash Maps",
    description: "Collision resolution, Sets, Frequency Maps.",
    mainCategory: "Arrays & Hashing",
    subCategory: "Basic Arrays",
    tier: 1,
    dependencies: []
  },
  {
    id: "recursion",
    label: "Recursion",
    description: "Call stack, Base cases.",
    mainCategory: "Advanced Algorithms", // Acts as a base for Backtracking
    subCategory: "BFS/DFS Traversal", // Loosely related
    tier: 1,
    dependencies: []
  },

  // ==========================================
  // TIER 2: LINEAR PATTERNS
  // ==========================================
  {
    id: "prefix_sums",
    label: "Prefix Sums",
    description: "Range Sum Queries (Immutable).",
    mainCategory: "Arrays & Hashing",
    subCategory: "Prefix Sums",
    tier: 2,
    dependencies: ["arrays_basics"]
  },
  {
    id: "two_pointers",
    label: "Two Pointers",
    description: "Collision, Partitioning, Merging.",
    mainCategory: "Two Pointers & Window",
    subCategory: "Two Pointers",
    tier: 2,
    dependencies: ["arrays_basics"]
  },
  {
    id: "sliding_window",
    label: "Sliding Window",
    description: "Fixed vs Variable size windows.",
    mainCategory: "Two Pointers & Window",
    subCategory: "Sliding Window",
    tier: 2,
    dependencies: ["two_pointers"]
  },
  {
    id: "matrix_ops",
    label: "Matrix Logic",
    description: "Traversal, Spiral, Rotation.",
    mainCategory: "Arrays & Hashing",
    subCategory: "Matrices",
    tier: 2,
    dependencies: ["arrays_basics"]
  },
  {
    id: "stack_mono",
    label: "Monotonic Stack",
    description: "Next Greater Element, Daily Temperatures.",
    mainCategory: "Stack & Queue",
    subCategory: "Monotonic Stack",
    tier: 2,
    dependencies: ["arrays_basics"]
  },
  {
    id: "binary_search",
    label: "Binary Search",
    description: "O(log n) search space reduction.",
    mainCategory: "Binary Search",
    subCategory: "Basic Arrays", // BS applies mostly to arrays
    tier: 2,
    dependencies: ["arrays_basics"]
  },

  // ==========================================
  // TIER 3: TREES & HEAPS
  // ==========================================
  {
    id: "tree_traversal",
    label: "Tree Traversal",
    description: "In/Pre/Post Order, Level Order, ZigZag.",
    mainCategory: "Trees",
    subCategory: "BFS/DFS Traversal",
    tier: 3,
    dependencies: ["recursion"]
  },
  {
    id: "bst",
    label: "BST Operations",
    description: "Validation, LCA, Balancing logic.",
    mainCategory: "Trees",
    subCategory: "BST Operations",
    tier: 3,
    dependencies: ["tree_traversal", "binary_search"]
  },
  {
    id: "heap",
    label: "Heaps (PQ)",
    description: "K-th Largest, Median of Stream.",
    mainCategory: "Heaps",
    subCategory: "Basic Arrays", // Heaps are arrays under the hood
    tier: 3,
    dependencies: ["tree_traversal"]
  },
  {
    id: "backtracking",
    label: "Backtracking",
    description: "Subsets, Permutations, Pruning.",
    mainCategory: "Advanced Algorithms",
    subCategory: "BFS/DFS Traversal",
    tier: 3,
    dependencies: ["recursion"]
  },

  // ==========================================
  // TIER 4: GRAPHS & DP I
  // ==========================================
  {
    id: "grid_graph",
    label: "Grid Graphs",
    description: "Islands, Flood Fill, Rotting Oranges.",
    mainCategory: "Graphs",
    subCategory: "Grid Traversal",
    tier: 4,
    dependencies: ["tree_traversal", "backtracking"]
  },
  {
    id: "union_find",
    label: "Union Find",
    description: "Disjoint Set, Path Compression.",
    mainCategory: "Graphs",
    subCategory: "Graph Connectivity",
    tier: 4,
    dependencies: ["grid_graph"]
  },
  {
    id: "topo_sort",
    label: "Topological Sort",
    description: "Dependency resolution (Kahn's).",
    mainCategory: "Graphs",
    subCategory: "Graph Connectivity",
    tier: 4,
    dependencies: ["grid_graph"]
  },
  {
    id: "dijkstra",
    label: "Dijkstra / BFS",
    description: "Shortest Path in Weighted Graphs.",
    mainCategory: "Graphs",
    subCategory: "Shortest Path",
    tier: 4,
    dependencies: ["grid_graph", "heap"]
  },
  {
    id: "dp_1d",
    label: "1D DP",
    description: "Climbing Stairs, House Robber.",
    mainCategory: "Dynamic Programming",
    subCategory: "1D DP",
    tier: 4,
    dependencies: ["recursion"]
  },
  {
    id: "dp_grid",
    label: "Grid DP",
    description: "Unique Paths, Min Path Sum.",
    mainCategory: "Dynamic Programming",
    subCategory: "2D/Grid DP",
    tier: 4,
    dependencies: ["dp_1d"]
  },
  {
    id: "knapsack",
    label: "Knapsack Patterns",
    description: "0/1, Unbounded, Partition Equal Subset.",
    mainCategory: "Dynamic Programming",
    subCategory: "Knapsack Patterns",
    tier: 4,
    dependencies: ["dp_grid"]
  },
  {
    id: "lcs",
    label: "LCS Patterns",
    description: "Longest Common Subsequence, Edit Distance.",
    mainCategory: "Dynamic Programming",
    subCategory: "LCS Patterns",
    tier: 4,
    dependencies: ["dp_grid"]
  },
  {
    id: "trie",
    label: "Tries",
    description: "Prefix Trees for strings.",
    mainCategory: "Trees",
    subCategory: "Tries",
    tier: 4,
    dependencies: ["tree_traversal"]
  },

  // ==========================================
  // TIER 5: EXPERT
  // ==========================================
  {
    id: "segment_tree",
    label: "Segment Trees",
    description: "Range Updates, Lazy Propagation.",
    mainCategory: "Advanced Data Structures",
    subCategory: "Range Queries",
    tier: 5,
    dependencies: ["tree_traversal", "binary_search"]
  },
  {
    id: "bitmask_dp",
    label: "Bitmask DP",
    description: "Traveling Salesman (TSP), Small N.",
    mainCategory: "Dynamic Programming",
    subCategory: "Bitmask DP",
    tier: 5,
    dependencies: ["dp_grid", "bit_manipulation"] // assumes bit manip node exists
  },
  {
    id: "digit_dp",
    label: "Digit DP",
    description: "Counting numbers with properties.",
    mainCategory: "Dynamic Programming",
    subCategory: "Digit DP",
    tier: 5,
    dependencies: ["dp_1d"]
  },
  {
    id: "kmp",
    label: "KMP & Z-Algo",
    description: "Pattern Matching in O(N).",
    mainCategory: "Advanced Data Structures",
    subCategory: "String Algorithms",
    tier: 5,
    dependencies: ["two_pointers"]
  },
  {
    id: "bit_manipulation",
    label: "Bit Manipulation",
    description: "XOR tricks, Bit shifting.",
    mainCategory: "Bit Manipulation",
    subCategory: "Number Theory", // fits roughly
    tier: 5,
    dependencies: ["basic_math"]
  },

  // ==========================================
  // TIER 6: GRANDMASTER
  // ==========================================
  {
    id: "network_flow",
    label: "Network Flow",
    description: "Max Flow, Min Cut, Bipartite Matching.",
    mainCategory: "Graphs",
    subCategory: "Network Flow",
    tier: 6,
    dependencies: ["dijkstra", "union_find"]
  },
  {
    id: "scc_2sat",
    label: "SCC & 2-SAT",
    description: "Tarjan's, Kosaraju, Boolean Logic.",
    mainCategory: "Graphs",
    subCategory: "Advanced Graphs",
    tier: 6,
    dependencies: ["topo_sort"]
  },
  {
    id: "advanced_tree",
    label: "LCA & HLD",
    description: "Binary Lifting, Heavy-Light Decomp.",
    mainCategory: "Trees",
    subCategory: "Advanced Tree Algos",
    tier: 6,
    dependencies: ["segment_tree", "tree_traversal"]
  },
  {
    id: "sparse_table",
    label: "Sparse Table",
    description: "Static RMQ in O(1).",
    mainCategory: "Advanced Data Structures",
    subCategory: "Range Queries",
    tier: 6,
    dependencies: ["prefix_sums"]
  },
  {
    id: "mo_algo",
    label: "Mo's Algorithm",
    description: "Sqrt Decomposition, Offline Queries.",
    mainCategory: "Advanced Data Structures",
    subCategory: "Sqrt Decomposition",
    tier: 6,
    dependencies: ["segment_tree"]
  },
  {
    id: "aho_corasick",
    label: "Aho-Corasick",
    description: "Multi-pattern string search.",
    mainCategory: "Advanced Data Structures",
    subCategory: "String Algorithms",
    tier: 6,
    dependencies: ["trie", "kmp"]
  },
  {
    id: "dp_opt",
    label: "DP Optimizations",
    description: "Convex Hull Trick, Knuth's Opt.",
    mainCategory: "Dynamic Programming",
    subCategory: "DP Optimization",
    tier: 6,
    dependencies: ["dp_grid"]
  },
  {
    id: "geometry",
    label: "Geometry",
    description: "Convex Hull, Line Sweep.",
    mainCategory: "Math & Geometry",
    subCategory: "Geometry",
    tier: 6,
    dependencies: ["basic_math"]
  }
]
