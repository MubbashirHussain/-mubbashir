import { Commands } from "./types";
import { TYPING_SPEED } from "./config";

// Define commands - this is reusable and can be easily extended
export const COMMANDS_BASE: Commands = {
  whoami: {
    output: [
      `Name: Mubbashir Hussain `,
      `Title: Full-Stack Developer & React native`,
      `Location: Earth, Orbit 7 (Remote)`,
      `Status: Online`,
      `----------------------------------------------`,
      `>> Type 'help' to see available commands.`,
    ],
    delay: TYPING_SPEED,
  },
  help: {
    output: [
      `Available Commands (Unix-like):`,
      `  whoami         - Display my core profile.`,
      `  ls             - List contents of current directory.`,
      `  cd <path>      - Change current directory ('cd ~' for home).`,
      `  pwd            - Print the current working directory.`,
      `  cat <file>     - Display content of a file (e.g., 'cat philosophy.md').`,
      `  clear          - Clear the terminal screen.`,
      `  sudo ls themes - See available color themes.`,
      `  sudo set theme <name> - Change the site's theme.`,
      `----------------------------------------------`,
      `Tip: Use ArrowUp/ArrowDown for command history.`,
    ],
    delay: TYPING_SPEED,
  },
  // Static file contents for cat in root (~)
  "cat ~/README.md": {
    output: [
      `# MUBBASHIR.DEV Portfolio Access`,
      `Welcome to the digital root. This interactive terminal is your access point to my portfolio.`,
      `  - Use 'ls' to list directories (projects, about, contact).`,
      `  - Use 'cd <directory>' to navigate.`,
      `  - Use 'cat <file>' to read file contents.`,
      `----------------------------------------------`,
      `Tip: Start with 'cd projects' or 'cat philosophy.md'.`,
    ],
    delay: TYPING_SPEED,
  },
  "cat ~/philosophy.md": {
    output: [
      `// philosophy.md`,
      `I believe in crafting digital experiences that are not just functional, but deeply intuitive and profoundly human. My work prioritizes:`,
      `  - User-Centric Design (UX): Empathy-driven interfaces.`,
      `  - Technical Excellence: Clean, performant, scalable code.`,
      `  - Accessibility: Inclusive design for all users.`,
      `  - Continuous Learning: Adapting to evolving tech landscapes.`,
      `----------------------------------------------`,
    ],
    delay: TYPING_SPEED,
  },

  // Static file contents for cat in ~/projects
  "cat ~/projects/README.md": {
    output: [
      `# Project Directory Overview`,
      `This directory showcases my major work samples.`,
      `Type 'ls' to see the projects, then 'cat <filename>' to view the case study summary or link.`,
    ],
    delay: TYPING_SPEED,
  },
  "cat ~/projects/nova.jsx": {
    output: [
      `// nova.jsx - Project Nova Dashboard`,
      `**Summary:** High-performance data visualization dashboard built in React (Zustand/Shadcn) and integrated with a GraphQL endpoint.`,
      `**Key Achievement:** Reduced initial load time by 40% using code splitting and virtualized lists.`,
      `**Access:** [LIVE DEMO LINK] (Placeholder for actual link)`,
    ],
    delay: TYPING_SPEED,
  },
  "cat ~/projects/tracker.ts": {
    output: [
      `// tracker.ts - Eco-Tracker App Case Study`,
      `**Summary:** TypeScript/Angular mobile application focusing on real-time carbon footprint tracking. Used RxJS extensively for state management.`,
      `**Architecture:** Monorepo structure utilizing Nx for shared utilities and services.`,
      `**Access:** [CASE STUDY PDF LINK] (Placeholder for actual link)`,
    ],
    delay: TYPING_SPEED,
  },
  "cat ~/projects/chatbot.py": {
    output: [
      `# chatbot.py - AI Chatbot Backend`,
      `**Summary:** Python backend (Flask/Langchain) utilizing the Gemini API for conversational AI, deployed via Docker on GCP.`,
      `**Integration:** Implemented a secure webhook system for external service communication.`,
      `**Access:** [GITHUB REPO LINK] (Placeholder for actual link)`,
    ],
    delay: TYPING_SPEED,
  },

  // Static file contents for cat in ~/about
  "cat ~/about/profile.txt": {
    output: [
      `[ PROFILE: MUBBASHIR ]`,
      `Years Experience: 10+ in full-stack architecture and engineering.`,
      `Specialization: High-performance React, Angular, and cloud-native backends (Node/Python).`,
      `Motto: "Build systems, not just features."`,
    ],
    delay: TYPING_SPEED,
  },
  "cat ~/about/skills.md": {
    output: [
      `## Technical Expertise`,
      `* Frontend: React, Redux/Zustand, Angular, TypeScript, Tailwind CSS`,
      `* Backend: Node.js (Express), Python (Django/Flask), Serverless Functions`,
      `* Data/Cloud: PostgreSQL, Firestore, Docker, Kubernetes, AWS/GCP`,
    ],
    delay: TYPING_SPEED,
  },

  // Static file contents for cat in ~/contact
  "cat ~/contact/email.txt": {
    output: [
      `Email: mubbashir.dev@proton.me`,
      `GPG Key: Available upon request.`,
    ],
    delay: TYPING_SPEED,
  },
  "cat ~/contact/linkedin.link": {
    output: [
      `LinkedIn Profile: https://linkedin.com/in/mubbashir-dev`,
      `GitHub: https://github.com/mubbashir-dev`,
    ],
    delay: TYPING_SPEED,
  },

  "sudo ls themes": {
    output: [
      `Available Themes:`,
      `  dark (current)`,
      `  light`,
      `----------------------------------------------`,
    ],
    delay: TYPING_SPEED,
  },
  "sudo make coffee": {
    output: [
      `Permission Denied: Insufficient caffeine level. Please provide actual coffee.`,
    ],
    delay: TYPING_SPEED,
  },
  error: {
    output: [`Error: Command not found. Type 'help' for a list of commands.`],
    delay: TYPING_SPEED / 2,
  },
};
