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
    start: "Aug 2025",
    end: "Present",
    location: "Chicago, IL · Hybrid",
    current: true,
    summary:
      "Data-validation services, production incident response, and the build pipeline for RxI — the pharmacy inventory platform behind 8,000 Walgreens stores and 9M+ daily patients.",
    bullets: [
      "Designed and built an automated data-validation service (Java) for Walgreens' RxI pharmacy-inventory platform (8,000 stores, 9M+ daily patients), building a pipeline that reconciles REST API contracts (Rest Assured, Swagger/OpenAPI) against Cosmos DB, Azure Storage, and Databricks outputs, surfacing schema and data discrepancies before production and replacing 6 weeks of manual verification per cycle.",
      "Investigate and resolve production incidents across a regulated, high-availability distributed system, tracing each anomaly through the API and storage layers to isolate exactly where records diverged, then shipping both the fix and the guardrail — resolving 5–8 production anomalies per month.",
      "Own the build and deployment path end to end: authoring and maintaining 300+ automated Java scenarios across new and legacy features, accelerated by AI coding tools such as GitHub Copilot, and wiring them into Jenkins and Azure DevOps CI/CD gates (Docker, Linux) spanning DSCSA compliance, audits, returns, and stock management — raising automated coverage 65% and blocking regressions before deploy.",
      "Refine requirements and user stories with product managers, participate in peer reviews of code and solution designs, and present release readiness to external clients and stakeholders, shipping 14+ releases in Agile sprints.",
    ],
    technologies: [
      "Java",
      "Rest Assured",
      "Swagger/OpenAPI",
      "REST APIs",
      "Cosmos DB",
      "Azure Storage",
      "Databricks",
      "SQL",
      "Jenkins",
      "Azure DevOps",
      "Docker",
      "Linux",
      "CI/CD",
    ],
    details: [
      "The platform spans handheld, desktop, and corporate pharmacy systems, covering RxI workflows end to end — receiving, returns, audits, quarantine, and compliance.",
      "Developed and maintained end-to-end automated regression, smoke, and sanity test suites to ensure application stability across multiple releases.",
      "Collaborated closely with developers, product owners, and business analysts in Agile Scrum ceremonies to define acceptance criteria and improve software quality.",
      "Automated REST API validation using Rest Assured and Postman, verifying request/response payloads, authentication, and business logic.",
      "Executed backend database validation using SQL, ensuring data integrity and consistency across distributed systems.",
      "Integrated automated test execution into Jenkins CI/CD pipelines, enabling continuous testing and rapid feedback during software deployments.",
      "Implemented the Page Object Model (POM) and reusable utility libraries to improve framework maintainability, scalability, and code quality.",
      "Performed cross-browser and cross-platform testing to ensure consistent user experience across Chrome, Edge, Firefox, and other supported environments.",
      "Identified, documented, and tracked software defects using Jira, working with development teams to resolve issues efficiently.",
      "Leveraged Git for source control, code reviews, branching strategies, and collaborative development workflows.",
      "Participated in root cause analysis of production issues, contributing to preventive testing strategies that reduced defect leakage.",
      "Utilized Docker containers to maintain consistent test environments and support automated testing across multiple deployment stages.",
    ],
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
      "Engineered a real-time perception pipeline using YOLOv8, reducing false positives in pedestrian detection by 30% for safer navigation.",
      "Developed custom costmap layers in ROS2, improving AV navigation accuracy by 35% in dynamic environments.",
      "Optimized Gazebo simulation for AV testing, cutting real-world validation costs by 60% and accelerating model iteration speed.",
    ],
    technologies: ["React Native", "Expo", "ROS2", "Gazebo", "GPS", "YOLOv8", "CNNs", "PyTorch"],
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
