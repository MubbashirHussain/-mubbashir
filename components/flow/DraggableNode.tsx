import React, { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DraggableNodeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onMouseDown"> {
  id: string;
  position: { top: number; left: number };
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
}

export const DraggableNode = forwardRef<HTMLDivElement, DraggableNodeProps>(
  (
    { id, position, onMouseDown, className, children, style, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          "absolute w-52 rounded-xl p-4 shadow-xl transition-shadow duration-100 cursor-move",
          className
        )}
        style={{ top: position.top, left: position.left, ...style }}
        onMouseDown={(e) => onMouseDown?.(e, id)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DraggableNode.displayName = "DraggableNode";
