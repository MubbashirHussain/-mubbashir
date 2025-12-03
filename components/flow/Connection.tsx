import React, { useRef, RefObject, forwardRef } from "react";
import { useConnectionPath } from "./useConnectionPath";
import { cn } from "@/lib/utils";

interface ConnectionProps {
  startRef: RefObject<HTMLElement | null>;
  endRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  controlOffset1: number;
  controlOffset2: number;
  className?: string;
  trigger?: any;
}

export const Connection = forwardRef<SVGSVGElement, ConnectionProps>(
  (
    {
      startRef,
      endRef,
      containerRef,
      controlOffset1,
      controlOffset2,
      trigger,
      className,
    },
    ref
  ) => {
    const flowPathRef = useRef<SVGPathElement>(null);
    const { pathData, endPos, pathLength } = useConnectionPath(
      startRef,
      endRef,
      containerRef,
      controlOffset1,
      controlOffset2,
      flowPathRef,
      trigger
    );

    const flowSegmentLength = 60; // Length of the traveling "light" segment

    return (
      <svg
        ref={ref}
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none overflow-visible",
          className
        )}
      >
        {/* Custom CSS for Flow Animation relies on pathLength */}
        <style>{`
        @keyframes flow-travel {
            0% { stroke-dashoffset: ${pathLength}; } 
            100% { stroke-dashoffset: 0; }            
        }
        .flow-animation-path {
            stroke-dasharray: ${flowSegmentLength} ${
          pathLength - flowSegmentLength
        };
            stroke-dashoffset: ${pathLength}; 
            animation: flow-travel 3s linear infinite 0.5s;
            transition: stroke 0.3s ease;
        }
      `}</style>

        <defs>
          <linearGradient id="travelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor="#66FF00" offset="0%" />
            <stop stopColor="#ffffff" offset="100%" />
          </linearGradient>
        </defs>

        {/* Base Path */}
        <path d={pathData} stroke="#e5e7eb" strokeWidth="2" fill="none" />

        {/* Animated Path */}
        <path
          ref={flowPathRef}
          d={pathData}
          stroke="url(#travelGradient)"
          strokeWidth="2"
          fill="none"
          className="flow-animation-path"
        />

        {/* Connection Dot at the target port */}
        {endPos.x !== 0 && (
          <circle
            cx={endPos.x}
            cy={endPos.y}
            r="3.5"
            fill="#7C3AED"
            stroke="white"
            strokeWidth="2"
          />
        )}
      </svg>
    );
  }
);

Connection.displayName = "Connection";
