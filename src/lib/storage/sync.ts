import { generateDefaultStats } from "./defaults";
import type { UserStats } from "./types";

// GitHub API Helpers (Internal)
const GITHUB_FILE_PATH = ".user/stats.json";

// --- HELPERS ---
function unicodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return window.btoa(binary);
}

function decodeBase64(str: string): string {
  const binary = window.atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

// --- THE SYNC CLASS ---
export const StorageManager = {
  
  /**
   * 1. LOAD: Tries Local -> Then GitHub -> Then Defaults
   */
  async loadStats(): Promise<UserStats> {
    // A. Try Local Storage (Fastest)
    const local = await chrome.storage.local.get(["userStats"]);
    if (local.userStats) {
      console.log("Loaded stats from Cache");
      // Background sync: Fetch latest from GitHub to ensure we aren't stale
      this.pullFromGitHub().catch(console.error); 
      return local.userStats;
    }

    // B. If no local, force GitHub fetch
    console.log("Cache miss. Fetching from GitHub...");
    return await this.pullFromGitHub();
  },

  /**
   * 2. SAVE: Saves to Local (Instant) -> Pushes to GitHub
   */
  async saveStats(stats: UserStats): Promise<void> {
    
    // Optimistic UI: Save to local immediately
    await chrome.storage.local.set({ userStats: stats });
    console.log("Stats saved to Cache");

    // Push to cloud
    await this.pushToGitHub(stats);
  },

  /**
   * PULL: Low-level GitHub Fetch
   */
  async pullFromGitHub(): Promise<UserStats> {
    const settings = await chrome.storage.sync.get(["githubToken", "githubOwner", "githubRepo"]);
    const { githubToken, githubOwner, githubRepo } = settings;

    if (!githubToken || !githubOwner || !githubRepo) {
      console.warn("GitHub not configured. Using temporary default stats.");
      return generateDefaultStats();
    }

    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${GITHUB_FILE_PATH}`;
    
    try {
      const response = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json" 
        }
      });

      if (response.status === 404) {
        console.log("Stats file not found. Creating new one...");
        const defaults = generateDefaultStats();
        await this.pushToGitHub(defaults); // Create the file
        return defaults;
      }

      const data = await response.json();
      const content = decodeBase64(data.content);
      const remoteStats = JSON.parse(content);

      // Update local cache with remote data
      await chrome.storage.local.set({ userStats: remoteStats });
      return remoteStats;

    } catch (error) {
      console.error("GitHub Pull Failed:", error);
      return generateDefaultStats(); // Fallback to prevent crash
    }
  },

  /**
   * PUSH: Low-level GitHub Write
   */
  async pushToGitHub(stats: UserStats): Promise<void> {
    const settings = await chrome.storage.sync.get(["githubToken", "githubOwner", "githubRepo"]);
    const { githubToken, githubOwner, githubRepo } = settings;

    if (!githubToken) return;

    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${GITHUB_FILE_PATH}`;
    const contentEncoded = unicodeBase64(JSON.stringify(stats, null, 2));

    // 1. Get SHA of existing file (for update)
    let sha: string | undefined;
    try {
      const getRes = await fetch(url, {
        headers: { Authorization: `Bearer ${githubToken}` }
      });
      if (getRes.ok) {
        const json = await getRes.json();
        sha = json.sha;
      }
    } catch (e) { /* Ignore if file doesn't exist */ }

    // 2. Upload
    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "sync: Update Beyonder Stats",
        content: contentEncoded,
        sha: sha
      })
    });
    console.log("Stats pushed to GitHub ☁️");
  }
};