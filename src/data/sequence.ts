import type { MainCategory } from "./categories"

export interface SequenceRank {
  id: number // 9 to 0
  title: string // The Display Name
  flavor: string // The Text that appears when you unlock it
}

export const PATHWAY_SEQUENCES: Record<MainCategory, SequenceRank[]> = {
  // ---------------------------------------------------------
  // 1. ARRAYS & HASHING -> THE ARCHITECT PATHWAY
  // Theme: Structure, Memory, Foundation
  // ---------------------------------------------------------
  "Arrays & Hashing": [
    {
      id: 9,
      title: "Mason",
      flavor: "You learn to lay the first bricks of logic."
    },
    {
      id: 8,
      title: "Surveyor",
      flavor: "You map the boundaries of memory."
    },
    {
      id: 7,
      title: "Blueprinter",
      flavor: "You see the hidden structures behind the chaos."
    },
    {
      id: 6,
      title: "Structurist",
      flavor: "You build efficient vessels for data."
    },
    {
      id: 5,
      title: "City-Shaper",
      flavor: "Complex systems rise at your command."
    },
    {
      id: 4,
      title: "World-Smith",
      flavor: "You forge entire realities from simple arrays."
    },
    {
      id: 3,
      title: "Reality Weaver",
      flavor: "The fabric of code bends to your structure."
    },
    {
      id: 2,
      title: "Dimension Anchor",
      flavor: "You stabilize the infinite void."
    },
    {
      id: 1,
      title: "Creation Lord",
      flavor: "You are the bedrock of the digital cosmos."
    },
    {
      id: 0,
      title: "The Architect",
      flavor: "You are the Structure itself."
    }
  ],

  // ---------------------------------------------------------
  // 2. TWO POINTERS -> THE TRAVELER PATHWAY
  // Theme: Time, Speed, Space Manipulation
  // ---------------------------------------------------------
  "Two Pointers & Window": [
    {
      id: 9,
      title: "Walker",
      flavor: "You take your first step into the stream."
    },
    {
      id: 8,
      title: "Sprinter",
      flavor: "You learn to move faster than the index."
    },
    {
      id: 7,
      title: "Pathfinder",
      flavor: "You find shortcuts where others see walls."
    },
    {
      id: 6,
      title: "Wind-Rider",
      flavor: "You glide through arrays without friction."
    },
    {
      id: 5,
      title: "Horizon-Chaser",
      flavor: "The end of the list is merely a suggestion."
    },
    {
      id: 4,
      title: "Space-Warper",
      flavor: "You compress distance with a thought."
    },
    {
      id: 3,
      title: "Chrono-Shifter",
      flavor: "Past and future pointers converge."
    },
    {
      id: 2,
      title: "Void-Walker",
      flavor: "You step outside the linear constraints."
    },
    {
      id: 1,
      title: "Time Lord",
      flavor: "Time flows at the speed you dictate."
    },
    {
      id: 0,
      title: "The Traveler",
      flavor: "Everywhere and nowhere, all at once."
    }
  ],

  // ---------------------------------------------------------
  // 3. STACK & QUEUE -> THE ARBITER PATHWAY
  // Theme: Order, Law, Flow Control
  // ---------------------------------------------------------
  "Stack & Queue": [
    {
      id: 9,
      title: "Clerk",
      flavor: "You file data one by one."
    },
    {
      id: 8,
      title: "Gatekeeper",
      flavor: "You decide who enters and who leaves."
    },
    {
      id: 7,
      title: "Sorter",
      flavor: "You bring order to the chaotic influx."
    },
    {
      id: 6,
      title: "Enforcer",
      flavor: "Monotonicity is the law, and you enforce it."
    },
    {
      id: 5,
      title: "Judge",
      flavor: "You evaluate the expressions of the universe."
    },
    {
      id: 4,
      title: "Executioner",
      flavor: "You clear the queue with ruthless efficiency."
    },
    {
      id: 3,
      title: "Law-Bringer",
      flavor: "The rules of Flow obey your command."
    },
    {
      id: 2,
      title: "Order-Incarnate",
      flavor: "Chaos cannot exist in your presence."
    },
    {
      id: 1,
      title: "Balance-Keeper",
      flavor: "You hold the equilibrium of input and output."
    },
    {
      id: 0,
      title: "The Arbiter",
      flavor: "The absolute law of the stack."
    }
  ],

  // ---------------------------------------------------------
  // 4. BINARY SEARCH -> THE SEEKER PATHWAY
  // Theme: Hunting, Dividing, Precision
  // ---------------------------------------------------------
  "Binary Search": [
    {
      id: 9,
      title: "Lookout",
      flavor: "You scan the horizon for answers."
    },
    {
      id: 8,
      title: "Scout",
      flavor: "You narrow down the search area."
    },
    {
      id: 7,
      title: "Hunter",
      flavor: "You track the target through sorted lands."
    },
    {
      id: 6,
      title: "Divider",
      flavor: "You split the problem in half, again and again."
    },
    { id: 5, title: "Precisionist", flavor: "You never miss by an index." },
    {
      id: 4,
      title: "Truth-Scope",
      flavor: "You see the answer before you find it."
    },
    {
      id: 3,
      title: "Core-Finder",
      flavor: "You strike the heart of the problem instantly."
    },
    {
      id: 2,
      title: "Omni-Scope",
      flavor: "The search space is transparent to you."
    },
    {
      id: 1,
      title: "Truth-Seer",
      flavor: "There is no hiding from your query."
    },
    {
      id: 0,
      title: "The Seeker",
      flavor: "The answer finds you."
    }
  ],

  // ---------------------------------------------------------
  // 5. TREES -> THE PLANTER PATHWAY
  // Theme: Growth, Nature, Connection
  // ---------------------------------------------------------
  Trees: [
    {
      id: 9,
      title: "Gardener",
      flavor: "You plant the seed of recursion."
    },
    {
      id: 8,
      title: "Sprout-Tender",
      flavor: "You nurture the left and right branches."
    },
    {
      id: 7,
      title: "Root-Weaver",
      flavor: "You understand the depth below the surface."
    },
    {
      id: 6,
      title: "Branch-Walker",
      flavor: "You traverse the canopy with ease."
    },
    {
      id: 5,
      title: "Forest-Heart",
      flavor: "You connect distinct trees into a forest."
    },
    {
      id: 4,
      title: "Life-Binder",
      flavor: "Dead nodes bloom under your touch."
    },
    {
      id: 3,
      title: "Gaia-Spirit",
      flavor: "The ecosystem of data breathes with you."
    },
    {
      id: 2,
      title: "World-Tree",
      flavor: "Your branches hold up the sky."
    },
    {
      id: 1,
      title: "Origin-Root",
      flavor: "All data stems from your source."
    },
    {
      id: 0,
      title: "The Planter",
      flavor: "Life, Growth, and Recursion."
    }
  ],

  // ---------------------------------------------------------
  // 6. HEAPS -> THE MONARCH PATHWAY
  // Theme: Hierarchy, Ruling, Summit
  // ---------------------------------------------------------
  Heaps: [
    {
      id: 9,
      title: "Peasant",
      flavor: "You exist at the bottom of the pile."
    },
    {
      id: 8,
      title: "Squire",
      flavor: "You learn to climb the priority queue."
    },
    {
      id: 7,
      title: "Knight",
      flavor: "You defend the integrity of the heap."
    },
    {
      id: 6,
      title: "Captain",
      flavor: "You command the top K elements."
    },
    {
      id: 5,
      title: "General",
      flavor: "You organize the masses into ranks."
    },
    {
      id: 4,
      title: "Duke",
      flavor: "Your authority is recognized by the root."
    },
    {
      id: 3,
      title: "King",
      flavor: "You sit upon the throne of Max-Heap."
    },
    {
      id: 2,
      title: "Emperor",
      flavor: "The data bows to your priority."
    },
    {
      id: 1,
      title: "Apex-Ruler",
      flavor: "There is no one above you."
    },
    {
      id: 0,
      title: "The Monarch",
      flavor: "Absolute Hierarchy."
    }
  ],

  // ---------------------------------------------------------
  // 7. GRAPHS -> THE NAVIGATOR PATHWAY
  // Theme: Maps, Ocean, Stars, Travel
  // ---------------------------------------------------------
  Graphs: [
    {
      id: 9,
      title: "Sailor",
      flavor: "You push off from the shore of the known."
    },
    {
      id: 8,
      title: "Cartographer",
      flavor: "You draw lines between the islands."
    },
    {
      id: 7,
      title: "Boatswain",
      flavor: "You steer through the cycles and storms."
    },
    {
      id: 6,
      title: "Captain",
      flavor: "You command the BFS fleet."
    },
    {
      id: 5,
      title: "Fleet-Admiral",
      flavor: "The shortest path is whatever you say it is."
    },
    {
      id: 4,
      title: "Void-Sailor",
      flavor: "You navigate the weighted abyss."
    },
    {
      id: 3,
      title: "Star-Mapper",
      flavor: "You connect constellations of data."
    },
    {
      id: 2,
      title: "Galaxy-Guide",
      flavor: "Universal connectivity is your domain."
    },
    {
      id: 1,
      title: "Wormhole-Master",
      flavor: "Distance is an illusion to you."
    },
    {
      id: 0,
      title: "The Navigator",
      flavor: "All paths lead to you."
    }
  ],

  // ---------------------------------------------------------
  // 8. DYNAMIC PROGRAMMING -> THE ORACLE PATHWAY
  // Theme: Time, Fate, Optimization
  // ---------------------------------------------------------
  "Dynamic Programming": [
    {
      id: 9,
      title: "Bard",
      flavor: "You remember the stories of the past."
    },
    {
      id: 8,
      title: "Scribe",
      flavor: "You record the sub-problems."
    },
    {
      id: 7,
      title: "Calculator",
      flavor: "You see the cost of every action."
    },
    {
      id: 6,
      title: "Optimizer",
      flavor: "You discard the inefficient paths."
    },
    {
      id: 5,
      title: "Forecaster",
      flavor: "You predict the optimal outcome."
    },
    {
      id: 4,
      title: "Fate-Weaver",
      flavor: "You stitch together the timeline."
    },
    {
      id: 3,
      title: "Time-Streamer",
      flavor: "You move backwards from the goal."
    },
    {
      id: 2,
      title: "Destiny-Architect",
      flavor: "The future is calculated, not guessed."
    },
    {
      id: 1,
      title: "Prophet",
      flavor: "You have already seen the answer."
    },
    {
      id: 0,
      title: "The Oracle",
      flavor: "Omniscience through memoization."
    }
  ],

  // ---------------------------------------------------------
  // 9. MATH & GEOMETRY -> THE SAVANT PATHWAY
  // Theme: Logic, Truth, Universal Laws
  // ---------------------------------------------------------
  "Math & Geometry": [
    {
      id: 9,
      title: "Student",
      flavor: "You learn to count the stars."
    },
    {
      id: 8,
      title: "Calculator",
      flavor: "Numbers obey your basic commands."
    },
    {
      id: 7,
      title: "Geometer",
      flavor: "You measure the shape of the world."
    },
    {
      id: 6,
      title: "Logician",
      flavor: "You deduce the hidden theorems."
    },
    {
      id: 5,
      title: "Alchemist",
      flavor: "You transmute formulas into gold."
    },
    {
      id: 4,
      title: "Physicist",
      flavor: "You understand the friction of algorithms."
    },
    {
      id: 3,
      title: "Law-Maker",
      flavor: "You define the axioms of reality."
    },
    {
      id: 2,
      title: "Truth-Sage",
      flavor: "Mathematics is the language of God."
    },
    {
      id: 1,
      title: "Cosmos-Calculator",
      flavor: "The universe is just an equation."
    },
    {
      id: 0,
      title: "The Savant",
      flavor: "Pure Logic."
    }
  ],

  // ---------------------------------------------------------
  // 10. BIT MANIPULATION -> THE CIPHER PATHWAY
  // Theme: Encryption, Atomic Essence, Secrets
  // ---------------------------------------------------------
  "Bit Manipulation": [
    {
      id: 9,
      title: "Signalman",
      flavor: "You send simple pulses."
    },
    {
      id: 8,
      title: "Decoder",
      flavor: "You read the binary whispers."
    },
    {
      id: 7,
      title: "Hacker",
      flavor: "You bypass the high-level locks."
    },
    {
      id: 6,
      title: "Encryptor",
      flavor: "You hide truth in the XOR."
    },
    {
      id: 5,
      title: "Binary-Soul",
      flavor: "You think in zeros and ones."
    },
    {
      id: 4,
      title: "Data-Ghost",
      flavor: "You phase through the memory registers."
    },
    {
      id: 3,
      title: "Info-Hazard",
      flavor: "Your knowledge corrupts the unready."
    },
    {
      id: 2,
      title: "Source-Code",
      flavor: "You see the matrix raw."
    },
    {
      id: 1,
      title: "Entropy-Lord",
      flavor: "You control the decay of information."
    },
    {
      id: 0,
      title: "The Cipher",
      flavor: "The Essence of Information."
    }
  ],

  // ---------------------------------------------------------
  // 11. ADVANCED DS -> THE ARCHIVIST PATHWAY
  // Theme: Knowledge, History, Complexity
  // ---------------------------------------------------------
  "Advanced Data Structures": [
    {
      id: 9,
      title: "Librarian",
      flavor: "You organize the basic scrolls."
    },
    {
      id: 8,
      title: "Scroll-Keeper",
      flavor: "You protect the prefix sums."
    },
    {
      id: 7,
      title: "Chronicler",
      flavor: "You write the history of ranges."
    },
    {
      id: 6,
      title: "Historian",
      flavor: "You query the past efficiently."
    },
    {
      id: 5,
      title: "Memory-Palace",
      flavor: "You build structures within structures."
    },
    {
      id: 4,
      title: "Knowledge-Keeper",
      flavor: "Segment trees bow to you."
    },
    {
      id: 3,
      title: "Wisdom-Sage",
      flavor: "Complexity is merely a categorization."
    },
    {
      id: 2,
      title: "Akasha-Reader",
      flavor: "You access the universal record."
    },
    {
      id: 1,
      title: "Omniscient",
      flavor: "Nothing is hidden from your query."
    },
    {
      id: 0,
      title: "The Archivist",
      flavor: "Total Recall."
    }
  ],

  // ---------------------------------------------------------
  // 12. ADVANCED ALGOS -> THE VISIONARY PATHWAY
  // Theme: Dreams, Systems, Orchestration
  // ---------------------------------------------------------
  "Advanced Algorithms": [
    {
      id: 9,
      title: "Dreamer",
      flavor: "You imagine a solution."
    },
    {
      id: 8,
      title: "Planner",
      flavor: "You sketch the flow."
    },
    {
      id: 7,
      title: "Strategist",
      flavor: "You outwit the constraints."
    },
    {
      id: 6,
      title: "System-Builder",
      flavor: "You connect disjoint concepts."
    },
    {
      id: 5,
      title: "Grand-Designer",
      flavor: "Complexity is your canvas."
    },
    {
      id: 4,
      title: "Flow-Master",
      flavor: "You direct the network currents."
    },
    {
      id: 3,
      title: "Reality-Warper",
      flavor: "You bend the rules of N-Hard."
    },
    {
      id: 2,
      title: "Cosmos-Brain",
      flavor: "You think in hyper-dimensions."
    },
    {
      id: 1,
      title: "Demiurge",
      flavor: "You create new algorithms."
    },
    {
      id: 0,
      title: "The Visionary",
      flavor: "The Orchestrator of Logic."
    }
  ]
}
