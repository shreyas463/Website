import { profile } from "@/data/profile";
import { experience, education } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { publications, certifications } from "@/data/publications";

/**
 * A fully client-side "chat with my resume" knowledge base. Answers are
 * derived from the same typed data that drives the rest of the site, so the
 * bot stays in sync as content changes. Matching is keyword-based — no LLM,
 * no API key, no network.
 */

export interface ChatAnswer {
  paragraphs: string[];
  bullets?: string[];
  /** Rendered as buttons. Internal hrefs (starting with "#") scroll the page. */
  links?: { label: string; href: string }[];
}

interface Intent {
  id: string;
  /** Whole-word (or phrase) triggers, lowercased. */
  keywords: string[];
  /** If set, shown as a clickable suggested question. */
  suggestion?: string;
  answer: () => ChatAnswer;
}

const linkedinHandle = profile.social.linkedin
  .replace(/^https?:\/\/(www\.)?/, "")
  .replace(/\/$/, "");

const current = experience[0];

// Builds a dedicated, detailed intent for a single project, sourced from the
// same projects data so it never drifts out of sync.
function projectIntent(id: string, keywords: string[], suggestion: string): Intent {
  return {
    id,
    suggestion,
    keywords,
    answer: () => {
      const p = projects.find((x) => x.id === id);
      if (!p) {
        return { paragraphs: ["That one isn't listed right now — try “show me his projects”."] };
      }
      return {
        paragraphs: [`${p.problem} ${p.solution}`],
        bullets: p.features,
        links: [
          ...(p.demo ? [{ label: "Live demo", href: p.demo }] : []),
          { label: "Source on GitHub", href: p.github },
          { label: "See it in the projects grid", href: "#projects" },
        ],
      };
    },
  };
}

// Ordered by specificity — earlier intents win ties.
const INTENTS: Intent[] = [
  {
    id: "now",
    suggestion: "What's he working on now?",
    keywords: ["now", "currently", "current", "these days", "at the moment", "present", "today", "working on"],
    answer: () => ({
      paragraphs: [
        `Right now he's a ${current.role} at ${current.company}${current.client ? ` (${current.client})` : ""}, ${current.start}–${current.end}.`,
        current.summary,
      ],
      links: [{ label: "See experience", href: "#experience" }],
    }),
  },
  projectIntent(
    "racklab",
    ["racklab", "rack lab", "data center", "datacenter", "3d simulator", "server hall", "cooling"],
    "Tell me about RackLAB",
  ),
  projectIntent(
    "wc2026",
    ["world cup", "world cup predictor", "fifa", "predictor", "wc2026", "monte carlo"],
    "Tell me about the World Cup Predictor",
  ),
  {
    id: "projects",
    suggestion: "Show me his projects",
    keywords: ["project", "projects", "built", "build", "portfolio", "apps", "application", "side project", "basis", "spendwise", "resume analyzer", "livesketch", "made"],
    answer: () => {
      const feat = projects.filter((p) => p.featured).slice(0, 5);
      return {
        paragraphs: ["A few highlights from his portfolio:"],
        bullets: feat.map((p) => `${p.title} — ${p.solution.split(" — ")[0].split(". ")[0]}.`),
        links: [{ label: "Browse all projects", href: "#projects" }],
      };
    },
  },
  {
    id: "skills",
    suggestion: "What's his tech stack?",
    keywords: ["skill", "skills", "tech", "stack", "technologies", "technology", "languages", "language", "tools", "proficient", "know", "frameworks"],
    answer: () => ({
      paragraphs: ["His toolkit, by area:"],
      bullets: skillCategories.map((c) => `${c.title}: ${c.skills.slice(0, 5).join(", ")}`),
    }),
  },
  {
    id: "ai",
    suggestion: "Tell me about his AI/ML work",
    keywords: ["ai", "ml", "machine learning", "artificial intelligence", "model", "models", "pytorch", "yolo", "cnn", "cnns", "llm", "gemini", "forecasting", "deep learning", "computer vision"],
    answer: () => ({
      paragraphs: [
        "On the AI/ML side: a 2026 World Cup predictor trained on 49k real international matches (Elo ratings, a validated match-outcome model, and Monte Carlo tournament simulation), CNN-based end-to-end vehicle control and YOLO perception for autonomous vehicles, LLM features with Google Gemini (natural-language search at Method), and statistical forecasting in Basis.",
        "Tools: PyTorch, TensorFlow, scikit-learn, OpenCV, YOLO, Google Gemini, and LLM APIs.",
      ],
    }),
  },
  {
    id: "testing",
    suggestion: "What's his testing / QA experience?",
    keywords: ["testing", "test", "tests", "qa", "sdet", "automation", "selenium", "cucumber", "playwright", "quality", "bdd"],
    answer: () => ({
      paragraphs: [
        "Quality engineering is a big part of his story. At GlobalLogic (Walgreens RxI) he architected a Java/Selenium + Cucumber BDD framework of 300+ end-to-end scenarios and lifted automated test coverage by 65% through the Azure DevOps CI/CD pipeline.",
        "Testing tools: Selenium, Playwright, Cucumber/Gherkin (BDD), TestNG, JUnit, Appium, JMeter, and Postman.",
      ],
    }),
  },
  {
    id: "backend",
    keywords: ["backend", "back-end", "api", "apis", "server", "flask", "spring", "spring boot", "fastapi", "node", "database", "databases", "sql"],
    answer: () => ({
      paragraphs: [
        "Backend: he builds services in Node.js, Spring Boot, FastAPI, and Flask, with REST and GraphQL APIs — for example the Flask API powering Basis and the Firebase/Firestore backends at Method.",
        "Data stores: PostgreSQL, Firestore, Cosmos DB, and MongoDB.",
      ],
    }),
  },
  {
    id: "frontend",
    keywords: ["frontend", "front-end", "react", "ui", "next.js", "nextjs", "next js", "tailwind", "react native", "typescript"],
    answer: () => ({
      paragraphs: [
        "Frontend: React, Next.js, and React Native with TypeScript and Tailwind. He shipped internal platforms like TechDash at Method — and this portfolio itself is Next.js + React Three Fiber.",
      ],
    }),
  },
  {
    id: "cloud",
    keywords: ["cloud", "aws", "azure", "devops", "docker", "kubernetes", "ci/cd", "cicd", "deployment", "infrastructure", "gcp"],
    answer: () => ({
      paragraphs: [
        "Cloud & DevOps: AWS (Lambda, EC2, EKS, ECS), Azure DevOps, GCP, Docker, Kubernetes, and CI/CD pipelines.",
      ],
    }),
  },
  {
    id: "experience",
    suggestion: "Walk me through his experience",
    keywords: ["experience", "work", "worked", "job", "jobs", "career", "companies", "company", "background", "history", "walgreens", "globallogic", "method", "employment", "intern", "internship"],
    answer: () => ({
      paragraphs: ["Here's his work history:"],
      bullets: experience.map(
        (e) => `${e.role} — ${e.company}${e.client ? ` · ${e.client}` : ""} (${e.start}–${e.end})`,
      ),
      links: [{ label: "See full experience", href: "#experience" }],
    }),
  },
  {
    id: "education",
    keywords: ["education", "degree", "degrees", "school", "university", "gpa", "study", "studied", "masters", "master", "bachelor", "college", "grade", "academic"],
    answer: () => ({
      paragraphs: ["Education:"],
      bullets: education.map((e) => `${e.degree}, ${e.school} (${e.end}) — GPA ${e.gpa}`),
    }),
  },
  {
    id: "publications",
    suggestion: "Has he published research?",
    keywords: ["publication", "publications", "paper", "papers", "research", "published", "ieee", "asee", "conference", "author"],
    answer: () => ({
      paragraphs: ["He's co-authored 4 peer-reviewed papers:"],
      bullets: publications.map((p) => `${p.title} — ${p.venue} (${p.year})`),
      links: [{ label: "See research", href: "#publications" }],
    }),
  },
  {
    id: "certifications",
    keywords: ["certification", "certifications", "certificate", "certificates", "certified", "workato", "databricks", "coursera", "credential"],
    answer: () => ({
      paragraphs: ["Certifications:"],
      bullets: certifications.map((c) => `${c.title} — ${c.issuer} (${c.issued})`),
    }),
  },
  {
    id: "availability",
    suggestion: "Is he open to work?",
    keywords: ["available", "availability", "open to work", "hiring", "hire", "opportunity", "opportunities", "looking", "job search", "roles", "role", "recruit"],
    answer: () => ({
      paragraphs: [`${profile.availability}. ${profile.about.focus}`],
      links: [
        { label: "Get in touch", href: "#contact" },
        { label: "Download resume", href: profile.resumeUrl },
      ],
    }),
  },
  {
    id: "contact",
    suggestion: "How do I reach him?",
    keywords: ["contact", "email", "reach", "get in touch", "linkedin", "github", "connect", "message", "e-mail", "mail"],
    answer: () => ({
      paragraphs: ["Best ways to reach him:"],
      bullets: [
        `Email: ${profile.email}`,
        `LinkedIn: ${linkedinHandle}`,
        `GitHub: github.com/${profile.githubUsername}`,
      ],
      links: [
        { label: "Email", href: `mailto:${profile.email}` },
        { label: "LinkedIn", href: profile.social.linkedin },
        { label: "GitHub", href: profile.social.github },
      ],
    }),
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "download", "pdf"],
    answer: () => ({
      paragraphs: ["You can grab his resume here:"],
      links: [{ label: "Download resume (PDF)", href: profile.resumeUrl }],
    }),
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "live", "lives", "city", "relocate", "remote", "chicago"],
    answer: () => ({
      paragraphs: [`He's based in ${profile.location}.`],
    }),
  },
  {
    id: "strengths",
    suggestion: "Why should we hire him?",
    keywords: ["why hire", "why should", "strength", "strengths", "best", "good at", "stand out", "unique", "pitch", "sell", "special"],
    answer: () => ({
      paragraphs: [
        "Quick pitch: he spans full-stack, backend, and quality engineering, and has shipped at real scale — pharmacy systems serving ~8,000 Walgreens stores and 9M+ daily patients.",
        "He's also research-published (4 papers) with a 4.0 M.S. in CS, and is happiest turning ambiguous problems into clean, testable, production systems.",
      ],
      links: [{ label: "Get in touch", href: "#contact" }],
    }),
  },
  {
    id: "hobbies",
    keywords: ["hobby", "hobbies", "fun", "outside work", "free time", "soccer", "gym", "formula 1", "f1", "interests", "personal"],
    answer: () => ({
      paragraphs: [
        "Outside of code he's into soccer, the gym, and Formula 1 — there's even a Formula1Won project in his portfolio.",
      ],
    }),
  },
  {
    id: "about",
    suggestion: "Who is Shreyas?",
    keywords: ["who", "about", "yourself", "himself", "intro", "introduce", "summary", "overview", "tell me about", "background"],
    answer: () => ({
      paragraphs: [profile.about.intro],
      bullets: profile.about.highlights.map((h) => `${h.label}: ${h.text}`),
    }),
  },
];

const GREETINGS = ["hi", "hello", "hey", "yo", "sup", "greetings", "howdy", "hiya"];

function normalize(text: string): string {
  return ` ${text.toLowerCase().replace(/[^\w\s#+./-]/g, " ").replace(/\s+/g, " ").trim()} `;
}

function keywordHits(haystack: string, keyword: string): number {
  const k = keyword.toLowerCase();
  if (k.includes(" ")) return haystack.includes(k) ? 1 : 0;
  // Whole-word match for single tokens so "ai" doesn't match "email".
  const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|\\s)${escaped}(\\s|$)`).test(haystack) ? 1 : 0;
}

export interface ChatResult {
  intentId: string;
  answer: ChatAnswer;
}

/** Suggested questions surfaced as chips. */
export const SUGGESTIONS: { label: string; intentId: string }[] = INTENTS.filter(
  (i) => i.suggestion,
).map((i) => ({ label: i.suggestion!, intentId: i.id }));

export function answerByIntent(intentId: string): ChatResult {
  const intent = INTENTS.find((i) => i.id === intentId) ?? INTENTS.find((i) => i.id === "about")!;
  return { intentId: intent.id, answer: intent.answer() };
}

export function matchIntent(input: string): ChatResult {
  const haystack = normalize(input);
  const trimmed = input.toLowerCase().trim();

  // Pure greeting with no other content
  if (GREETINGS.includes(trimmed)) {
    return {
      intentId: "greeting",
      answer: {
        paragraphs: [
          `Hi! I'm ${profile.name}'s resume assistant. Ask me about his experience, projects, skills, education, or how to get in touch.`,
        ],
      },
    };
  }

  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      score += keywordHits(haystack, kw) * (kw.includes(" ") ? 2 : 1);
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (best && bestScore > 0) {
    return { intentId: best.id, answer: best.answer() };
  }

  return {
    intentId: "fallback",
    answer: {
      paragraphs: [
        "I'm not sure about that one — I mainly know about Shreyas's experience, projects, skills, education, research, and how to reach him. Try one of the suggestions below.",
      ],
    },
  };
}

export const INITIAL_MESSAGE: ChatAnswer = {
  paragraphs: [
    `Hi 👋 I'm ${profile.name}'s resume assistant. Ask me anything about his work, projects, or skills — or tap a suggestion below.`,
  ],
};
