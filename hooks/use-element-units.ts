"use client";

import { useCallback, useEffect, useState, RefObject } from "react";

/**
 * A hook that provides a utility function to convert CSS units to pixels.
 * Percentages (%) are calculated relative to the element referenced by `elementRef`.
 * Viewport units (vw, vh) are calculated relative to the window.
 */
export const useElementUnits = (elementRef: RefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!elementRef.current) return;

    const updateSize = () => {
      if (elementRef.current) {
        setDimensions({
          width: elementRef.current.offsetWidth,
          height: elementRef.current.offsetHeight,
        });
      }
    };

    // Initial measure
    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef]);

  const toPx = useCallback(
    (value: string | number, axis: "w" | "h" = "w"): number => {
      if (!mounted || typeof window === "undefined") return 0;
      if (typeof value === "number") return value;

      const strVal = value.trim();
      const num = parseFloat(strVal);
      if (isNaN(num)) return 0;

      // Percentage: based on element dimensions
      if (strVal.endsWith("%")) {
        const dimension = axis === "w" ? dimensions.width : dimensions.height;
        return (num / 100) * dimension;
      }

      // Viewport units
      if (strVal.endsWith("vw")) return (num / 100) * window.innerWidth;
      if (strVal.endsWith("vh")) return (num / 100) * window.innerHeight;

      // Rem
      if (strVal.endsWith("rem")) {
        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        return num * rootFontSize;
      }

      // Em: based on element font size if available, else body
      if (strVal.endsWith("em")) {
        const el = elementRef.current || document.body;
        const fontSize = parseFloat(getComputedStyle(el).fontSize);
        return num * fontSize;
      }

      return num;
    },
    [mounted, dimensions, elementRef]
  );

  return toPx;
};
