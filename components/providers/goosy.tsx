"use client";

import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, MotionProps } from "framer-motion";

const GooeyContext = createContext<HTMLDivElement | null>(null);

/**
 * --- 2. The Container (GooeyArea) ---
 * Wraps your entire scene. It creates two physical DOM layers:
 * - Layer A (Bottom): The "Filter Layer" where blobs live.
 * - Layer B (Top): The "Content Layer" where text/interactions live.
 */

interface GooeyAreaProps {
  children: ReactNode;
  className?: string;
}

export const GooeyArea = ({
  children,
  className = "w-full h-screen",
}: GooeyAreaProps) => {
  // We use a state ref to store the DOM element of the blob layer
  const [blobContainer, setBlobContainer] = useState<HTMLDivElement | null>(
    null
  );

  return (
    <GooeyContext.Provider value={blobContainer}>
      <div className={`relative bg-slate-900 overflow-hidden ${className}`}>
        {/* LAYER A: Blobs (SVG Filter Applied) 
            We capture this div's ref into state so we can Portal into it later.
        */}
        <div
          ref={setBlobContainer}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: "url(#goo)" }}
        />

        {/* LAYER B: Content (No Filter) 
            Standard children render here.
        */}
        <div className="relative w-full h-full z-10">{children}</div>

        {/* The SVG Filter Definition (Hidden) */}
        <svg className="absolute hidden">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  
                        0 1 0 0 0  
                        0 0 1 0 0  
                        0 0 0 18 -7"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </GooeyContext.Provider>
  );
};

/**
 * --- 3. The Reusable Component (GooeyDiv) ---
 * You can use this anywhere inside a <GooeyArea>.
 * It "splits" itself: background goes to the blob layer, content stays here.
 */

interface GooeyDivProps extends MotionProps {
  children?: ReactNode;
  className?: string;
  blobColor?: string;
  contentClassName?: string;
  initialX?: number;
  initialY?: number;
}

export const GooeyDiv = ({
  children,
  className = "w-32 h-32 rounded-full", // Shared layout (size, shape)
  blobColor = "bg-indigo-500", // Specific blob color
  contentClassName = "", // Specific content styling
  initialX = 0,
  initialY = 0,
  ...props
}: GooeyDivProps) => {
  const blobContainer = useContext(GooeyContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    borderRadius: "0px",
  });
  const [pos, setPos] = useState({ left: 0, top: 0 });

  // Shared state for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const updateRect = () => {
      if (contentRef.current && blobContainer) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const containerRect = blobContainer.getBoundingClientRect();
        const computedStyle = getComputedStyle(contentRef.current);

        setSize({
          width: contentRect.width,
          height: contentRect.height,
          borderRadius: computedStyle.borderRadius,
        });

        setPos({
          left: contentRect.left - containerRect.left,
          top: contentRect.top - containerRect.top,
        });
      }
    };

    // Initial size
    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(contentRef.current);
    if (blobContainer) observer.observe(blobContainer);

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [blobContainer]);

  // 1. Render the Blob into the Portal (if container is ready)
  const blob = blobContainer
    ? createPortal(
        <motion.div
          style={{
            x,
            y,
            left: pos.left,
            top: pos.top,
            width: size.width,
            height: size.height,
            borderRadius: size.borderRadius,
          }}
          className={`absolute ${blobColor}`}
        />,
        blobContainer
      )
    : null;

  // 2. Render the Content normally
  return (
    <>
      {blob}
      <motion.div
        ref={contentRef}
        drag
        dragMomentum={false}
        style={{ x, y, left: initialX, top: initialY }}
        className={`${className} ${contentClassName} cursor-grab active:cursor-grabbing`}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};
