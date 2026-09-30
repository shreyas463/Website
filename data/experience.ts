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
    id: "globallogic-swe",
    company: "GlobalLogic",
    client: "Walgreens Boots Alliance",
    role: "Software Engineer",
    start: "Mar 2026",
    end: "Present",
    location: "Chicago, IL · Hybrid",
    current: true,
    summary:
      "Data-validation services, the build and deploy path, and production debugging for RxI — the pharmacy inventory platform behind 8,000 Walgreens stores and 9M+ daily patients.",
    bullets: [
      "Built a Java reconciliation service for pharmacy-inventory data, detecting missing, delayed, and mismatched records across REST APIs, Cosmos DB, Azure Storage, and Databricks; eliminated nearly 6 weeks of manual validation per release.",
      "Added AI-assisted mismatch classification and investigation recommendations, reducing engineer triage time roughly 30%; evaluated against 100+ resolved mismatches with about 90% accuracy in identifying issue categories.",
      "Own the build and deploy path end to end, authoring Jenkins and Azure DevOps pipelines (Docker, Maven) that gate every release on DSCSA compliance, audit, returns, and stock-management checks, shipping 14+ releases.",
      "Debugged production failures across application, API, and data layers, isolating a race condition between batch jobs that produced inconsistent downstream records.",
    ],
    technologies: [
      "Java",
      "REST APIs",
      "Swagger/OpenAPI",
      "Cosmos DB",
      "Azure Storage",
      "Databricks",
      "Jenkins",
      "Azure DevOps",
      "Docker",
      "Maven",
      "CI/CD",
      "AI-assisted classification",
    ],
    details: [
      "The platform spans handheld, desktop, and corporate pharmacy systems, covering RxI workflows end to end — receiving, returns, audits, quarantine, and compliance.",
      "Participated in root cause analysis of production issues, contributing to preventive testing strategies that reduced defect leakage.",
      "Collaborated closely with developers, product owners, and business analysts in Agile Scrum ceremonies to define acceptance criteria and improve software quality.",
      "Refined requirements and user stories with product managers, participated in peer reviews of code and solution designs, and presented release readiness to external clients and stakeholders.",
    ],
  },
  {
    id: "globallogic-sdet",
    company: "GlobalLogic",
    client: "Walgreens Boots Alliance",
    role: "Software Development Engineer in Test, Internship",
    start: "Aug 2025",
    end: "Mar 2026",
    location: "Chicago, IL · Hybrid",
    summary:
      "Built the Java test-automation framework and API/database validation behind RxI's release gates.",
    bullets: [
      "Built Java/Selenium/Cucumber automation for 300+ pharmacy workflows across web, mobile, APIs, and backend systems, bringing targeted regression coverage to approximately 65%.",
      "Built performance-analysis tooling around JMeter, converting raw load-test output into p90/p95/p99 latency, throughput, and failure-rate reports to catch regressions before release.",
      "Built REST API and database validation with Rest Assured, Postman, and SQL, verifying payloads, authentication, and business logic against Swagger/OpenAPI contracts and cross-checking record integrity across 3 distributed data stores.",
    ],
    technologies: [
      "Java",
      "Selenium",
      "Cucumber",
      "JMeter",
      "TestNG",
      "Maven",
      "Page Object Model",
      "Rest Assured",
      "Postman",
      "SQL",
      "Swagger/OpenAPI",
    ],
    details: [
      "Developed and maintained end-to-end automated regression, smoke, and sanity test suites to ensure application stability across multiple releases.",
      "Automated REST API validation using Rest Assured and Postman, verifying request/response payloads, authentication, and business logic.",
      "Executed backend database validation using SQL, ensuring data integrity and consistency across distributed systems.",
      "Integrated automated test execution into Jenkins CI/CD pipelines, enabling continuous testing and rapid feedback during software deployments.",
      "Implemented the Page Object Model (POM) and reusable utility libraries to improve framework maintainability, scalability, and code quality.",
      "Performed cross-browser and cross-platform testing to ensure consistent user experience across Chrome, Edge, Firefox, and other supported environments.",
      "Identified, documented, and tracked software defects using Jira, working with development teams to resolve issues efficiently.",
      "Leveraged Git for source control, code reviews, branching strategies, and collaborative development workflows.",
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
      "Built and shipped TechDash in React, Next.js, and TypeScript, turning 5 fragmented technology catalogs into one searchable interface backed by Node.js and Firestore; cut discovery time 60% for a 500-engineer organization.",
      "Added natural-language search with Gemini, translating user questions into validated structured queries to help engineers find technologies, projects, tools, clients, and teams through one interface.",
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
      "Built a React Native/Expo interface for ride scheduling and live vehicle tracking, integrating GPS telemetry with ROS2 services across 10+ simulated campus routes; reduced location-update latency 30%.",
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
      "Built interactive assessments, skill-mastery tracking, scoring, and leaderboards in React, backed by Node.js and Firebase; increased learner engagement 25% on an enterprise platform used by 44,000+ employees.",
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
