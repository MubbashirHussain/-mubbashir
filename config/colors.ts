/**
 * Color System Configuration
 * 
 * This file defines the color palette for both light and dark modes.
 * Colors are organized into 5 main categories with shades:
 * - text: Text colors
 * - background: Background colors
 * - primary: Primary brand color (lime green)
 * - secondary: Secondary brand color (dark gray)
 * - accent: Accent colors for highlights
 */

export const colors = {
  // Light mode colors
  light: {
    text: {
      DEFAULT: '#1f1f1f',      // Main text color
      secondary: '#6b7280',    // Secondary text (gray-500)
      muted: '#9ca3af',        // Muted text (gray-400)
      inverse: '#ffffff',      // Text on dark backgrounds
    },
    background: {
      DEFAULT: '#ffffff',      // Main background
      secondary: '#f9fafb',    // Secondary background (gray-50)
      tertiary: '#f3f4f6',     // Tertiary background (gray-100)
      inverse: '#1f1f1f',      // Dark background
    },
    primary: {
      50: '#f7ffe6',           // Lightest lime
      100: '#ecffcc',          // Very light lime
      200: '#deff99',          // Light lime
      300: '#cbff66',          // Medium-light lime
      400: '#bbff33',          // Medium lime
      500: '#bbff00',          // Main lime (brand color)
      600: '#a3e600',          // Darker lime
      700: '#7ab300',          // Dark lime
      800: '#527a00',          // Very dark lime
      900: '#2e4700',          // Darkest lime
      DEFAULT: '#bbff00',      // Default primary
    },
    secondary: {
      50: '#f5f5f5',           // Lightest gray
      100: '#e5e5e5',          // Very light gray
      200: '#cccccc',          // Light gray
      300: '#b3b3b3',          // Medium-light gray
      400: '#999999',          // Medium gray
      500: '#808080',          // Main gray
      600: '#666666',          // Darker gray
      700: '#4d4d4d',          // Dark gray
      800: '#333333',          // Very dark gray
      900: '#1f1f1f',          // Darkest gray (almost black)
      DEFAULT: '#1f1f1f',      // Default secondary
    },
    accent: {
      50: '#eff6ff',           // Lightest blue
      100: '#dbeafe',          // Very light blue
      200: '#bfdbfe',          // Light blue
      300: '#93c5fd',          // Medium-light blue
      400: '#60a5fa',          // Medium blue
      500: '#3b82f6',          // Main blue
      600: '#2563eb',          // Darker blue
      700: '#1d4ed8',          // Dark blue
      800: '#1e40af',          // Very dark blue
      900: '#1e3a8a',          // Darkest blue
      DEFAULT: '#3b82f6',      // Default accent
    },
  },

  // Dark mode colors
  dark: {
    text: {
      DEFAULT: '#f9fafb',      // Main text color (light)
      secondary: '#d1d5db',    // Secondary text (gray-300)
      muted: '#9ca3af',        // Muted text (gray-400)
      inverse: '#1f1f1f',      // Text on light backgrounds
    },
    background: {
      DEFAULT: '#0f0f0f',      // Main background (very dark)
      secondary: '#1a1a1a',    // Secondary background
      tertiary: '#262626',     // Tertiary background
      inverse: '#ffffff',      // Light background
    },
    primary: {
      50: '#2e4700',           // Darkest lime (inverted for dark mode)
      100: '#527a00',          // Very dark lime
      200: '#7ab300',          // Dark lime
      300: '#a3e600',          // Darker lime
      400: '#bbff33',          // Medium lime
      500: '#bbff00',          // Main lime (brand color - same)
      600: '#cbff66',          // Medium-light lime
      700: '#deff99',          // Light lime
      800: '#ecffcc',          // Very light lime
      900: '#f7ffe6',          // Lightest lime
      DEFAULT: '#bbff00',      // Default primary
    },
    secondary: {
      50: '#1f1f1f',           // Darkest gray (inverted)
      100: '#333333',          // Very dark gray
      200: '#4d4d4d',          // Dark gray
      300: '#666666',          // Darker gray
      400: '#808080',          // Medium gray
      500: '#999999',          // Main gray
      600: '#b3b3b3',          // Medium-light gray
      700: '#cccccc',          // Light gray
      800: '#e5e5e5',          // Very light gray
      900: '#f5f5f5',          // Lightest gray
      DEFAULT: '#f9fafb',      // Default secondary (light for dark mode)
    },
    accent: {
      50: '#1e3a8a',           // Darkest blue (inverted)
      100: '#1e40af',          // Very dark blue
      200: '#1d4ed8',          // Dark blue
      300: '#2563eb',          // Darker blue
      400: '#3b82f6',          // Medium blue
      500: '#60a5fa',          // Main blue (brighter for dark mode)
      600: '#93c5fd',          // Medium-light blue
      700: '#bfdbfe',          // Light blue
      800: '#dbeafe',          // Very light blue
      900: '#eff6ff',          // Lightest blue
      DEFAULT: '#60a5fa',      // Default accent (brighter for dark mode)
    },
  },
};

// Export individual color palettes for convenience
export const lightColors = colors.light;
export const darkColors = colors.dark;

// Type definitions for TypeScript
export type ColorCategory = 'text' | 'background' | 'primary' | 'secondary' | 'accent';
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'DEFAULT';
export type ThemeMode = 'light' | 'dark';
