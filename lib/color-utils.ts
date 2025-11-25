/**
 * Color Utility Functions
 * Helper functions to work with the color system
 */

type ColorName = "text" | "background" | "primary" | "secondary" | "accent";
type ColorVariant = "DEFAULT" | "secondary" | "tertiary" | "inverse" | "muted";
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/**
 * Converts a color name to a Tailwind class
 * @param color - Color name (e.g., 'primary', 'secondary', 'text')
 * @param shade - Optional shade (50-900) or variant
 * @param prefix - Class prefix (e.g., 'bg', 'text', 'border')
 * @returns Tailwind class string
 *
 * @example
 * getColorClass('primary') // 'primary'
 * getColorClass('primary', 500, 'bg') // 'bg-primary-500'
 * getColorClass('text', 'secondary') // 'text-secondary'
 */
export function getColorClass(
  color: ColorName | string,
  shade?: ColorShade | ColorVariant,
  prefix?: string
): string {
  // If it's a hex color, return as is
  if (color.startsWith("#")) {
    return color;
  }

  // Build the class name
  const baseClass = shade ? `${color}-${shade}` : color;
  return prefix ? `${prefix}-${baseClass}` : baseClass;
}

/**
 * Checks if a string is a hex color
 * @param color - Color string to check
 * @returns true if hex color, false otherwise
 */
export function isHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Checks if a string is a Tailwind color name
 * @param color - Color string to check
 * @returns true if Tailwind color name, false otherwise
 */
export function isTailwindColor(color: string): boolean {
  const tailwindColors = [
    "text",
    "background",
    "primary",
    "secondary",
    "accent",
  ];
  return tailwindColors.some((c) => color.startsWith(c));
}

/**
 * Gets the appropriate className or style for a color
 * @param color - Color value (hex or Tailwind name)
 * @param prefix - Class prefix (e.g., 'bg', 'text')
 * @returns Object with either className or style
 *
 * @example
 * getColorStyle('#BBFF00', 'bg') // { style: { backgroundColor: '#BBFF00' } }
 * getColorStyle('primary', 'bg') // { className: 'bg-primary' }
 */
export function getColorStyle(
  color: string,
  prefix?: string
): { className?: string; style?: React.CSSProperties } {
  if (!color) {
    return {};
  }

  if (isHexColor(color)) {
    const styleKey =
      prefix === "bg"
        ? "backgroundColor"
        : prefix === "text"
        ? "color"
        : prefix === "border"
        ? "borderColor"
        : "color";
    return { style: { [styleKey]: color } };
  }

  // For Tailwind colors, return the className with prefix
  const className = prefix ? `${prefix}-${color}` : color;
  return { className };
}
/**
 * Convert a Tailwind color class (e.g., 'bg-primary' or 'primary-500') to its hex value.
 * If a hex string is supplied, it is returned unchanged.
 */
export function tailwindToHex(colorClass: string): string {
  // Ensure input is a string
  if (typeof colorClass !== "string") {
    return colorClass || "";
  }

  // Return hex colors unchanged
  if (isHexColor(colorClass)) {
    return colorClass;
  }

  // Remove possible prefix (bg-, text-, border-)
  const parts = colorClass.split("-");
  const prefixSet = new Set(["bg", "text", "border"]);
  let idx = 0;
  if (prefixSet.has(parts[0])) {
    idx = 1;
  }
  const name = parts[idx];
  const shade = parts[idx + 1];

  const hexMap: Record<string, Record<string, string>> = {
    primary: {
      "50": "#f7ffe6",
      "100": "#ecffcc",
      "200": "#deff99",
      "300": "#cbff66",
      "400": "#bbff33",
      "500": "#bbff00",
      "600": "#a3e600",
      "700": "#7ab300",
      "800": "#527a00",
      "900": "#2e4700",
      DEFAULT: "#bbff00",
    },
    secondary: {
      "50": "#f5f5f5",
      "100": "#e5e5e5",
      "200": "#cccccc",
      "300": "#b3b3b3",
      "400": "#999999",
      "500": "#808080",
      "600": "#666666",
      "700": "#4d4d4d",
      "800": "#333333",
      "900": "#1f1f1f",
      DEFAULT: "#1f1f1f",
    },
    accent: {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a",
      DEFAULT: "#3b82f6",
    },
    background: {
      DEFAULT: "#ffffff",
    },
    text: {
      DEFAULT: "#1f1f1f",
    },
  };

  const group = hexMap[name];
  if (!group) {
    return colorClass;
  }

  const hex = shade ? group[shade] : group.DEFAULT;
  return hex || colorClass;
}
