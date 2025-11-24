import { ResumeData } from "../types";

export const RESUME_DATA: ResumeData = {
  name: "Mubbashir M.hussain",
  title: "Full Stack Developer",
  location: "Karachi Division, Sindh, Pakistan",
  summary: "Building intelligent, user-first experiences with full-stack power and modern AI. I'm a Full Stack Developer with 2.5+ years of experience crafting fast, scalable web and mobile apps using React, React Native, and Next.js. I specialize in turning ideas into polished digital products combining performance, design, and functionality. Most recently, I've been diving into AI agents and generative AI.",
  contact: {
    phone: "+923272199402",
    email: "mubbashirmhussain@gmail.com",
    linkedin: "linkedin.com/in/mubbashirhussain",
    portfolio: "mubbashir-hussain-portfolio.web.app"
  },
  experience: [
    {
      company: "devxonic",
      role: "Full Stack Developer",
      period: "August 2024 - Present",
      description: "Developing efficient APIs and microservices using Node.js, Go (Golang), and Express. Leveraging Drizzle ORM for type-safe database workflows."
    },
    {
      company: "Freelance / Contract",
      role: "Junior Full Stack Developer",
      period: "May 2024 - November 2024",
      description: "Built scalable web and mobile apps. Focus on React Native and Next.js integration."
    },
    {
      company: "Astral Developers",
      role: "Mern Stack Developer",
      period: "February 2024 - April 2024",
      description: "Developed full-stack solutions using MongoDB, Express, React, and Node.js."
    }
  ],
  skills: [
    { name: "Go (Golang)", category: "backend" },
    { name: "Next.js", category: "frontend" },
    { name: "React Native", category: "frontend" },
    { name: "PostgreSQL", category: "database" },
    { name: "MongoDB", category: "database" },
    { name: "Drizzle ORM", category: "database" },
    { name: "Node.js", category: "backend" },
    { name: "Express", category: "backend" },
    { name: "AI Agents", category: "ai" },
    { name: "TypeScript", category: "frontend" }
  ]
};