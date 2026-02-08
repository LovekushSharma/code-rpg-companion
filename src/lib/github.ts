// // Helper to encode string to Base64 (Unicode safe)
// function unicodeBase64(str: string) {
//   return btoa(
//     encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
//       return String.fromCharCode(parseInt(p1, 16))
//     })
//   )
// }

import { getAIService } from "./aiService/factory"

// interface QuestData {
//   title: string
//   code: string
//   notes: string
//   difficulty: string
//   url: string
// }

// export const pushToGitHub = async (data: QuestData) => {
//   // 1. Get Credentials
//   const settings = await chrome.storage.sync.get([
//     "githubToken",
//     "githubOwner",
//     "githubRepo"
//   ])
//   const { githubToken, githubOwner, githubRepo } = settings

//   if (!githubToken || !githubOwner || !githubRepo) {
//     throw new Error("Missing GitHub Settings. Please configure in Storage tab.")
//   }

//   // 2. Format the Content (The Markdown File)
//   const fileContent = `
// # ${data.title}
// - **Difficulty:** ${data.difficulty}
// - **Link:** [LeetCode Problem](${data.url})

// ## 📝 Notes
// ${data.notes}

// ## 💻 Solution
// \`\`\`python
// ${data.code}
// \`\`\`
// `

//   // 3. Create the Path (Folder Structure)
//   // Replaces spaces with dashes: "Two Sum" -> "two-sum"
//   const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
//   const path = `problems/${slug}/solution.md`

//   // 4. API Request to GitHub (PUT creates or updates)
//   const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`

//   console.log("Pushing to GitHub:", url)
//   // We need to check if file exists first (to get SHA for update),
//   // but for MVP let's just try to create (it will fail if exists without SHA)
//   // For a robust system, we usually GET the file first. Let's do a simple PUT for now.

//   const response = await fetch(url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${githubToken}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       message: `Solved: ${data.title}`,
//       content: unicodeBase64(fileContent)
//       // sha: "..." // Needed if we are updating an existing file
//     })
//   })

//   if (!response.ok) {
//     const err = await response.json()
//     throw new Error(err.message || "GitHub Upload Failed")
//   }

//   return await response.json()
// }

// src/lib/github.ts

/**
 * 🛡️ Robust Base64 encoder using TextEncoder.
 * This automatically fixes "lone surrogates" (bad characters)
 * instead of crashing with URIError.
 */
function unicodeBase64(str: string): string {
  // 1. Convert string to UTF-8 bytes
  // TextEncoder silently replaces invalid characters with  instead of throwing errors
  const bytes = new TextEncoder().encode(str)

  // 2. Convert bytes to binary string
  let binary = ""
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  // 3. Return Base64
  return window.btoa(binary)
}

interface QuestData {
  title: string
  code: string
  notes: string
  difficulty: string
  url: string
  timeTaken: string
  problemDesc: string
}

export const pushToGitHub = async (data: QuestData) => {
  // 1. Get Credentials
  const settings = await chrome.storage.sync.get([
    "githubToken",
    "githubOwner",
    "githubRepo"
  ])

  const githubToken = settings.githubToken?.trim()
  const githubOwner = settings.githubOwner?.trim()
  const githubRepo = settings.githubRepo?.trim()

  if (!githubToken || !githubOwner || !githubRepo) {
    throw new Error("Missing GitHub Settings. Please go to the Storage tab.")
  }

  // 2. Prepare the Content
  // Ensure we are working with strings, even if data is null
  const safeTitle = data.title || "Untitled"
  const safeNotes = data.notes || ""
  const safeCode = data.code || ""
  const safeDiff = data.difficulty || "Unknown"
  const safeUrl = data.url || "#"
  const safeTimeTaken = data.timeTaken || "N/A"

  let fileContent = `
# ${safeTitle}
- **Difficulty:** ${safeDiff}
- **Link:** [LeetCode Problem](${safeUrl})
- **Time Taken:** ${safeTimeTaken}

## 📝 Notes
${safeNotes}

## 💻 Solution
\`\`\`python
${safeCode}
\`\`\`
`

  try {
    const aiConfig = await chrome.storage.sync.get(["aiConfig"])
    let aiService = getAIService(aiConfig.aiConfig)
    const analysis = await aiService.AICodeAnalysis(
      safeCode,
      safeTitle,
      data.problemDesc
    )
    alert("✅ AI Analysis Completed! Check your GitHub file for insights.")
    fileContent += `## 🤖 AI Analysis
- **Topics:** ${analysis.topics}
- **Code Complexity:** ${analysis.complexity}
- **Feedbacks:** ${analysis.feedback}
- **Efficiency Score:** ${analysis.efficiency_score}`
  } catch (error: any) {
    console.warn("AI Analysis Failed:", error)
    fileContent += `
    ## 🤖 AI Analysis
    - AI analysis failed. Please check your AI configuration and ensure your code is complete.`
  }

  // 3. Construct the Path & URL
  // "11. Container With Most Water" -> "11-container-with-most-water"
  const slug = safeTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with dashes
    .replace(/^-+|-+$/g, "") // Trim dashes from start/end

  const path = `problems/${slug}/solution.md`
  const apiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`

  console.log(`Checking file: ${apiUrl}`)

  // 4. Check if file exists (Get SHA)
  let sha: string | undefined = undefined

  try {
    const getResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    })

    if (getResponse.ok) {
      const fileData = await getResponse.json()
      sha = fileData.sha
      console.log("File exists. Updating SHA:", sha)
    } else if (getResponse.status === 404) {
      console.log("File does not exist. Creating new.")
    } else {
      console.warn("Unexpected status checking file:", getResponse.status)
    }
  } catch (error) {
    console.warn("Network error checking file (will attempt create):", error)
  }

  // 5. Create or Update (PUT)
  console.log("Encoding content...")

  // This will now succeed even if there are weird characters
  const contentBase64 = unicodeBase64(fileContent)

  const bodyPayload: any = {
    message: `feat: Solve ${safeTitle}`,
    content: contentBase64
  }

  if (sha) {
    bodyPayload.sha = sha
  }

  console.log("Sending PUT request...")
  const putResponse = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyPayload)
  })

  const responseJson = await putResponse.json()

  if (!putResponse.ok) {
    console.error("GitHub Upload Failed:", responseJson)
    throw new Error(
      `GitHub Error ${putResponse.status}: ${responseJson.message || "Unknown Error"}`
    )
  }

  console.log("Success:", responseJson)
  return responseJson
}
