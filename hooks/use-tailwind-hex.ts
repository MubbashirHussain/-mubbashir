"use client";

import { useEffect, useState } from "react";
import { tailwindToHex } from "@/lib/color-utils";

/**
 * Returns a real hex color for a Tailwind class (or the original class
 * if conversion fails). The conversion runs only in the browser.
 */
export function useTailwindHex(
  classOrHex: string | undefined,
  fallback: string = "transparent"
) {
  const [hex, setHex] = useState<string>(fallback);

  useEffect(() => {
    if (!classOrHex) {
      setHex(fallback);
      return;
    }
    const resolved = tailwindToHex(classOrHex);
    // If tailwindToHex returns the same string, it means it couldn't resolve it to a hex.
    // However, on the client it might resolve now.
    // If it still returns the class name, we might want to stick with fallback or just use it if it happens to be a valid color string (unlikely for tailwind classes).
    // But usually tailwindToHex returns the input if it fails.

    setHex(resolved || fallback);
  }, [classOrHex, fallback]);

  return hex;
}
