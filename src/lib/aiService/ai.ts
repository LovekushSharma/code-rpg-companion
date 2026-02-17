import { skillTreeData } from "../../data/skill-tree"

export interface AIService {
  model: string
  apiKey: string
  AICodeAnalysis: (
    code: string,
    problemTitle: string,
    problemDesc: string
  ) => Promise<AIAnalysisResult>
}

export interface AIAnalysisResult {
  complexity: string // e.g., "O(n)"
  efficiency_score: number // 0 to 100
  topics: string[] // e.g., ["Two Pointers", "Array"]
  feedback: string // "Great use of a set for O(1) lookups."
}

// 1. DYNAMIC SKILL MENU
const VALID_SKILL_IDS = skillTreeData.map((n) => n.id).join(", ")

// 2. SEQUENCE EXPECTATIONS (The Bar)
const getExpectationText = (seq: number): string => {
  const expectations: Record<number, string> = {
    9: "Apprentice (Level 1): Goal = WORKING CODE. Brute force is 100% acceptable. Syntax must be correct.",
    8: "Surveyor (Level 2): Goal = OPTIMAL BIG-O. O(N) is required where possible. O(N^2) is a failure.",
    7: "Designer (Level 3): Goal = MEDIUM SOLVE. Handle core complexity. Verbose logic is okay.",
    6: "Engineer (Level 4): Goal = PATTERN MUSCLE MEMORY. Standard patterns (e.g. Sliding Window) must be clean.",
    5: "Grandmaster (Level 5): Goal = EDGE CASES. Handle nulls/overflows. Combining 2 topics allowed.",
    4: "Demigod (Level 6): Goal = ORCHESTRATION. Optimal logic. Semantic naming. Zero redundancy.",
    3: "Saint (Level 7): Goal = HIDDEN PATTERNS. Identifying non-obvious optimizations.",
    2: "Angel (Level 8): Goal = COMPETITIVE. Complex structures from scratch.",
    1: "King of Angels (Level 9): Goal = SPEED. Beats 99% runtime. Zero waste.",
    0: "The God (Level 10): Goal = SINGULARITY. The simplest, most elegant code possible."
  }
  return expectations[seq] || "Standard valid solution."
}

export const generateMasterPrompt = (currentSequence: number) => {
  const expectationText = getExpectationText(currentSequence)

  return `
### SYSTEM ROLE
You are an Elite Senior Technical Interviewer. Provide a brutally objective technical assessment.

---

### CONTEXT
**Current Rank:** Sequence ${currentSequence}
**Target Expectation:** "${expectationText}"

---

### TASK 1: INPUT VALIDATION (Is Valid?)
Analyze the code before scoring. Set "is_valid": false if:
1. Code is < 10 characters or empty.
2. Code is only comments or a function signature with no logic body.
3. Code is gibberish or unrelated to the problem context.
*If false, return 0 score and "Invalid Submission" verdict.*

---

### TASK 2: THE AUTHORITY AUDIT (Scoring Rubric)
Score the code (0-100) based on **Relative Scoring** against the Target Expectation.

**The Authority Factor Calculation:**
- **90-100 (Perfect Acting):** 
  - Meets/Exceeds Rank Expectation (e.g., Seq 9 Brute Force = 100 or If Seq 4, a perfect O(N) with clean names = 100).
  - Clean syntax, correct logic.
- **75-89 (Sufficient):** 
  - Logic is correct and meets Rank Expectation. (e.g. If Seq 9, working code but messy indentation or If Seq 4, Optimal logic but verbose code)
  - Minor issues: Bad variable names, messy indentation, slightly verbose.
- **50-74 (Weak / "Lazy"):** 
  - Solves the problem but FAILS the specific Rank goal (e.g., If Seq 8 (requires Optimal), but user submits Brute Force).
  - OR: Code works but is extremely "spaghetti".
- **0-49 (Failure / Corruption):** 
  - Does not solve the problem.
  - OR: **The Lion & Rabbit Violation** (See below).

**The "Lion & Rabbit" Law (CRITICAL OVERRIDE):**
If User is **Sequence 6 or higher** (Expert) AND problem is **Easy/Medium**:
- You must demand PERFECTION. 
- Any redundancy, generic names ('temp'), or sub-optimal logic = **Score < 50**.
- Experts do not get points for lazy solutions to easy problems.

---

### TASK 3: SKILL MAPPING
Identify used skills from this list ONLY: [${VALID_SKILL_IDS}]
Rate relevance: 3 (Core Concept), 2 (Major), 1 (Minor).

---

### OUTPUT SCHEMA (JSON ONLY)
{
  "is_valid": boolean,
  
  // 1. The Pass/Fail Verdict based on Rank
  // Did they meet the expectation for Sequence ${currentSequence}?
  "verdict": "string (Short, technical judgment. e.g., 'Failed: You acted like an Apprentice, but you are a Surveyor.')",

  // 2. General Improvement Advice
  // Regardless of rank, how can they make this code better?
  "general_feedback": "string (Tips on patterns, built-in functions, or cleaner syntax)",

  "authority_factor": number, // 0-100
  "requires_penalty": boolean, // true if score < 50
  
  "complexity": "string (Time: O(?), Space: O(?))",
  "skill_map": { "skill_id": number }
}
`
}

export const generateUserPrompt = (
  problemTitle: string,
  problemDesc: string,
  code: string
) => {
  return `
  ---
### INPUT DATA
**Problem:** "${problemTitle}"
**Desc:** ${problemDesc}
**Code:**
${code}
`
}
