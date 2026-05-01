"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { PALETTES, MIN_HEIGHT, INITIAL_HEIGHT_VH } from "./terminal/config";
import { useTerminal } from "./terminal/useTerminal";
import { useTerminalResize } from "./terminal/useTerminalResize";
import { useScrollIsolation } from "./terminal/useScrollIsolation";
import { TerminalHeader } from "./terminal/TerminalHeader";
import { TerminalOutput } from "./terminal/TerminalOutput";
import { ResizeHandle } from "./terminal/ResizeHandle";

export default function Terminal() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(INITIAL_HEIGHT_VH);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Determine current theme name safely
  const currentThemeName = (
    mounted && theme ? theme : "dark"
  ) as keyof typeof PALETTES;
  const palette = PALETTES[currentThemeName] || PALETTES.dark;

  // Terminal logic hook
  const {
    history,
    input,
    setInput,
    handleKeyPress,
    isTyping,
    terminalRef,
    inputRef,
    focusInput,
    runBootSequence,
    currentDir,
  } = useTerminal(
    (t) => setTheme(t),
    isTerminalOpen,
    setIsTerminalOpen,
    palette,
    currentThemeName,
    isVisible,
    setIsVisible,
  );

  // Run boot sequence when visible
  useEffect(() => {
    runBootSequence();
  }, [isVisible]);

  // Scroll isolation hook
  useScrollIsolation(containerRef, terminalRef, isTerminalOpen, isVisible);

  // Resize logic hook
  const { startResize } = useTerminalResize(
    isTerminalOpen,
    setIsTerminalOpen,
    isResizing,
    setIsResizing,
    setTerminalHeight,
  );

  // Dynamic terminal height calculation
  const terminalHeightStyle = isTerminalOpen
    ? `${terminalHeight}vh`
    : `${MIN_HEIGHT}px`;

  const closeTerminal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  }, []);

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen(!isTerminalOpen);
  }, [isTerminalOpen]);

  return (
    <>
      <div
        ref={containerRef}
        className={`fixed bottom-0 left-0 w-full shadow-2xl z-20 transition-transform duration-500 ease-in-out flex flex-col ${
          isResizing ? "resizing" : ""
        }`}
        style={{
          height: terminalHeightStyle,
          backgroundColor: palette.terminalBg,
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          overscrollBehavior: "contain",
        }}
      >
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: ${palette.headerBg};
          }
          ::-webkit-scrollbar-thumb {
            background-color: ${palette.accent};
            border-radius: 20px;
            border: 2px solid ${palette.bg};
          }
          .resizing * {
            user-select: none;
            cursor: ns-resize !important;
          }
        `}</style>

        <ResizeHandle
          palette={palette}
          isResizing={isResizing}
          onMouseDown={startResize}
        />

        <TerminalHeader
          palette={palette}
          isTerminalOpen={isTerminalOpen}
          onToggle={toggleTerminal}
          onClose={closeTerminal}
        />

        <TerminalOutput
          terminalRef={terminalRef as any}
          palette={palette}
          isTerminalOpen={isTerminalOpen}
          history={history}
          currentDir={currentDir}
          input={input}
          isTyping={isTyping}
          inputRef={inputRef as any}
          onInputChange={setInput}
          onKeyDown={handleKeyPress}
          onFocusInput={focusInput}
        />
      </div>
    </>
  );
}
