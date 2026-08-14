export interface Repo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
}

/**
 * Static fallback shown when the GitHub API is unavailable or rate-limited.
 * Mirrors the featured repositories as of August 2026.
 */
export const fallbackRepos: Repo[] = [
  {
    name: "WalletLens",
    description: "Free, open-source Rocket Money — Plaid sync and subscription detection.",
    url: "https://github.com/shreyas463/WalletLens",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "tally",
    description: "High-throughput event counting service in Go with from-scratch HyperLogLog.",
    url: "https://github.com/shreyas463/tally",
    language: "Go",
    stars: 0,
  },
  {
    name: "rackLAB",
    description: "Walkable 3D data-center simulator with live thermal and power chains.",
    url: "https://github.com/shreyas463/rackLAB",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "2026-fifa-world-cup-final-predictor",
    description: "Knockout-stage World Cup predictor with an interactive bracket.",
    url: "https://github.com/shreyas463/2026-fifa-world-cup-final-predictor",
    language: "TypeScript",
    stars: 1,
  },
  {
    name: "Stock-Analysis-platform",
    description: "Basis — evidence-based investing workbench, Next.js + Flask.",
    url: "https://github.com/shreyas463/Stock-Analysis-platform",
    language: "TypeScript",
    stars: 1,
  },
  {
    name: "AI-Powered-Resume-Analyzer",
    description: "Resume builder with transparent scoring and ATS analysis.",
    url: "https://github.com/shreyas463/AI-Powered-Resume-Analyzer",
    language: "TypeScript",
    stars: 0,
  },
];
