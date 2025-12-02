"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { SideTab } from "../ui/side-tab";

export default function Preloader({
  onFinish,
  isShown,
}: {
  onFinish?: () => void;
  isShown?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 3.5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onFinish) onFinish(); // Mount content first
            setIsLoading(false); // Then start exit animation
          }, 800);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onFinish]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(containerRef.current, {
        duration: 0.8,
        scale: 1.2,
        delay: 1,
        ease: "power2.out",
      })
        .from(
          ".loading-box",
          {
            x: containerRef.current?.offsetWidth
              ? containerRef.current.offsetWidth / 5
              : 100,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".loading-box .text-8xl",
          {
            scale: 0.3,
            duration: 0.8,
            ease: "power2.out",
          },
          "<>+=0.9"
        );
    });
    return () => ctx.revert();
  }, [isLoading, onFinish]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && isShown && (
        <motion.div
          ref={containerRef}
          className="absolute h-full w-full z-50 flex flex-col items-center justify-center bg-background-inverse text-white opacity-100 p-10"
          animate={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          exit={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className=" w-full h-full z-0 rounded-3xl over bg-background flex items-center justify-center relative">
            <DotGridBackground
              className="w-full h-full"
              wrapperClassName="rounded-3xl"
            ></DotGridBackground>
            <div className="loading-box bg-background-inverse w-fit self-end absolute bottom-0 right-0 rounded-tl-3xl">
              <div className="relative flex items-center border-primary p-5">
                <motion.div className="text-8xl md:text-9xl font-bold font-outfit tracking-tighter text-primary mx-1 text-right">
                  {Math.min(100, Math.floor(progress))}%
                </motion.div>
                <SideTab
                  // top=""
                  bottom="0%"
                  left="1%"
                  className={`flex pointer-events-auto`}
                  eachCorner={{
                    br: {
                      enabled: true,
                      backgroundColor: "bg-background-inverse",
                    },
                    tr: { enabled: false },
                    bl: {
                      enabled: false,
                    },
                    tl: { enabled: false },
                  }}
                  radius={"30px"}
                  side="bottom"
                  //   height={"0%"}
                  width={"0%"}
                  cornerSize={50}
                />
                <SideTab
                  // top=""
                  top="0%"
                  right="-1%"
                  className={`flex pointer-events-auto`}
                  eachCorner={{
                    br: {
                      enabled: true,
                      backgroundColor: "background-inverse",
                    },
                    tr: { enabled: false },
                    bl: {
                      enabled: false,
                    },
                    tl: { enabled: false },
                  }}
                  radius={"30px"}
                  side="right"
                  //   height={"0%"}
                  width={"0%"}
                  cornerSize={50}
                />
              </div>

              {/* <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div> */}
            </div>
          </div>
          {/* <div className="border-50 z-50 inset-10 rounded-3xl border-black w-full h-full absolute"></div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DotGridBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  moveingChildren?: React.ReactNode;
  style?: React.CSSProperties;
  /**
   * Optional className for the outer wrapper that defines the box size/position.
   * The wrapper is `relative overflow-hidden` so the background stays confined.
   */
  wrapperClassName?: string;
};

export const DotGridBackground = ({
  children,
  className = "",
  moveingChildren,
  style,
  wrapperClassName = "",
}: DotGridBackgroundProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${wrapperClassName}`}
    >
      <motion.div
        style={{
          ...backgroundStyle,
          translateX: springX,
          translateY: springY,
          ...style,
        }}
        className={`absolute inset-0 h-[calc(100%-4rem)] w-[calc(100%-4rem)] pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {moveingChildren ? moveingChildren : null}
      </motion.div>
      {children ? children : null}
    </div>
  );
};
