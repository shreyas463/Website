export type ProjectCategory =
  | "Full Stack"
  | "Backend"
  | "AI"
  | "Cloud"
  | "Automation"
  | "Research";

export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  categories: ProjectCategory[];
  stack: string[];
  features: string[];
  image: string;
  github: string;
  demo?: string;
  featured?: boolean;
  architecture?: { component: string; detail: string }[];
}

export const projects: Project[] = [
  {
    id: "basis",
    title: "Basis",
    problem:
      "Most retail investors buy on hype and can't say why they own what they own.",
    solution:
      "An evidence-based investing workbench: deep stock research, honest statistical forecasts, and a $100k paper-trading engine with exact accounting — so you can practice a disciplined process before a single real dollar moves.",
    categories: ["Full Stack", "Backend"],
    stack: ["Next.js", "Flask", "Python", "Firebase", "Alpha Vantage"],
    features: [
      "Forecast Lab benchmarks statistical models (Damped Holt, AR) against a naive baseline by MAPE",
      "$100k paper-trading engine with exact accounting and real-time P/L",
      "Deep stock research with technical alerts (RSI, moving averages)",
    ],
    image: "/projects/basis/preview.png",
    github: "https://github.com/shreyas463/Stock-Analysis-platform",
    demo: "https://basis-retr.onrender.com/welcome",
    featured: true,
    architecture: [
      { component: "Next.js frontend", detail: "Research, forecast lab, paper-trading UI" },
      { component: "Flask API", detail: "Quotes, forecasts, orders, portfolio endpoints" },
      { component: "Forecast engine", detail: "Statistical models benchmarked by MAPE" },
      { component: "Firebase", detail: "Auth and real-time portfolio state" },
    ],
  },
  {
    id: "resume-analyzer",
    title: "AI-Powered Resume Analyzer",
    problem:
      "Job seekers rarely get objective feedback on how a resume reads to screeners and ATS systems.",
    solution:
      "A web app that builds professional resumes and scores them with AI-driven analysis and improvement suggestions.",
    categories: ["AI", "Full Stack"],
    stack: ["React", "Next.js", "AI/LLM", "Vercel"],
    features: [
      "Guided resume builder with clean templates",
      "AI analysis with actionable improvement suggestions",
      "Instant scoring across content and structure",
    ],
    image: "/projects/resume/3.1.png",
    github: "https://github.com/shreyas463/AI-Powered-Resume-Analyzer",
    demo: "https://ai-powered-resume-analyzer-63ld-5m0dx1zd9.vercel.app/",
    featured: true,
    architecture: [
      { component: "Next.js app", detail: "Builder UI and analysis dashboard" },
      { component: "LLM analysis layer", detail: "Resume parsing, scoring, suggestions" },
      { component: "Vercel", detail: "Deployment and serverless functions" },
    ],
  },
  {
    id: "spendwise",
    title: "SpendWise Desktop",
    problem:
      "Personal-finance apps demand cloud accounts and hand your bank data to third parties.",
    solution:
      "A local-first, fully offline desktop app that imports bank and credit-card statements (CSV or PDF) and turns them into categorized analytics, budgets, and a natural-language query interface — every byte processed on your own machine.",
    categories: ["Full Stack", "Automation"],
    stack: ["TypeScript", "Electron", "React", "Vite", "Tailwind CSS", "Recharts"],
    features: [
      "Smart CSV / PDF statement import with merchant extraction and ~150 auto-categorization rules",
      "Interactive dashboards, budgets with alerts, and exportable charts",
      "Natural-language query interface over your transactions",
    ],
    image: "/projects/spendwise/preview.png",
    github: "https://github.com/shreyas463/spendwise-desktop",
    demo: "https://shreyas463.github.io/spendwise-desktop/",
    featured: true,
    architecture: [
      { component: "Electron shell", detail: "Cross-platform desktop runtime" },
      { component: "React + Vite UI", detail: "Dashboards, analytics, budgets" },
      { component: "CSV engine", detail: "Multi-format parsing + merchant extraction" },
      { component: "Rule engine", detail: "~150 built-in auto-categorization rules" },
      { component: "Local store", detail: "Offline JSON / localStorage — no cloud" },
    ],
  },
  {
    id: "formula1won",
    title: "Formula1Won",
    problem:
      "Path-planning behavior in dynamic traffic is hard to reason about without a visual sandbox.",
    solution:
      "A self-driving car simulation navigating dynamic traffic with greedy pathfinding and collision avoidance.",
    categories: ["AI", "Research"],
    stack: ["Python", "Pathfinding", "Simulation"],
    features: [
      "Greedy pathfinding through moving traffic",
      "Collision-avoidance system",
      "Configurable traffic density and scenarios",
    ],
    image: "/projects/formula1one/7.gif",
    github: "https://github.com/shreyas463/Formula1Won",
    featured: true,
  },
  {
    id: "livesketch",
    title: "LiveSketch",
    problem: "Remote teams need a zero-friction shared canvas that feels instant.",
    solution:
      "A collaborative whiteboard desktop app with real-time multi-user drawing over WebSockets.",
    categories: ["Full Stack", "Backend"],
    stack: ["Electron", "Socket.io", "Canvas API", "Node.js"],
    features: [
      "Real-time synchronized drawing across clients",
      "Desktop app packaged with Electron",
      "Low-latency updates via Socket.io rooms",
    ],
    image: "/projects/livesketch/4.3.png",
    github: "https://github.com/shreyas463/LiveSketch",
    demo: "https://live-sketch.vercel.app",
    featured: true,
  },
  {
    id: "epidmi",
    title: "Disease Spread Simulation",
    problem:
      "Epidemic dynamics are unintuitive; simple charts hide how network structure drives spread.",
    solution:
      "An agent-based and social-network-based simulation visualizing disease propagation through a population.",
    categories: ["Research", "AI"],
    stack: ["Python", "Agent-Based Modeling", "Network Science"],
    features: [
      "Agent-based and network-based propagation models",
      "Visual simulation of infection dynamics",
      "Tunable transmission and recovery parameters",
    ],
    image: "/projects/epidmi/6.gif",
    github: "https://github.com/shreyas463/epidmi",
  },
  {
    id: "biosearch",
    title: "BioSearch-CPP",
    problem:
      "Students couldn't easily find Cal Poly Pomona biology faculty by research area.",
    solution:
      "A domain-specific search engine indexing faculty by research interests and expertise for the CPP Biology Department.",
    categories: ["Backend", "AI"],
    stack: ["Python", "Information Retrieval", "Web Crawling"],
    features: [
      "Custom crawler and index over faculty pages",
      "Ranked search by research interest",
      "Built for a real university department",
    ],
    image: "/projects/cs5180/bio.gif",
    github: "https://github.com/shreyas463/BioSearch-CPP",
  },
  {
    id: "prenba",
    title: "PreNBA",
    problem: "Sports fans bounce between apps for Premier League and NBA player info.",
    solution:
      "A responsive web app unifying Premier League and NBA player stats and information.",
    categories: ["Full Stack"],
    stack: ["React", "REST APIs", "Vercel"],
    features: [
      "Unified player search across two leagues",
      "Live stats via sports data APIs",
      "Responsive, mobile-first UI",
    ],
    image: "/projects/sportsinfoapp/preview.gif",
    github: "https://github.com/shreyas463/PreNBA",
    demo: "https://pre-nba.vercel.app",
  },
  {
    id: "bartender",
    title: "The Bartender",
    problem: "Cocktail recipes are scattered and hard to browse by what you have on hand.",
    solution:
      "An interactive cocktail discovery app with a React front end and a Laravel + GraphQL backend over TheCocktailDB.",
    categories: ["Full Stack", "Backend"],
    stack: ["React", "Tailwind CSS", "Laravel", "GraphQL"],
    features: [
      "GraphQL API over TheCocktailDB",
      "Ingredient-based recipe discovery",
      "Polished, responsive UI",
    ],
    image: "/projects/bartender/Thebartender.gif",
    github: "https://github.com/shreyas463/TheBartender",
  },
  {
    id: "pokeinfo",
    title: "PokeInfo Hub",
    problem: "Pokémon data is deep but fragmented across wikis.",
    solution: "A comprehensive Pokémon information center with fast search and rich detail pages.",
    categories: ["Full Stack"],
    stack: ["React", "PokéAPI", "REST APIs"],
    features: ["Fast search across all generations", "Rich stat and evolution views"],
    image: "/projects/Pokemon/1.gif",
    github: "https://github.com/shreyas463/PokeInfo-Hub",
  },
  {
    id: "virtual-art",
    title: "Virtual Art Gallery",
    problem: "Museum collections are hard to explore remotely.",
    solution:
      "An interactive gallery streaming artworks in real time from the MET Museum API.",
    categories: ["Full Stack", "Backend"],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "Live artwork data from the MET API",
      "Curated browsing experience",
      "Express + MongoDB backend",
    ],
    image: "/projects/artg/art.gif",
    github: "https://github.com/shreyas463/Virtual-art",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Full Stack",
  "Backend",
  "AI",
  "Cloud",
  "Automation",
  "Research",
];
