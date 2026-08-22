import { Code2, Globe, Cpu, Database, Wrench } from "lucide-react";

export const personalInfo = {
  name: "Arya Seth",
  title: "AI/ML & Python Backend Developer",
  description: "AI/ML intern with hands-on experience building REST APIs, backend services, authentication systems, and AI-powered applications using FastAPI and PostgreSQL.",
  bio: "I am an AI/ML and Python Backend Developer with hands-on experience building REST APIs, backend services, authentication systems, and AI-powered applications using FastAPI and PostgreSQL. I have a strong foundation in SQL, database optimization, NLP pipelines, and machine learning models, paired with strong analytical problem-solving skills.",
  objective: "To secure a challenging role as an AI/ML or Python Backend Developer where I can leverage my expertise in FastAPI, PostgreSQL, database designs, and machine learning integrations to write clean, optimized, and scalable services.",
  location: "Jaipur, Rajasthan, India",
  email: "setharya11@gmail.com",
  phone: "+91-7240589117",
  github: "https://github.com/setharya11",
  linkedin: "https://linkedin.com/in/setharya11",
  resumeUrl: "/resume.pdf",
};

export const education = [
  {
    institution: "JECRC University, Jaipur",
    degree: "Bachelor of Computer Applications (BCA)",
    duration: "Apr 2023 – Aug 2026",
    details: "Focus on Computer Science fundamentals, software development, database designs, and algorithmic analysis. CGPA: 8.7/10",
  }
];

export const interests = [
  "Retrieval-Augmented Generation (RAG)",
  "Natural Language Processing (NLP)",
  "API Design & Backend Architecture",
  "Database Query Optimization",
  "Competitive Programming"
];

export const strengths = [
  "FastAPI & RESTful APIs Development",
  "Relational Databases (PostgreSQL, MySQL)",
  "Vector Embeddings & Semantic Search (pgvector)",
  "JWT Authentication & System Security",
  "Problem Solving & Analytical Debugging"
];

export const skillGroups = [
  {
    name: "Programming",
    icon: Code2,
    skills: [
      { name: "Python", rating: 92 },
      { name: "C++", rating: 85 },
      { name: "SQL", rating: 90 },
    ],
  },
  {
    name: "Backend",
    icon: Cpu,
    skills: [
      { name: "FastAPI", rating: 92 },
      { name: "REST APIs", rating: 95 },
      { name: "JWT", rating: 88 },
      { name: "Pydantic", rating: 90 },
    ],
  },
  {
    name: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", rating: 90 },
      { name: "MySQL", rating: 85 },
      { name: "pgvector", rating: 88 },
    ],
  },
  {
    name: "AI/ML",
    icon: Globe,
    skills: [
      { name: "NLP", rating: 85 },
      { name: "Scikit-learn", rating: 80 },
    ],
  },
  {
    name: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", rating: 88 },
      { name: "GitHub", rating: 90 },
      { name: "VS Code", rating: 95 },
    ],
  },
];

export const experiences = [
  {
    company: "Dotsquares",
    position: "AI/ML Intern",
    duration: "Feb 2026 – July 2026",
    technologies: ["Python", "FastAPI", "PostgreSQL", "JWT", "Git"],
    responsibilities: [
      "Developed 30+ robust REST APIs using Python, FastAPI, and PostgreSQL for various service operations.",
      "Implemented JWT authentication, centralized logging, input validation, and custom error handling middleware.",
      "Debugged backend performance issues and optimized SQL queries to reduce response latencies.",
      "Collaborated using Git with frontend developers and QA teams to coordinate deployments and API schema definitions.",
    ],
  }
];

export const projects = [
  {
    id: "rag-chatbot",
    title: "RAG Chatbot System",
    description: "An advanced Retrieval-Augmented Generation chatbot pipeline using OpenAI APIs, embeddings, PostgreSQL, and pgvector.",
    fullDescription: "A fully functional Retrieval-Augmented Generation chatbot system that ingests document files, computes semantic vector embeddings, stores them in PostgreSQL with pgvector index, and retrieves context-aware answers to user queries.",
    features: [
      "Implemented RAG pipeline using OpenAI APIs, embeddings, PostgreSQL, and pgvector",
      "Developed 13+ REST APIs for authentication, document processing, and chat session management",
      "Reduced response latency by 40% through embedding query caching and index tuning",
      "Integrated JWT authentication for secure signup, login, and user-specific chat sessions"
    ],
    techStack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "OpenAI API"],
    githubUrl: "https://github.com/setharya11/rag-chatbot", // based on github profile setharya11
    liveUrl: "https://setharya11.github.io/",
    image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "resume-intel",
    title: "AI-Powered Resume Intelligence Platform",
    description: "An AI-powered resume analysis and scoring platform built using NLP models, FastAPI, and OpenRouterAPI.",
    fullDescription: "An AI-powered resume parsing and analysis platform. It reviews resume text content using Natural Language Processing and scoring criteria, checking matching keywords and rating compatibility with target descriptions.",
    features: [
      "Built an AI-powered resume analysis platform using Natural Language Processing",
      "Developed 8+ REST APIs for ATS scoring, resume parsing, and keyword matching",
      "Improved semantic search efficiency by 40% through indexing optimizations",
      "Leveraged OpenRouterAPI for lightweight LLM inference integrations"
    ],
    techStack: ["Python", "FastAPI", "PostgreSQL", "NLP", "OpenRouter API"],
    githubUrl: "https://github.com/setharya11",
    liveUrl: "https://setharya11.github.io/",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "task-management",
    title: "Task Management System with AI Assistant",
    description: "A full-stack collaborative workspace platform featuring role-based authentication and AI workflow automation.",
    fullDescription: "A robust task board and management system incorporating role-based access controls for Admin, Manager, and Employee users. Built with async database queries and automated workflow triggers.",
    features: [
      "Built a full-stack task management platform with role-based authentication for Admin, Manager, and Employee users",
      "Developed 40+ REST APIs using FastAPI, PostgreSQL, JWT, and SQLAlchemy for task operations and chatbot integration",
      "Designed scalable backend architecture with asynchronous APIs and optimized SQL queries",
      "Integrated AI-powered workflow automations to handle task dispatching and notification streams"
    ],
    techStack: ["Python", "FastAPI", "PostgreSQL", "JWT", "SQLAlchemy"],
    githubUrl: "https://github.com/setharya11",
    liveUrl: "https://setharya11.github.io/",
    image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "portfolio-website",
    title: "Premium Portfolio Website",
    description: "My personal developer portfolio website designed with glassmorphic cards, stars backgrounds, 3D card flips, interactive gauges, and custom toggle interactions.",
    fullDescription: "The exact portfolio website you are browsing! Engineered with static site export settings, high responsiveness, accessible navigation indices, and custom interactive panels showing live simulated stats and certificates.",
    features: [
      "Stunning 3D project card flipping animations using pure CSS",
      "Scrolling stars background matching deep-space theme specifications",
      "Mechanical physical toggle buttons controlling custom filters",
      "Optimized static rendering achieving 95+ performance metrics"
    ],
    techStack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    githubUrl: "https://github.com/setharya11/portfolio",
    liveUrl: "https://setharya11.github.io/",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
  }
];

export const certifications = [
  {
    title: "Deep Learning Fundamentals",
    issuer: "IBM Developer Skills Network",
    date: "Jan 2025",
    credentialId: "IBM-DL-2025-01",
    description: "Coursework validating skills in feedforward networks, convolutional neural networks, training parameters, and deep architectures optimization."
  },
  {
    title: "Machine Learning with Python",
    issuer: "IBM Developer Skills Network",
    date: "Jan 2025",
    credentialId: "IBM-ML-2025-02",
    description: "Coursework validating skills in classification, regression, clustering, model evaluation, and scikit-learn algorithmic pipelines."
  },
  {
    title: "Data Visualization",
    issuer: "IBM Developer Skills Network",
    date: "Jun 2024",
    credentialId: "IBM-DV-2024-06",
    description: "Coursework validating skills in representing complex quantitative relationships using matplotlib, seaborn, and customized graphing layouts."
  }
];

export const githubStats = {
  username: "setharya11",
  reposCount: 8,
  followersCount: 2,
  contributionsThisYear: 80,
  contributionData: [
    [0, 1, 0, 2, 0, 1, 0, 2, 0, 3, 2, 1, 0, 0, 1, 0, 3, 0, 1, 2, 0, 3, 0, 0, 2, 1],
    [0, 1, 0, 2, 0, 0, 2, 1, 0, 0, 1, 2, 3, 0, 2, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 2],
    [2, 0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 2, 1, 0, 3, 2, 0, 1, 0, 2, 1, 3, 0, 2, 1, 0],
    [1, 0, 2, 3, 0, 1, 0, 2, 0, 1, 0, 2, 0, 3, 2, 1, 0, 0, 1, 2, 0, 0, 1, 2, 0, 3],
    [0, 2, 1, 0, 3, 0, 2, 1, 0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 0, 2, 3, 1, 0, 2, 0, 3],
    [0, 3, 2, 1, 0, 0, 1, 2, 3, 0, 1, 2, 0, 3, 0, 0, 2, 1, 0, 3, 0, 2, 1, 0, 2, 1],
    [1, 0, 2, 0, 3, 2, 1, 0, 0, 1, 2, 3, 0, 1, 2, 0, 3, 0, 0, 2, 1, 0, 3, 2, 0, 1]
  ]
};

export const leetcodeStats = {
  username: "setharya11",
  solved: 481,
  total: 3450,
  streak: 431,
  contestRating: 1357,
  contestRank: "Rank #223,219",
  categories: {
    easy: { solved: 144, total: 840, color: "#10b981" },
    medium: { solved: 242, total: 1780, color: "#f59e0b" },
    hard: { solved: 95, total: 830, color: "#ef4444" }
  }
};
