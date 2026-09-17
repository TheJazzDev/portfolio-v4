import type { SiteLink } from '@/lib/types';

type Job = {
  title: string;
  company: string;
  period: string;
  location?: string;
  about: string;
  points: string[];
  skills?: string;
};

type LabelledLine = { label: string; value: string };

export const resume = {
  name: 'Taiwo Adewale Babarinde',
  headline: 'Senior Software Engineer',
  contactLine: 'babsman4all@gmail.com · +2349032073321 · Lagos, Nigeria',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwobabarinde/' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'Portfolio', href: 'https://jazzdev.vercel.app' },
  ] satisfies SiteLink[],
  summary:
    'Senior software engineer with 4+ years of experience building and scaling web applications across fintech, Web3, food delivery, and healthcare. Works mostly in React, Next.js, and TypeScript, and has led frontend teams and mentored junior developers.',
  summaryPoints: [
    'Led a team of 4 frontend developers building scalable accounting software with micro-frontend architecture',
    'Mentored 3 interns through to junior developer positions, establishing team best practices',
    'Evaluated 20,000+ lines of code, improving product optimization by 20% and developer productivity',
    'Shipped 7+ responsive web applications and several blockchain dApps',
  ],
  competencies: [
    {
      label: 'Frontend Development',
      value: 'React.js, Next.js, TypeScript, JavaScript (ES6+), React Native, Flutter, TailwindCSS, GSAP, Shadcn UI',
    },
    {
      label: 'Architecture & Performance',
      value: 'Micro Frontend Architecture, Component Design Systems, Performance Optimization, API Integration, Code Splitting',
    },
    {
      label: 'Leadership',
      value: 'Team Leadership, Mentorship, Code Review, Technical Documentation, Agile (Scrum/Kanban)',
    },
    {
      label: 'Developer Tools',
      value: 'Git, Docker, Firebase, Webpack, Redux, Jira, Slack',
    },
  ] satisfies LabelledLine[],
  experience: [
    {
      title: 'Front-End Developer (Freelance)',
      company: 'Food Junkee',
      period: 'Nov 2025 – Mar 2026',
      location: 'Remote',
      about: 'Full-stack food delivery platform specializing in African and Caribbean cuisine',
      points: [
        'Built production-ready food delivery web application using Next.js 16, React 19, and TypeScript with Firebase backend serving real customers',
        'Integrated Stripe payment processing with webhook handling and DPD Local UK shipping API for automated order fulfillment and thermal label printing',
        'Built the admin dashboard with role-based access control, order management, real-time analytics, and inventory tracking',
        'Implemented 30+ RESTful API endpoints with authentication, activity logging, and automated cleanup jobs deployed on Vercel with cron scheduling',
        'Designed complex checkout flow with cart persistence, delivery validation, and multi-service integration (Firebase, Resend email, QZ Tray printing)',
      ],
      skills: 'Next.js, React.js, TypeScript, Firebase, Stripe API, DPD API, Zustand, API Development',
    },
    {
      title: 'Lead Frontend Engineer',
      company: 'Candour IT Services',
      period: 'Jan 2024 – Present',
      location: 'Remote',
      about: 'IT solutions company providing innovative tech solutions to businesses worldwide',
      points: [
        'Leading a high-performing team of 4 frontend developers building scalable accounting software using micro-frontend architecture and 300+ integrated API endpoints',
        'Designed and built the micro-frontend architecture so teams could work and deploy independently',
        'Designed, developed, and maintained 7+ responsive web applications using React.js and Angular, serving thousands of users',
        'Mentored 3 interns from onboarding to junior developer positions, establishing coding standards and best practices',
        'Optimized applications for performance, identifying bottlenecks and reducing load times through profiling and code analysis',
      ],
      skills: 'React.js, Next.js, TypeScript, Micro Frontend Architecture, API Integration, Team Leadership',
    },
    {
      title: 'Front-End Developer',
      company: 'VastFluid Finance',
      period: 'Mar 2023 – May 2023',
      location: 'Remote',
      about: 'Next-generation decentralized exchange (DEX) built on the Arbitrum network (Web3)',
      points: [
        'Collaborated with design team to create intuitive, user-friendly frontend for blockchain DApp',
        'Developed fully responsive landing page with mobile-first approach; reduced bounce rates by 15%',
        'Optimized web architecture for scalability resulting in improved page load speed',
      ],
    },
    {
      title: 'Front-End Developer (Freelance)',
      company: 'DEFT Trader',
      period: 'Jan 2023 – Feb 2023',
      location: 'Remote',
      about: 'Forex brand helping traders and investors achieve profitability in forex markets',
      points: [
        'Designed and built a responsive multi-page forex website',
        'Implemented authentication system, admin panel, and database using Firebase',
        'Integrated REST APIs with Myfxbook to fetch real-time financial data',
      ],
    },
    {
      title: 'Strategy and Quality Assurance Manager',
      company: 'StableDoc',
      period: 'Oct 2021 – Dec 2022',
      about: 'Blockchain- and AI-powered telehealth platform providing global cross-boundary healthcare',
      points: [
        'Led a team of 2 designers and 6 developers that launched 5 products',
        'Evaluated 20,000+ lines of code across multiple projects, ensuring adherence to industry best practices',
        'Made the codebase easier to work in through code reviews and documentation',
        'Provided mentorship and technical guidance to junior developers, improving team efficiency',
      ],
      skills: 'Flutter, Code Review, Performance Optimization, Team Leadership, Product Development',
    },
  ] satisfies Job[],
  education: [
    'Harvard CS50X, Introduction to Computer Science, 2023',
    'React - The Complete Guide, Udemy, 2022',
    'The Complete 2022 Full-Stack Web Development Bootcamp, Udemy, 2022',
    'Responsive Web Design, freeCodeCamp, 2022',
  ],
  achievements: [
    'Mentored and hired 3 interns to junior developer positions, establishing industry best practices',
    'Evaluated 20,000+ lines of code, improving product optimization by 20%',
    'Shipped 5+ production applications across web, mobile, and blockchain platforms',
    'Designed micro-frontend architecture enabling scalable workflows and 300+ API integrations',
    'Led cross-functional teams of 8+ people and delivered products on time',
  ],
  additional: [
    { label: 'Work authorization', value: 'Nigerian citizen, open to visa sponsorship for international opportunities' },
    { label: 'Availability', value: 'Available for immediate start on remote or relocation opportunities' },
    { label: 'Languages', value: 'English (fluent), Yoruba (native)' },
    { label: 'Interests', value: 'Software architecture, team leadership and mentorship, Web3 and blockchain development' },
  ] satisfies LabelledLine[],
};

export type ResumeJob = Job;
export type ResumeLine = LabelledLine;
