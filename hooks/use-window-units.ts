"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A hook that provides a utility function to convert CSS units (%, rem, em, vw, vh) to pixels
 * based on the current window size and root font size.
 */
export const useWindowUnits = () => {
  const [mounted, setMounted] = useState(false);
  // We track window size to trigger re-renders/re-calculations if needed,
  // though the converter function reads directly from window to be fresh.
  // However, if we want the component using this to re-render on resize, we need state.
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial set
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Converts a CSS unit string to pixels.
   * @param value The value to convert (e.g., "50%", "20rem", 100).
   * @param axis The axis to use for percentage calculations ("w" for width, "h" for height). Defaults to "w".
   */
  const toPx = useCallback(
    (value: string | number, axis: "w" | "h" = "w"): number => {
      if (!mounted || typeof window === "undefined") return 0;

      if (typeof value === "number") return value;

      const strVal = value.trim();
      const num = parseFloat(strVal);

      if (isNaN(num)) return 0;

      // Percentage: based on window width or height
      if (strVal.endsWith("%")) {
        const dimension = axis === "w" ? window.innerWidth : window.innerHeight;
        return (num / 100) * dimension;
      }

      // Viewport units
      if (strVal.endsWith("vw")) {
        return (num / 100) * window.innerWidth;
      }
      if (strVal.endsWith("vh")) {
        return (num / 100) * window.innerHeight;
      }

      // Rem: based on root font size
      if (strVal.endsWith("rem")) {
        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        return num * rootFontSize;
      }

      // Em: based on body font size (approximate for global context)
      if (strVal.endsWith("em")) {
        const bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize);
        return num * bodyFontSize;
      }

      // Px or unitless
      return num;
    },
    [mounted, windowSize] // Depend on windowSize to ensure we have latest context if that matters, though window object is global.
  );

  return toPx;
};
