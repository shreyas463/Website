export interface Repo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
}

/**
 * Static fallback shown when the GitHub API is unavailable or rate-limited.
 * Mirrors the featured repositories as of mid-2026.
 */
export const fallbackRepos: Repo[] = [
  {
    name: "Stock-Analysis-platform",
    description: "Full-stack Robinhood-style trading dashboard — Next.js + Flask.",
    url: "https://github.com/shreyas463/Stock-Analysis-platform",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "AI-Powered-Resume-Analyzer",
    description: "Resume builder with AI-driven scoring and suggestions.",
    url: "https://github.com/shreyas463/AI-Powered-Resume-Analyzer",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "LiveSketch",
    description: "Real-time collaborative whiteboard — Electron + Socket.io.",
    url: "https://github.com/shreyas463/LiveSketch",
    language: "JavaScript",
    stars: 0,
  },
  {
    name: "Formula1Won",
    description: "Self-driving car simulation with greedy pathfinding.",
    url: "https://github.com/shreyas463/Formula1Won",
    language: "Python",
    stars: 0,
  },
  {
    name: "BioSearch-CPP",
    description: "Search engine for CPP Biology faculty research interests.",
    url: "https://github.com/shreyas463/BioSearch-CPP",
    language: "Python",
    stars: 0,
  },
  {
    name: "epidmi",
    description: "Agent-based disease spread simulation.",
    url: "https://github.com/shreyas463/epidmi",
    language: "Python",
    stars: 0,
  },
];
