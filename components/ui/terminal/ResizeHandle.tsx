import React from "react";
import { Palette } from "./types";
import { MoveHorizontal } from "lucide-react";

interface ResizeHandleProps {
  palette: Palette;
  isResizing: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  palette,
  isResizing,
  onMouseDown,
}) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-2 cursor-ns-resize transition-colors duration-300 flex items-center justify-center -translate-y-1`}
      style={{
        backgroundColor: isResizing ? palette.accent : "transparent",
      }}
      onMouseDown={onMouseDown}
    >
      <MoveHorizontal
        size={14}
        className="opacity-50"
        style={{ color: palette.accent }}
      />
    </div>
  );
};
