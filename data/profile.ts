export const profile = {
  name: "Shreyas Chaudhary",
  monogram: "SC",
  headline: "Software Engineer",
  tagline:
    "Software Engineer building scalable full-stack systems, intelligent products, and reliable automation.",
  roles: [
    "Full-Stack Engineering",
    "Backend Systems",
    "AI Engineering",
    "Cloud Applications",
    "Test Automation",
  ],
  location: "Chicago, IL, USA",
  email: "shreyaschaudhary3@gmail.com",
  schoolEmail: "shreyasc@cpp.edu",
  availability: "Open to software engineering opportunities",
  currentRole: "Software Development Engineer @ GlobalLogic (Walgreens Boots Alliance)",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/shreyas463",
    linkedin: "https://www.linkedin.com/in/shreyaschaudharysc/",
    scholar: "https://scholar.google.com/citations?hl=en&user=gZP2TpoAAAAJ",
  },
  githubUsername: "shreyas463",
  siteUrl: "https://shreyaschaudhary.netlify.app",
  about: {
    intro:
      "I'm a software engineer working across full-stack development, backend systems, test automation, and AI-powered applications. I like turning ambiguous problems into clean, testable systems — and owning quality end to end.",
    highlights: [
      {
        label: "Scale",
        text: "Ship for pharmacy systems serving ~8,000 Walgreens locations and 9M+ daily customers",
      },
      {
        label: "Research",
        text: "4 peer-reviewed publications across autonomous vehicles, deep learning, and computer vision",
      },
      {
        label: "Academics",
        text: "M.S. Computer Science, Cal Poly Pomona — 4.0 GPA",
      },
      {
        label: "Range",
        text: "From React frontends to ROS2 robots to dark-web threat-intel pipelines",
      },
    ],
    interests: [
      "Distributed backend systems",
      "AI-enabled products",
      "Platform & developer tooling",
      "Quality engineering at scale",
    ],
    focus:
      "Currently focused on backend, full-stack, and forward-deployed engineering roles where I can own technically complex systems in production.",
    timeline: [
      { year: "2026", event: "SDE at GlobalLogic — Walgreens pharmacy inventory (RxI)" },
      { year: "2025", event: "M.S. Computer Science, Cal Poly Pomona (4.0 GPA) · Full-stack intern at Method" },
      { year: "2024", event: "SWE intern at GlobalLogic · Autonomous vehicle research at Cal Poly" },
      { year: "2023", event: "B.E. Computer Science · Started M.S. in California" },
    ],
  },
  testimonial: {
    quote:
      "I was lucky to mentor Shreyas during the 2024 summer internship program by GlobalLogic / Method. I was genuinely impressed by the level of commitment he has shown, curiosity and team spirit. He was able to deliver high quality solutions in the multi-team environment, that not only showcased his technical abilities but strong collaborative skills!",
    author: "Artem Paskhin",
    title: "Director, Engineering at GlobalLogic",
    linkedin: "https://www.linkedin.com/in/artempaskhin/",
    image: "/images/artem.jpeg",
    context: "GlobalLogic · 2024 Summer Internship",
  },
  photo: "/images/betterpic.jpg",
} as const;

export type Profile = typeof profile;
