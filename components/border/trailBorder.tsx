import { cn } from "@/lib/utils";
import React from "react";
import { motion, Transition } from "framer-motion";

interface BorderWrapperProps {
  children: React.ReactNode;
  className?: string; // for the inner BorderTrail styling (e.g., color)
  containerClassName?: string; // for the outer div styling (e.g., width/height)
  size?: number; // for the BorderTrail size
}

/**
 * A generic wrapper that applies the animated BorderTrail effect to any content.
 */
interface BorderWrapperProps {
  children: React.ReactNode;
  className?: string; // for the inner BorderTrail styling (e.g., color)
  containerClassName?: string; // for the outer div styling (e.g., width/height)
  size?: number; // for the BorderTrail size
}

/**
 * A generic wrapper that applies the animated BorderTrail effect to any content.
 */
export function BorderWrapper({
  children,
  className,
  containerClassName,
  size,
}: BorderWrapperProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-zinc-950/10 bg-white dark:border-zinc-50/20 dark:bg-zinc-950 shadow-lg transition-colors",
        containerClassName
      )}
    >
      {children}
      <BorderTrail
        className={cn(
          // Changed from blue to green gradient
          "bg-gradient-to-l from-green-200 via-green-500 to-green-200 dark:from-green-400 dark:via-green-500 dark:to-green-700",
          className
        )}
        size={size}
      />
    </div>
  );
}

type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

/**
 * Creates an animated gradient trail that follows the border path of its parent container.
 */
export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION = React.useMemo(
    () => ({
      repeat: Infinity,
      duration: 5,
      ease: "linear",
    }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <MotionDiv
        className={cn("absolute aspect-square bg-zinc-500", className)}
        style={{
          width: size,
          // CSS Motion property used by framer-motion: rect(top, right, bottom, left)
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay: delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}

const MotionDiv: React.FC<any> = ({
  children,
  className,
  style,
  animate,
  transition,
  ...props
}) => {
  const isAnimated = animate && animate.offsetDistance;
  const duration = transition?.duration || 5;

  return (
    <div
      className={cn(className, isAnimated ? "animate-border-trail" : "")}
      style={
        {
          ...style,
          offsetPath: style?.offsetPath,
          // Inject duration as a CSS variable for the fallback animation
          "--duration": `${duration}s`,
        } as React.CSSProperties
      } // Cast to use CSS variables
      {...props}
    >
      {children}
    </div>
  );
};
