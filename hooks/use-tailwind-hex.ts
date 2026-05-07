"use client";

import { useEffect, useState } from "react";
import { tailwindToHex } from "@/lib/color-utils";
import { useTheme } from "next-themes";

/**
 * Returns a real hex color for a Tailwind class (or the original class
 * if conversion fails). The conversion runs only in the browser.
 */
export function useTailwindHex(
  classOrHex: string | undefined,
  fallback: string = "transparent",
) {
  const [hex, setHex] = useState<string>(fallback);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!classOrHex) {
      setHex(fallback);
      return;
    }

    // Wait for a frame to ensure next-themes has updated the DOM classes
    const timeoutId = setTimeout(() => {
      const resolved = tailwindToHex(classOrHex);
      setHex(resolved || fallback);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [classOrHex, fallback, resolvedTheme]);

  return hex;
}
