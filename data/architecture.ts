export interface ArchNode {
  id: string;
  label: string;
  description: string;
  technologies: string[];
  /** grid position, 12-col layout: [col, row] */
  x: number;
  y: number;
}

export interface ArchEdge {
  from: string;
  to: string;
}

/**
 * The "how I think about systems" diagram: a canonical production
 * architecture drawn from stacks I've actually shipped on.
 */
export const archNodes: ArchNode[] = [
  {
    id: "clients",
    label: "Client Apps",
    description: "Web and mobile frontends — responsive, accessible, and fast.",
    technologies: ["React", "Next.js", "React Native"],
    x: 0,
    y: 1,
  },
  {
    id: "cdn",
    label: "CDN / Edge",
    description: "Static assets and edge rendering close to users.",
    technologies: ["Vercel", "Edge caching"],
    x: 1,
    y: 0,
  },
  {
    id: "gateway",
    label: "API Gateway",
    description: "Single entry point: routing, rate limiting, request validation.",
    technologies: ["REST", "GraphQL"],
    x: 1,
    y: 1,
  },
  {
    id: "auth",
    label: "Auth",
    description: "Identity, sessions, and role-based access control.",
    technologies: ["OAuth 2.0", "JWT", "Firebase Auth"],
    x: 1,
    y: 2,
  },
  {
    id: "services",
    label: "Backend Services",
    description: "Domain services owning business logic, designed for testability.",
    technologies: ["Node.js", "Spring Boot", "FastAPI"],
    x: 2,
    y: 1,
  },
  {
    id: "queue",
    label: "Message Queue",
    description: "Async workflows and event-driven processing between services.",
    technologies: ["Events", "Pub/Sub"],
    x: 2,
    y: 0,
  },
  {
    id: "ai",
    label: "AI Services",
    description: "LLM and ML inference behind clean service boundaries.",
    technologies: ["Gemini", "PyTorch", "LLM APIs"],
    x: 2,
    y: 2,
  },
  {
    id: "cache",
    label: "Cache",
    description: "Hot-path reads served from memory, invalidated on write.",
    technologies: ["Redis-style caching"],
    x: 3,
    y: 0,
  },
  {
    id: "db",
    label: "Databases",
    description: "Relational for integrity, document stores for flexible domains.",
    technologies: ["PostgreSQL", "Firestore", "Cosmos DB"],
    x: 3,
    y: 1,
  },
  {
    id: "storage",
    label: "Object Storage",
    description: "Files, media, and large blobs with lifecycle policies.",
    technologies: ["Azure Storage", "S3-style"],
    x: 3,
    y: 2,
  },
  {
    id: "cicd",
    label: "CI/CD",
    description: "Automated test gates — unit, API, and E2E — before every release.",
    technologies: ["GitHub Actions", "Selenium", "Cucumber"],
    x: 4,
    y: 0,
  },
  {
    id: "cloud",
    label: "Cloud Infra",
    description: "Containerized workloads on managed cloud platforms.",
    technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
    x: 4,
    y: 1,
  },
  {
    id: "monitoring",
    label: "Monitoring",
    description: "Logs, metrics, and data-pipeline checks to catch drift early.",
    technologies: ["Databricks checks", "Alerting"],
    x: 4,
    y: 2,
  },
];

export const archEdges: ArchEdge[] = [
  { from: "clients", to: "cdn" },
  { from: "clients", to: "gateway" },
  { from: "gateway", to: "auth" },
  { from: "gateway", to: "services" },
  { from: "services", to: "queue" },
  { from: "services", to: "ai" },
  { from: "services", to: "cache" },
  { from: "services", to: "db" },
  { from: "services", to: "storage" },
  { from: "cicd", to: "cloud" },
  { from: "cloud", to: "services" },
  { from: "monitoring", to: "services" },
  { from: "monitoring", to: "db" },
];
