export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  contribution: string;
  technologies: string[];
  link: string;
}

export const publications: Publication[] = [
  {
    id: "e2e-vehicle-control",
    title: "End to End Networks for Vehicle Control",
    venue: "2025 ASEE PSW Conference",
    year: "2025",
    abstract:
      "CNN-based end-to-end control systems for autonomous vehicles, mapping camera input directly to steering decisions on a campus vehicle platform.",
    contribution:
      "Co-authored the paper; contributed to the perception stack and on-vehicle experimentation in the Cal Poly Pomona AV Lab.",
    technologies: ["CNNs", "PyTorch", "ROS2", "Computer Vision"],
    link: "https://peer.asee.org/end-to-end-networks-for-vehicle-control",
  },
  {
    id: "equitable-av",
    title: "Toward Equitable Autonomous Vehicle Deployment",
    venue: "2025 ASEE PSW Conference",
    year: "2025",
    abstract:
      "A framework for deploying autonomous vehicle services equitably, using a campus ride-sharing pilot as the case study.",
    contribution:
      "Co-authored the paper; built the React Native ride-sharing app and real-time tracking used in the pilot.",
    technologies: ["React Native", "GPS", "Autonomous Systems"],
    link: "https://peer.asee.org/toward-equitable-autonomous-vehicle-deployment",
  },
  {
    id: "law-enforcement-companion",
    title: "Law Enforcement Companion",
    venue: "2022 Intl. Conference on Smart Generation Computing, Communication and Networking",
    year: "2023",
    abstract:
      "A deep-learning-assisted companion system supporting law enforcement workflows with computer vision.",
    contribution: "Co-authored the paper and contributed to model development and evaluation.",
    technologies: ["Deep Learning", "Computer Vision"],
    link: "https://ieeexplore.ieee.org/document/10083546",
  },
  {
    id: "dl-law-enforcement-ally",
    title: "Utilizing Deep Learning as a Law Enforcement Ally",
    venue: "2023 3rd Intl. Conference on Smart Data Intelligence (ICSMDI)",
    year: "2023",
    abstract:
      "Deep learning approaches for public-safety applications, extending prior work on vision-based law-enforcement support systems.",
    contribution: "Co-authored the paper and contributed to experiments and analysis.",
    technologies: ["Deep Learning", "Cloud AI"],
    link: "https://ieeexplore.ieee.org/abstract/document/10127890",
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  link: string;
}

export const certifications: Certification[] = [
  {
    id: "ai-hackathon",
    title: "AI Hackathon 2025",
    issuer: "Cal Poly Pomona",
    issued: "Apr 2025",
    link: "https://badgr.com/public/assertions/3GHX6pldS36ZoWH2-OE-ew",
  },
  {
    id: "workato-1",
    title: "Automation Pro I",
    issuer: "Workato",
    issued: "Apr 2025",
    link: "https://verify.skilljar.com/c/szyktcq3wn3q",
  },
  {
    id: "workato-2",
    title: "Automation Pro II",
    issuer: "Workato",
    issued: "Apr 2025",
    link: "https://credentials.workato.com/b311b5e9-0c3d-4e2c-a9dc-91a6026a4a24#acc.QJTP1Xmx",
  },
  {
    id: "workato-3",
    title: "Automation Pro III",
    issuer: "Workato",
    issued: "May 2025",
    link: "https://verify.skilljar.com/c/pgzf4vp5g67n",
  },
  {
    id: "databricks-genai",
    title: "Generative AI Fundamentals",
    issuer: "Databricks",
    issued: "Sep 2024",
    link: "https://credentials.databricks.com/62de9f0b-be77-499b-b1ff-d19bc519c9b1#acc.C90FAWo2",
  },
  {
    id: "stanford-ml",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI · Stanford University",
    issued: "Sep 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/X15PXZ7Z6EJS",
  },
];
