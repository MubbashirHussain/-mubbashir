import { FileSystem } from "./types";

// Define the simulated file system structure
export const FILE_SYSTEM: FileSystem = {
  "~": {
    type: "dir",
    contents: {
      projects: {
        type: "dir",
        description: "Directory containing key projects.",
      },
      about: {
        type: "dir",
        description: "Brief information about my skills and background.",
      },
      contact: { type: "dir", description: "Contact information." },
      "philosophy.md": {
        type: "file",
        description: "My core design philosophy.",
      },
      "README.md": {
        type: "file",
        description: "Welcome message and usage tips.",
      },
    },
  },
  "~/projects": {
    type: "dir",
    contents: {
      "nova.jsx": {
        type: "file",
        description: "Project Nova Dashboard (Live Demo)",
      },
      "tracker.ts": {
        type: "file",
        description: "Eco-Tracker App (Case Study)",
      },
      "chatbot.py": {
        type: "file",
        description: "AI Chatbot Backend (GitHub)",
      },
      "README.md": {
        type: "file",
        description: "Details about the projects folder.",
      },
    },
  },
  "~/about": {
    type: "dir",
    contents: {
      "profile.txt": { type: "file", description: "Detailed profile info." },
      "skills.md": { type: "file", description: "A list of key skills." },
    },
  },
  "~/contact": {
    type: "dir",
    contents: {
      "email.txt": {
        type: "file",
        description: "My professional email address.",
      },
      "linkedin.link": {
        type: "file",
        description: "Link to my LinkedIn profile.",
      },
    },
  },
};
