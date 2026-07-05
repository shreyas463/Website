/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const sectionIds = [
  "about",
  "experience",
  "projects",
  "skills",
  "architecture",
  "publications",
  "github",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

export const navLinks: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "publications", label: "Research" },
  { id: "contact", label: "Contact" },
];
