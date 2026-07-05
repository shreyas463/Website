export interface Experience {
  id: string;
  company: string;
  client?: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  details?: string[];
  current?: boolean;
}

export const experience: Experience[] = [
  {
    id: "globallogic-sde",
    company: "GlobalLogic",
    client: "Walgreens Boots Alliance",
    role: "Software Development Engineer",
    start: "Mar 2026",
    end: "Present",
    location: "Chicago, IL",
    current: true,
    summary:
      "Engineering and quality automation for RxI — the pharmacy inventory platform behind 8,000 Walgreens stores and 9M+ daily patients.",
    bullets: [
      "Architected a Java/Selenium + Cucumber BDD framework of 300+ end-to-end scenarios across DSCSA compliance, audits, returns, and stock-management workflows for Walgreens' RxI pharmacy-inventory platform.",
      "Improved automated test coverage by 65% by adding Java integration tests to the Azure DevOps CI/CD pipeline, catching inventory-workflow regressions on every build before release.",
      "Cut manual validation time by 6 weeks by building an automated multi-layer validation pipeline that cross-checked API responses (Postman), stored records (Cosmos DB, Azure Storage), and Databricks output against functional, performance, audit, and access-control standards.",
      "Drove alignment on quality standards and test plans across 14+ releases serving 9M+ customers by presenting testing strategies to product managers, external clients, and business teams.",
      "Led defect and bug-triage meetings across Agile/Scrum sprints — identifying root causes, prioritizing high-impact issues, and contributing quality input in design and code reviews.",
    ],
    technologies: [
      "Java",
      "Selenium",
      "Cucumber BDD",
      "Azure DevOps",
      "Postman",
      "Cosmos DB",
      "Azure Storage",
      "Databricks",
      "CI/CD",
    ],
    details: [
      "Started on this team as an SDET intern and converted to full-time; my largest contribution has been expanding automation and validation coverage for enterprise pharmacy systems used across handheld, desktop, and corporate platforms.",
    ],
  },
  {
    id: "globallogic-sdet",
    company: "GlobalLogic",
    client: "Walgreens Boots Alliance",
    role: "SDET Intern",
    start: "Aug 2025",
    end: "Mar 2026",
    location: "Chicago, IL",
    summary:
      "Test automation for Walgreens RxI pharmacy inventory workflows: receiving, returns, audits, quarantine, and compliance.",
    bullets: [
      "Developed and maintained automated test coverage for RxI workflows with Java, Selenium WebDriver, and Cucumber BDD, improving regression testing and release validation.",
      "Performed frontend, API, and backend testing with Postman, Cosmos DB, Azure Storage, and Databricks to verify data accuracy across environments.",
      "Collaborated with developers, QA, product, and UAT stakeholders to investigate defects and validate business requirements for feature releases.",
    ],
    technologies: ["Java", "Selenium", "Cucumber", "Postman", "Cosmos DB", "Azure", "Databricks"],
  },
  {
    id: "method-fullstack",
    company: "Method, Inc.",
    role: "Full-Stack Engineering Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    location: "Charlotte, NC",
    summary:
      "Built TechDash, a technology-discovery platform unifying Method's fragmented catalogs into one searchable, AI-powered model.",
    bullets: [
      "Cut internal technology-discovery time by 60% for Method's 500-engineer org by building and shipping TechDash — a platform that unified 5 fragmented catalog types into one searchable model with Google Gemini-powered natural-language search.",
      "Designed and enforced organization-wide authorization by modeling a 3-tier RBAC scheme (admin/editor/viewer) with Firebase Auth middleware, server-protected routes, and indexed Firestore queries, making unauthorized access the default-hard path.",
      "Delivered real-time CRUD, cross-catalog entity linking, and multi-filter search by engineering full-stack modules in React, Next.js, TypeScript, and Node.js/Express backed by Firestore on Google Cloud Functions.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "Firebase",
      "Firestore",
      "Google Gemini",
      "GCP",
    ],
  },
  {
    id: "av-lab",
    company: "Cal Poly Pomona",
    client: "Autonomous Systems Lab",
    role: "Computer Science Researcher",
    start: "Aug 2024",
    end: "May 2025",
    location: "Pomona, CA",
    summary:
      "Autonomous campus ride-sharing research — perception, mapping, and a mobile app for a self-driving campus vehicle.",
    bullets: [
      "Reduced vehicle-location update latency by 30% across 10+ simulated campus routes by building a React Native/Expo autonomous ride-sharing app integrating ROS2, GPS tracking, and YOLO-based perception.",
      "Authored two ASEE Conference papers on autonomous vehicles — End-to-End Networks for Vehicle Control and Toward Equitable AV Deployment — covering CNN-based vehicle control and equitable AV deployment frameworks.",
    ],
    technologies: ["React Native", "Expo", "ROS2", "GPS", "YOLO", "CNNs", "PyTorch"],
  },
  {
    id: "calsys",
    company: "Cal Poly Pomona",
    client: "CALSys Lab",
    role: "Computer Science Researcher",
    start: "Jan 2025",
    end: "May 2025",
    location: "Pomona, CA",
    summary:
      "Cyber-threat intelligence research: turning unstructured dark-web content into structured data for ML pipelines.",
    bullets: [
      "Built Python + Selenium automation to collect and process data through Tor-based browsers from dark-web forums and marketplaces.",
      "Helped develop a cyberinfrastructure pipeline transforming unstructured threat content into structured PostgreSQL datasets usable for threat intelligence and ML workflows.",
      "Improved the existing threat-intelligence model with new features, identified data gaps, and contributed to a research paper abstract.",
    ],
    technologies: ["Python", "Selenium", "PostgreSQL", "Tor", "GitLab"],
  },
  {
    id: "method-swe",
    company: "Method, Inc.",
    role: "Software Engineering Intern",
    start: "Jun 2024",
    end: "Jul 2024",
    summary:
      "Full-stack features for an enterprise learning portal used by 44,000+ employees.",
    bullets: [
      "Lifted learner engagement by 25% across 44,000+ employees by building a gamified quiz platform (React, Node.js, Firebase Functions, Firestore) with assessments, skill-mastery tracking, and leaderboards inside an enterprise learning portal.",
      "Accelerated quiz rollout by 30% by engineering secure 3-role workflows (admin/author/learner) with Google SSO, OAuth 2.0, JWT access control, and REST APIs over Firestore.",
    ],
    technologies: ["React", "Node.js", "Firebase", "Firestore", "OAuth 2.0", "REST APIs"],
  },
  {
    id: "quantum",
    company: "Quantum Integrators",
    role: "SAP Intern",
    start: "Feb 2023",
    end: "Jun 2023",
    location: "Bangalore, India",
    summary: "SAP systems integration and data analysis across B4P, B4D, and B4 environments.",
    bullets: [
      "Integrated, debugged, and tested system components across SAP landscapes; documented and validated new features.",
      "Analyzed datasets using SAP BW S/4HANA and investigated technical issues across environments.",
    ],
    technologies: ["SAP BW S/4HANA", "Eclipse"],
  },
];

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  gpa: string;
  notes?: string;
}

export const education: Education[] = [
  {
    school: "California State Polytechnic University, Pomona",
    degree: "M.S. Computer Science",
    start: "Aug 2023",
    end: "May 2025",
    gpa: "4.0",
    notes:
      "Advanced Computer Architecture · Information Retrieval · Big Data & Cloud Computing · Advanced Algorithms · Advanced Software Engineering · Mobile App Development",
  },
  {
    school: "New Horizon College of Engineering, Bangalore",
    degree: "B.E. Computer Science",
    start: "Jun 2019",
    end: "May 2023",
    gpa: "3.75 / 4.0",
    notes: "Mobile App Development Club · Robotics Club",
  },
];
