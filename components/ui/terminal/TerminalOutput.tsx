import React from "react";
import { Palette } from "./types";

interface TerminalOutputProps {
  terminalRef: React.RefObject<HTMLDivElement>;
  palette: Palette;
  isTerminalOpen: boolean;
  history: string[];
  currentDir: string;
  input: string;
  isTyping: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocusInput: () => void;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({
  terminalRef,
  palette,
  isTerminalOpen,
  history,
  currentDir,
  input,
  isTyping,
  inputRef,
  onInputChange,
  onKeyDown,
  onFocusInput,
}) => {
  return (
    <div
      ref={terminalRef}
      className="grow p-4 overflow-y-auto custom-scrollbar leading-relaxed text-lg font-mono cursor-text"
      onClick={onFocusInput}
      style={{
        color: palette.accent,
        overscrollBehavior: "contain",
        overscrollBehaviorX: "contain",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {isTerminalOpen &&
        history.map((line, index) => (
          <pre
            key={index}
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: line }}
          ></pre>
        ))}

      {/* Current input line */}
      {isTerminalOpen && !isTyping && (
        <div className="flex items-center mt-1">
          {/* Display the current directory prompt */}
          <span
            className="mr-2 text-lg font-bold"
            style={{ color: palette.accent }}
          >
            {currentDir} %
          </span>
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent outline-none max-w-full caret-transparent p-0 m-0 border-none appearance-none text-lg leading-relaxed focus:ring-0"
            style={{ width: `${input.length}ch`, color: palette.accent }}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isTyping}
            spellCheck={false}
          />
          {/* Blinking cursor */}

          <span
            className="w-3 h-6 ml-1 animate-pulse"
            style={{ backgroundColor: palette.accent }}
          />
        </div>
      )}
    </div>
  );
};
