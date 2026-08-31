import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Monitor,
  Server,
  Brain,
  ShieldCheck,
  Cloud,
  Database,
  Wrench,
} from "lucide-react";

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    description: "Core languages for services, automation, and application logic.",
    icon: Code2,
    skills: ["Java", "Python", "JavaScript", "TypeScript", "Go", "SQL", "HTML/CSS"],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that are fast, accessible, and pleasant to use.",
    icon: Monitor,
    skills: ["React", "Next.js", "React Native", "Three.js / R3F", "Zustand", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs and services designed for correctness and scale.",
    icon: Server,
    skills: ["Microservices", "REST APIs", "gRPC", "Spring Boot", "Node.js / Express", "Flask", "Swagger/OpenAPI", "GraphQL"],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Applied ML, computer vision, and LLM-powered features.",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "OpenCV", "YOLO", "Google Gemini", "LLM Integration"],
  },
  {
    id: "testing",
    title: "Testing & Automation",
    description: "Automated regression, API, and data validation for enterprise release pipelines.",
    icon: ShieldCheck,
    skills: ["Rest Assured", "JUnit", "Selenium", "Postman", "Regression & Smoke Suites", "Page Object Model", "Vitest", "Playwright"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Deploying and operating systems in the cloud.",
    icon: Cloud,
    skills: ["Azure", "AWS", "GCP", "Docker", "Kubernetes", "Jenkins", "Azure DevOps", "GitHub Actions", "Linux"],
  },
  {
    id: "databases",
    title: "Data, Messaging & Observability",
    description: "Data stores, event streams, and the metrics that keep them honest.",
    icon: Database,
    skills: ["PostgreSQL", "Cosmos DB", "Firestore", "MongoDB", "Redis", "Kafka", "Databricks", "Azure Storage", "Prometheus", "Grafana"],
  },
  {
    id: "tools",
    title: "Developer Tools",
    description: "The everyday toolkit, including AI-assisted development.",
    icon: Wrench,
    skills: ["Git & GitHub", "Jira", "GitHub Copilot", "Claude Code", "Cursor", "Firebase"],
  },
];
