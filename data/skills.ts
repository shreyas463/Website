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
    skills: ["Python", "Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that are fast, accessible, and pleasant to use.",
    icon: Monitor,
    skills: ["React", "Next.js", "React Native", "Tailwind CSS", "Electron", "Figma"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs and services designed for correctness and scale.",
    icon: Server,
    skills: ["Node.js", "Spring Boot", "FastAPI", "Flask", "REST APIs", "GraphQL"],
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
    description: "Quality engineering for enterprise release pipelines.",
    icon: ShieldCheck,
    skills: ["Selenium", "Cucumber BDD", "TestNG", "JUnit", "Appium", "JMeter", "Postman"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Deploying and operating systems in the cloud.",
    icon: Cloud,
    skills: ["AWS (Lambda, EC2, EKS, ECS)", "Azure DevOps", "Docker", "Kubernetes", "CI/CD", "Vercel"],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational, document, and cloud-native data stores.",
    icon: Database,
    skills: ["PostgreSQL", "Firestore", "Cosmos DB", "MongoDB", "Azure Storage", "Databricks"],
  },
  {
    id: "tools",
    title: "Developer Tools",
    description: "The everyday toolkit, including AI-assisted development.",
    icon: Wrench,
    skills: ["Git & GitHub", "Unix", "Jira", "Claude Code", "Cursor", "Firebase"],
  },
];
