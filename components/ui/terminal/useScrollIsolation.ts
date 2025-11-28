import { useEffect } from "react";

export const useScrollIsolation = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  terminalRef: React.RefObject<HTMLDivElement | null>,
  isTerminalOpen: boolean,
  isVisible: boolean
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();

      const scrollableArea = terminalRef.current;
      const isInsideScrollable =
        scrollableArea && scrollableArea.contains(e.target as Node);

      if (isInsideScrollable && scrollableArea) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableArea;
        const isScrollable = scrollHeight > clientHeight;

        if (!isScrollable) {
          e.preventDefault();
          return;
        }

        const isAtTop = scrollTop <= 0;
        const isAtBottom =
          Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;

        if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [containerRef, terminalRef, isTerminalOpen, isVisible]);
};
