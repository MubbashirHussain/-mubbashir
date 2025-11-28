import { Palette } from "./types";

// Terminal color palettes for different themes
export const PALETTES: Record<string, Palette> = {
  dark: {
    bg: "#1f1f1f",
    terminalBg: "#1a1a1a",
    text: "#ffffff",
    accent: "#ffffff",
    headerBg: "#282828",
    terminalBorder: "#b3ff0044",
  },
  light: {
    bg: "#f0f0f0",
    terminalBg: "#ffffff",
    text: "#1a1a1a",
    accent: "#1a1a1a",
    headerBg: "#e0e0e0",
    terminalBorder: "#007acc44",
  },
};

export const TYPING_SPEED = 15;
export const MIN_HEIGHT = 48; // Minimum height for the terminal (header bar height)
export const INITIAL_HEIGHT_VH = 40; // Initial open height
