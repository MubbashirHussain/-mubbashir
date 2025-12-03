import { useMotionValue, useTransform, useSpring } from "framer-motion";
import { forwardRef, useEffect } from "react";
import { motion } from "framer-motion";

type DotGridBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  moveingChildren?: React.ReactNode;
  style?: React.CSSProperties;
  isMoveable?: boolean;
  /**
   * Optional className for the outer wrapper that defines the box size/position.
   * The wrapper is `relative overflow-hidden` so the background stays confined.
   */
  wrapperClassName?: string;
};

const DotGridBackground = forwardRef(
  (
    {
      children,
      className = "",
      moveingChildren,
      style,
      isMoveable = true,
      wrapperClassName = "",
    }: DotGridBackgroundProps,
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
      if (!isMoveable) return;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMoveable]);

    const x = useTransform(
      mouseX,
      [0, typeof window !== "undefined" ? window.innerWidth : 0],
      [-30, 30]
    );
    const y = useTransform(
      mouseY,
      [0, typeof window !== "undefined" ? window.innerHeight : 0],
      [-30, 30]
    );

    const springX = useSpring(x, { stiffness: 120, damping: 30 });
    const springY = useSpring(y, { stiffness: 120, damping: 30 });

    const backgroundStyle: React.CSSProperties = {
      backgroundImage: `radial-gradient(#d1d5db 2px, transparent 2px)`,
      backgroundSize: "32px 32px",
      backgroundColor: "transparent",
      opacity: "1",
    };

    let styleMovingChildren = isMoveable
      ? {
          translateX: springX,
          translateY: springY,
        }
      : {};

    return (
      <div
        ref={ref as any}
        className={`relative overflow-hidden w-full h-full ${wrapperClassName}`}
      >
        <motion.div
          style={{
            ...backgroundStyle,
            ...styleMovingChildren,
            ...style,
          }}
          className={`absolute h-[calc(100%-4rem)] w-[calc(100%-4rem)] pointer-events-none z-0 ${className}`}
          aria-hidden="true"
        >
          {moveingChildren ? moveingChildren : null}
        </motion.div>
        {children ? children : null}
      </div>
    );
  }
);

export default DotGridBackground;
