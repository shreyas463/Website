export interface Experience {
  id: string;
  company: string;
  client?: string;
  role: string;
  start: string;
  end: string;
  location: string;
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
      "Engineering and quality automation for RxI — the pharmacy inventory platform behind ~8,000 Walgreens locations and 9M+ daily customers.",
    bullets: [
      "Automated 120+ RxI pharmacy inventory features — quarantine entry, stock adjustments, audits, receiving, exception handling, and DSCSA compliance — enabling consistent regression coverage before weekly releases, using Java, Selenium WebDriver, and Cucumber BDD.",
      "Validate features end-to-end across UI workflows, REST APIs, and backend data systems using Postman, Cosmos DB, Azure Storage, and Databricks pipeline checks, keeping API responses, database records, and inventory events accurate across release and UAT environments.",
      "Partner with product, engineering, QA, and UAT teams to investigate defects and flag release blockers early, contributing to smoother deployments across handheld, desktop, and corporate platforms.",
    ],
    technologies: [
      "Java",
      "Selenium",
      "Cucumber BDD",
      "Postman",
      "Cosmos DB",
      "Azure",
      "Databricks",
      "REST APIs",
    ],
    details: [
      "Started on this team as an SDET intern and converted to full-time; my largest contribution has been expanding automation and validation coverage for enterprise pharmacy systems.",
      "Workflows covered include stock management, receiving, returns, audits, quarantine, and DSCSA regulatory compliance.",
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
    id: "method",
    company: "Method",
    role: "Full-Stack Engineering Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    location: "Charlotte, NC",
    summary:
      "Built TechDash, an internal technology catalog and project discovery platform for a global consulting firm.",
    bullets: [
      "Developed full-stack catalog and project-management modules — projects, technologies, tools, clients, timelines, and ownership in one place — using React, Next.js, TypeScript, Firebase, and Firestore, including Google Gemini-powered natural-language search.",
      "Built authentication and access control with Firebase Auth, protected routes, and role-based permissions for admins, editors, viewers, and project leads.",
      "Delivered a secure MVP that improved project discovery and knowledge sharing across Method's and GlobalLogic's 44,000+ employees, working in an agile team with designers and PMs.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Google Gemini",
      "Node.js",
    ],
  },
  {
    id: "av-lab",
    company: "Cal Poly Pomona",
    client: "Autonomous Vehicle Laboratory",
    role: "Research Assistant",
    start: "Aug 2024",
    end: "May 2025",
    location: "Pomona, CA",
    summary:
      "Autonomous campus ride-sharing research: mobile app, perception, and mapping for a self-driving campus vehicle.",
    bullets: [
      "Built a campus autonomous ride-sharing mobile app in React Native and Expo with real-time GPS tracking and YOLO-based obstacle detection.",
      "Published two papers at the 2025 ASEE PSW Conference covering CNN-based end-to-end vehicle control and equitable AV deployment frameworks.",
      "Implemented outdoor mapping with SLAM Toolbox and RViz2 on ROS2, improving localization accuracy and reducing collisions during testing.",
    ],
    technologies: ["React Native", "Expo", "ROS2", "YOLO", "SLAM", "Python", "PyTorch"],
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
    id: "globallogic-swe",
    company: "GlobalLogic",
    role: "Software Engineering Intern",
    start: "Jun 2024",
    end: "Aug 2024",
    location: "Austin, TX",
    summary:
      "Full-stack features for GLX, the company's internal learning platform used by 44,000+ employees worldwide.",
    bullets: [
      "Built a gamified quiz platform feature — creation, publishing, and response tracking — using React, Node.js, Firebase Functions, and Firestore, contributing to a 30% faster quiz rollout for training modules.",
      "Implemented real-time data workflows with Firestore and REST APIs so quiz content and responses updated live across the platform.",
      "Integrated Google SSO with OAuth 2.0 and JWT-based role access for learners, admins, and authors, contributing to a 25% improvement in learner engagement.",
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
