/* data.js — portfolio content, ported from portfolio-v3 (data/profile.ts + projects.ts).
   Plain JS objects; no framework, no build-time transform required. */

export const profile = {
  name: "Taiwo Babarinde",
  title: "Senior Frontend Engineer",
  tagline: "Building exceptional digital experiences",
  bio: `I'm a senior frontend engineer specializing in building high-performance web applications with React, Next.js, and TypeScript.

With experience leading frontend architecture for enterprise applications and crafting seamless user experiences, I bring both technical expertise and design sensibility to every project.

From micro-frontend architectures serving 50+ business users to DeFi platforms handling real-time blockchain transactions, I've built solutions that scale and perform.`,

  email: "babsman4all@gmail.com",
  github: "https://github.com/TheJazzDev",
  linkedin: "https://linkedin.com/in/taiwo-babarinde",
  twitter: "https://twitter.com/TaiwoJazz",

  skills: {
    frontend: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 & CSS3"],
    mobile: ["React Native", "Flutter", "Expo"],
    styling: ["TailwindCSS", "Styled Components", "SCSS/SASS", "CSS-in-JS"],
    backend: ["Node.js", "NestJS", "Firebase", "Django", "REST APIs"],
    animation: ["GSAP", "Framer Motion", "Three.js"],
    tools: [
      "Git & GitHub",
      "Prisma ORM",
      "Turbo Repo",
      "Redux & TanStack Query",
      "Web3.js",
      "Webpack & Vite",
    ],
    expertise: ["UI/UX Design", "LLM & AI Prompting", "Landing Pages", "Small Business Websites"],
  },

  experience: [
    {
      company: "Food Junkee",
      role: "Front-End Developer (Freelance)",
      period: "Nov 2025 – Present",
      location: "Remote",
      description: "Full-stack food delivery platform specializing in African and Caribbean cuisine",
      highlights: [
        "Built production-ready food delivery web application using Next.js 16, React 19, and TypeScript with Firebase backend serving real customers",
        "Integrated Stripe payment processing with webhook handling and DPD Local UK shipping API for automated order fulfillment and thermal label printing",
        "Developed comprehensive admin dashboard with role-based access control, order management, real-time analytics, and inventory tracking",
        "Implemented 30+ RESTful API endpoints with authentication, activity logging, and automated cleanup jobs deployed on Vercel with cron scheduling",
        "Designed complex checkout flow with cart persistence, delivery validation, and multi-service integration (Firebase, Resend email, QZ Tray printing)",
      ],
      skills:
        "Next.js | React.js | TypeScript | Firebase | Stripe API | DPD API | Zustand | API Development",
    },
    {
      company: "CANDOUR IT SERVICES",
      role: "Lead Frontend Engineer",
      period: "Jan 2024 – Present",
      location: "Remote",
      description: "IT solutions company providing innovative tech solutions to businesses worldwide",
      highlights: [
        "Leading a high-performing team of 4 frontend developers building scalable accounting software using micro-frontend architecture and 300+ integrated API endpoints",
        "Architected and implemented micro-frontend architecture enabling independent team workflows and seamless integration across services",
        "Designed, developed, and maintained 7+ responsive web applications using React.js and Angular, serving thousands of users",
        "Mentored 3 interns from onboarding to junior developer positions, establishing coding standards and best practices",
        "Optimized applications for performance, identifying bottlenecks and reducing load times through profiling and code analysis",
      ],
      skills:
        "React.js | Next.js | TypeScript | Micro Frontend Architecture | API Integration | Team Leadership",
    },
    {
      company: "VastFluid Finance",
      role: "Front-End Developer",
      period: "Mar 2023 – May 2023",
      location: "Remote",
      description: "Next-generation decentralized exchange (DEX) built on the Arbitrum network (Web3)",
      highlights: [
        "Collaborated with design team to create intuitive, user-friendly frontend for blockchain DApp",
        "Developed fully responsive landing page with mobile-first approach; reduced bounce rates by 15%",
        "Optimized web architecture for scalability resulting in improved page load speed",
      ],
      skills: "React.js | Web3.js | DeFi | Responsive Design",
    },
    {
      company: "DEFT Trader",
      role: "Front-End Developer (Freelance)",
      period: "Jan 2023 – Feb 2023",
      location: "Remote",
      description: "Forex brand helping traders and investors achieve profitability in forex markets",
      highlights: [
        "Designed and developed fully responsive multi-page Forex website with seamless UX",
        "Implemented authentication system, admin panel, and database using Firebase",
        "Integrated REST APIs with Myfxbook to fetch real-time financial data",
      ],
      skills: "React.js | Firebase | REST APIs | Authentication",
    },
    {
      company: "StableDoc",
      role: "Strategy and Quality Assurance Manager",
      period: "Oct 2021 – Dec 2022",
      location: "Remote",
      description: "Blockchain- and AI-powered telehealth platform providing global cross-boundary healthcare",
      highlights: [
        "Led cross-functional team of 2 designers and 6 developers to successfully launch 5 products",
        "Evaluated 20,000+ lines of code across multiple projects, ensuring adherence to industry best practices",
        "Made codebase 100% developer-friendly through comprehensive code reviews and documentation",
        "Provided mentorship and technical guidance to junior developers, improving team efficiency",
      ],
      skills:
        "Flutter | Code Review | Performance Optimization | Team Leadership | Product Development",
    },
  ],
};

/* Projects — ported from portfolio-v3/data/projects.ts.
   Rendered in array order; in-development work leads. */
export const projects = [
  {
    id: "settrium",
    title: "Settrium ERP",
    description: "Multi-tenant enterprise resource planning platform with database-per-tenant isolation",
    languages:
      "Next.js • React (RSC) • NestJS • TypeScript • Prisma ORM • PostgreSQL (Neon) • TanStack Query • Zod • Cloudflare R2 • Redis • BullMQ • Turborepo",
    category: "webapp",
    tags: ["ERP", "Enterprise", "Multi-Tenant", "Full-Stack", "Architecture", "Modular Monolith", "Fintech"],
    role: "Lead Architect & Full-Stack Developer",
    status: "In Active Development",
  },
  {
    id: "asiko-foods",
    title: "Asiko Foods",
    description: "Micro-frontend food commerce platform with retail storefront, B2B wholesale, and admin apps",
    languages:
      "Next.js 16 • React 19 • TypeScript • Zustand • React Hook Form • Zod • TailwindCSS v4 • Turborepo • Bun",
    category: "webapp",
    tags: ["Micro-Frontend", "E-commerce", "Food", "B2B", "Full-Stack", "Architecture", "Monorepo"],
    role: "Full-Stack Developer - Architecture & Implementation",
    status: "In Active Development",
  },
  {
    id: "olamide-sax-v2",
    title: "Olamide Sax Website (v2)",
    description: "Cinematic, framework-free website for an Afro-Fusion artist with a signature Breath Line interaction",
    languages: "HTML5 • CSS3 • Vanilla JavaScript (ES Modules) • GSAP",
    category: "website",
    tags: ["Music", "Artist Website", "Cinematic", "Animation", "GSAP", "Static Site"],
    role: "Frontend Developer",
    status: "In Active Development",
  },
  {
    id: "foodjunkee",
    title: "Food Junkee",
    description: "Full-stack food delivery platform for African & Caribbean cuisine",
    languages:
      "Next.js 16 • React 19 • TypeScript • Firebase • Stripe • TailwindCSS • GSAP • Framer Motion • Zustand • React Query • Resend • DPD API",
    category: "webapp",
    tags: ["Food Delivery", "E-commerce", "Full-Stack", "Next.js", "Firebase", "Stripe"],
    role: "Full-Stack Developer (Contract)",
    liveDemoLink: "https://foodjunkee.co.uk",
    githubLink: "https://github.com/C8nd0ur/food-junkee",
  },
  {
    id: "digit-tally",
    title: "Digit Tally App",
    description: "Scalable micro-frontend accounting system serving 50+ business users",
    languages: "Next.js • TypeScript • TanStack Query • Redux • Turbo Repo • TailwindCSS",
    category: "webapp",
    tags: ["Micro-Frontend", "Enterprise", "Accounting", "Finance", "Architecture", "NPM Packages"],
    role: "Lead Frontend Engineer - Architecture & Implementation",
    liveDemoLink: "https://app/digit-tally.io",
  },
  {
    id: "67-humanitarian-foundation",
    title: "67 Humanitarian Foundation",
    description: "Nigerian Army 67 Intake humanitarian initiative managing 3,600+ members",
    languages: "Next.js 14 • React 19 • TypeScript • Prisma ORM • PostgreSQL • TailwindCSS v4 • Shadcn/ui",
    category: "webapp",
    tags: ["Humanitarian", "Military", "Non-Profit", "Full-Stack", "Enterprise"],
    role: "Full-Stack Developer",
    liveDemoLink: "https://67hf.org",
  },
  {
    id: "vom-mobile-app",
    title: "VOM Church Management Platform",
    description: "Full-stack church community system with mobile app and admin dashboard",
    languages: "React Native • Expo SDK 54 • Next.js 15 • TypeScript • Firebase • Redux Toolkit • TanStack Query",
    category: "mobile",
    tags: ["Mobile", "React Native", "Next.js", "Firebase", "Full-Stack", "Community Platform"],
    role: "Lead Full-Stack Developer - Architecture & Implementation",
    status: "In Active Development",
  },
  {
    id: "olamide-sax",
    title: "Olamide Sax Portfolio",
    description: "Full-stack portfolio website with admin CMS for professional musician",
    languages: "Next.js 16 • React 19 • TypeScript • Prisma ORM • PostgreSQL • TailwindCSS v4 • Framer Motion",
    category: "website",
    tags: ["Music", "Portfolio", "CMS", "Full-Stack", "Media Gallery"],
    role: "Full-Stack Developer",
    githubLink: "https://github.com/TheJazzDev/olamide-sax",
  },
  {
    id: "vastfluid-dex",
    title: "VastFluid DEX",
    description: "Next-generation decentralized exchange built on Arbitrum network",
    languages: "Next.js • TypeScript • Web3.js • TailwindCSS • GSAP",
    category: "webapp",
    tags: ["DeFi", "Web3", "Blockchain", "Trading", "Crypto"],
    role: "Frontend Developer",
    liveDemoLink: "https://landing-page-tan-nine-56.vercel.app/",
  },
  {
    id: "defttrader",
    title: "Deft Trader",
    description: "Comprehensive forex trading platform with real-time market data",
    languages: "Next.js • TypeScript • Firebase • TailwindCSS • GSAP",
    category: "webapp",
    tags: ["Finance", "Trading", "Education", "Real-time"],
    role: "Frontend Developer (Freelance)",
    liveDemoLink: "https://defttrader.com",
  },
  {
    id: "typeguru",
    title: "TypeGuru",
    description: "Interactive typing practice platform with gamification",
    languages: "Django • Python • JavaScript • TailwindCSS",
    category: "webapp",
    tags: ["Education", "Productivity", "Gaming", "Full-Stack"],
    githubLink: "https://github.com/TheJazzDev/typeguru",
    liveDemoLink: "https://typeguru-jazzdev.vercel.app/",
  },
  {
    id: "dark-jazz-theme",
    title: "Dark Jazz VS Code Theme",
    description: "Popular VS Code theme with 1000+ downloads",
    languages: "JavaScript • JSON",
    category: "webapp",
    tags: ["VS Code", "Theme", "Developer Tools", "Open Source"],
    githubLink: "https://github.com/TaiwoJazz/Dark-Jazz",
    liveDemoLink:
      "https://marketplace.visualstudio.com/items?itemName=TaiwoJazz.dark-jazz&ssr=false#overview",
  },
];

export const stats = {
  yearsOfExperience: "4+",
  projectsCompleted: `${projects.length}+`,
  npmDownloads: "1000+",
  clients: "12+",
};
