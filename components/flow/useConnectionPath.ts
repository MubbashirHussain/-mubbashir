import { useState, useCallback, useEffect, RefObject } from "react";

export const useConnectionPath = (
  startRef: RefObject<HTMLElement | null>,
  endRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  offset1: number,
  offset2: number,
  pathRef: RefObject<SVGPathElement | null>,
  trigger: any
) => {
  const [pathData, setPathData] = useState("");
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [pathLength, setPathLength] = useState(0);

  const drawConnection = useCallback(() => {
    if (!startRef.current || !endRef.current || !containerRef.current) return;

    // Get bounding boxes
    const startRect = startRef.current.getBoundingClientRect();
    const endRect = endRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate coordinates relative to the flow canvas container
    const startX = startRect.left + startRect.width / 2 - containerRect.left;
    const startY = startRect.top + startRect.height / 2 - containerRect.top;
    const endX = endRect.left + endRect.width / 2 - containerRect.left;
    const endY = endRect.top + endRect.height / 2 - containerRect.top;

    // Control points for Cubic Bezier Curve (C)
    const c1x = startX + offset1;
    const c1y = startY;
    const c2x = endX - offset2;
    const c2y = endY;

    // Path string: M (MoveTo) C (CubicBezier)
    const newPathData = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;

    setPathData(newPathData);
    setEndPos({ x: endX, y: endY });

    // Update the ref's 'd' attribute and measure its length for animation
    if (pathRef.current) {
      pathRef.current.setAttribute("d", newPathData);
      const length = pathRef.current.getTotalLength();
      // Only update length if it changes significantly
      if (Math.abs(length - pathLength) > 1) {
        setPathLength(length);
      }
    }
  }, [
    offset1,
    offset2,
    startRef,
    endRef,
    containerRef,
    pathRef,
    pathLength,
    trigger,
  ]);

  useEffect(() => {
    drawConnection();
    window.addEventListener("resize", drawConnection);
    window.addEventListener("scroll", drawConnection, true);

    // Add a small delay to recalculate after any animations
    const timer = setTimeout(drawConnection, 100);

    return () => {
      window.removeEventListener("resize", drawConnection);
      window.removeEventListener("scroll", drawConnection, true);
      clearTimeout(timer);
    };
  }, [drawConnection]);

  return { pathData, endPos, pathLength, drawConnection };
};
