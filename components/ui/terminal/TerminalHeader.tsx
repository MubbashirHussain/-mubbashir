import React from "react";
import { Palette } from "./types";
import { ChevronUp, ChevronDown, X } from "lucide-react";

interface TerminalHeaderProps {
  palette: Palette;
  isTerminalOpen: boolean;
  onToggle: () => void;
  onClose: (e: React.MouseEvent) => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  palette,
  isTerminalOpen,
  onToggle,
  onClose,
}) => {
  return (
    <div
      className="flex items-center p-2 border-b cursor-pointer transition-colors duration-500 shrink-0 h-12"
      style={{
        backgroundColor: palette.headerBg,
        borderColor: palette.terminalBorder,
      }}
      onClick={onToggle}
    >
      <button
        className="mr-3 p-1 rounded transition-colors duration-200"
        style={{
          color: palette.accent,
          backgroundColor: palette.headerBg,
        }}
        aria-label={isTerminalOpen ? "Minimize Terminal" : "Maximize Terminal"}
      >
        {isTerminalOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>
      <span
        className="text-sm font-semibold transition-colors duration-500"
        style={{ color: palette.text }}
      >
        project_root/
      </span>
      <span
        className="ml-2 text-sm font-light italic transition-colors duration-500 opacity-80"
        style={{ color: palette.accent }}
      >
        [Tech: React/Tailwind]
      </span>

      {/* Right side controls */}
      <div className="ml-auto flex items-center gap-2">
        <span
          className="text-sm font-light italic transition-colors duration-500 opacity-60 mr-2 hidden sm:inline-block"
          style={{ color: palette.text }}
        >
          mubbashir@system:~/
        </span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-red-500/20 transition-colors duration-200 group"
          aria-label="Close Terminal"
        >
          <X size={18} className="text-red-500 group-hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};
