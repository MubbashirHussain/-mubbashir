import { useEffect, useCallback, useRef } from "react";
import { MIN_HEIGHT } from "./config";

export const useTerminalResize = (
  isTerminalOpen: boolean,
  setIsTerminalOpen: (open: boolean) => void,
  isResizing: boolean,
  setIsResizing: (resizing: boolean) => void,
  setTerminalHeight: (height: number) => void
) => {
  const startResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    },
    [setIsResizing]
  );

  const stopResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resizeTerminal = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const newHeightPx = window.innerHeight - e.clientY;
      const newHeightVh = (newHeightPx / window.innerHeight) * 100;

      if (newHeightPx > MIN_HEIGHT) {
        setTerminalHeight(newHeightVh);
        if (!isTerminalOpen) setIsTerminalOpen(true);
      }
    },
    [isResizing, isTerminalOpen, setIsTerminalOpen, setTerminalHeight]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resizeTerminal);
    window.addEventListener("mouseup", stopResize);

    return () => {
      window.removeEventListener("mousemove", resizeTerminal);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [resizeTerminal, stopResize]);

  return { startResize, stopResize };
};
