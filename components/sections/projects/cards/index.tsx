"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { colors } from "@/config/colors";

const SPRING = {
  type: "spring" as const,
  stiffness: 360,
  damping: 38,
  mass: 1,
};

export interface ProjectCardData {
  title: string;
  description: string;
  tag: string;
  index: number;
}

// ─── Single card — renders as thumbnail OR expanded via layoutId ────
export function ProjectCard({
  title,
  description,
  tag,
  index,
  isExpanded,
  isHidden,
  isClosing,
  onClick,
  onClose,
  cardRef,
  rotate,
  originRect,
}: ProjectCardData & {
  isExpanded: boolean;
  isHidden?: boolean;
  isClosing?: boolean;
  onClick: () => void;
  onClose?: () => void;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  rotate?: any;
  originRect?: DOMRect | null;
}) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = !mounted || currentTheme === "dark";
  const themeColors = isDark ? colors.dark : colors.light;

  // Expanded positioning (only used when isExpanded)
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const targetW = vw * 0.9;
  const targetH = vh * 0.9;
  const toX = (vw - targetW) / 2;
  const toY = (vh - targetH) / 2;

  const isExpandedAnim = isExpanded && originRect;
  const initRotate =
    typeof window !== "undefined" ? (window as any)._expandRotation || 0 : 0;

  // Animation states for the expanded card
  const expandedInitial = isExpandedAnim
    ? {
        position: "fixed" as const,
        top: originRect?.top,
        left: originRect?.left,
        width: originRect?.width,
        height: originRect?.height,
        borderRadius: 16,
        rotate: initRotate,
        zIndex: 210,
      }
    : {};

  const expandedAnimate = isExpandedAnim
    ? {
        top: toY,
        left: toX,
        width: targetW,
        height: targetH,
        borderRadius: 28,
        rotate: 0,
        transition: {
          rotate: { duration: 0.3, ease: "easeOut" as const },
          width: { duration: 1, ease: "easeInOut" as const, delay: 1 },
          default: {
            type: "spring" as const,
            stiffness: 300,
            damping: 30,
            delay: 0.3,
          },
        },
      }
    : {};

  const expandedExit = isExpandedAnim
    ? {
        top: originRect?.top,
        left: originRect?.left,
        width: originRect?.width,
        height: originRect?.height,
        borderRadius: 16,
        rotate: initRotate,
        transition: {
          default: {
            type: "spring" as const,
            stiffness: 300,
            damping: 30,
            delay: 0,
          },
          rotate: { duration: 0.3, ease: "easeIn" as const, delay: 0.4 },
        },
      }
    : {};

  return (
    <motion.div
      ref={!isExpanded ? cardRef : undefined}
      onClick={isExpanded ? undefined : onClick}
      className={`overflow-hidden ${
        isExpanded
          ? `shadow-[0_0_50px_rgba(0,0,0,0.5)] border cursor-default! ${isDark ? "border-white/10" : "border-black/10"}`
          : `group border cursor-navigation ${isDark ? "border-white/5 hover:border-[#bbff00]/30" : "border-black/5 hover:border-[#bbff00]/50"} transition-colors duration-500`
      }`}
      style={{
        position: isExpanded ? "fixed" : "relative",
        background: themeColors.background.DEFAULT,
        cursor: isExpanded ? "default" : "pointer",
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? "none" : "auto",
        zIndex: isExpanded ? 210 : "auto",
        willChange: "transform, top, left, width, height",
        transformOrigin: "bottom center",
        ...(isExpanded ? {} : { rotate: rotate || 0 }),
        ...(isExpandedAnim
          ? {}
          : { width: "100%", height: "100%", borderRadius: 20 }),
      }}
      initial={expandedInitial}
      animate={expandedAnimate}
      exit={expandedExit}
      transition={SPRING}
    >
      {/* Accent bar */}
      {/* <div
        className="absolute top-0 left-0 w-full h-1 z-10"
        style={{ background: color }}
      /> */}

      {/* Grid */}
      {/* <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      /> */}

      {/* Glow */}
      {/* <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top right,#ffffff 0%,transparent 60%)`,
        }}
      /> */}
      <motion.div
        className="absolute inset-y-0 right-0 overflow-hidden"
        initial={{
          width: "100%",
          left: "0%",
        }}
        animate={{
          width: isExpandedAnim && !isClosing ? "60%" : "100%",
          left: isExpandedAnim && !isClosing ? "40%" : "0%",
          transition: {
            width: {
              type: "spring" as const,
              duration: 1,
              delay: isClosing ? 0 : 1,
            },
            left: {
              type: "spring" as const,
              ease: "easeInOut" as const,
              duration: 1,
              delay: isClosing ? 0 : 1,
            },
          },
        }}
      >
        <Image
          src={
            "/images/projects/hotel-booking-mobile-app-ui-ux-mockup_206192-1947.jpg"
          }
          alt="Person"
          fill
          priority={isExpanded}
          className="object-cover"
        />
      </motion.div>

      {/* ── THUMBNAIL content ── */}
      <AnimatePresence>
        {!isExpanded && !isHidden && (
          <motion.div
            key="thumb"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            {/* gradient for thumbnail overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-[#0f0f0f] via-[#0f0f0f]/50" : "from-white via-white/80"} to-transparent pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8 } }}
            />

            <motion.div
              className="absolute top-5 left-5 z-10"
              initial={{ y: -10, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 0.4 },
              }}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg ${!isDark && "border border-black/5"}`}
                style={{
                  background: isDark
                    ? `${themeColors.primary.DEFAULT}E6`
                    : `${themeColors.primary.DEFAULT}F2`,
                  color: isDark
                    ? themeColors.background.DEFAULT
                    : themeColors.text.DEFAULT,
                }}
              >
                {tag}
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, delay: 0.3 },
              }}
            >
              <h3
                className={`font-bold text-2xl mb-2 leading-tight tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {title}
              </h3>
              <p
                className={`text-sm line-clamp-2 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EXPANDED content ── */}
      <AnimatePresence>
        {isExpanded && !isClosing && (
          <motion.div
            key="expanded"
            className={`absolute inset-y-0 left-0 w-[40%] p-12 flex flex-col justify-center overflow-hidden bg-gradient-to-r ${isDark ? "from-[#0f0f0f] via-[#0f0f0f]" : "from-white via-white"} to-transparent z-10`}
            initial={{ opacity: 0, x: -40, width: "0%" }}
            animate={{
              opacity: 1,
              x: 0,
              width: "40%",
              transition: {
                duration: 1,
                delay: 2,
                ease: "easeOut",
                width: {
                  type: "spring",
                  delay: 1,
                },
              },
            }}
            exit={{
              opacity: 0,
              x: -40,
              width: "0%",
              transition: { duration: 0.6, delay: 0, ease: "easeInOut" },
            }}
          >
            <div className="w-[100%] pr-[20%]">
              <span
                className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full w-fit mb-8 inline-block border ${isDark ? "border-white/10" : "border-black/10"}`}
                style={{
                  background: `${themeColors.primary.DEFAULT}1A`,
                  color: isDark
                    ? themeColors.primary.DEFAULT
                    : themeColors.primary[800],
                }}
              >
                {tag}
              </span>
              <h3
                className={`font-bold text-5xl mb-6 leading-tight tracking-tighter ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {title}
              </h3>
              <p
                className={`text-lg mb-10 leading-relaxed font-light ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {description}
              </p>

              {/* Mock Tech Stack */}
              <div className="space-y-4">
                <h4
                  className={`font-semibold text-xs uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Framer Motion", "Tailwind CSS"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className={`px-4 py-2 transition-colors border rounded-lg text-sm font-medium ${isDark ? "bg-white/5 hover:bg-white/10 border-white/5 text-gray-300" : "bg-black/5 hover:bg-black/10 border-black/5 text-gray-700"}`}
                      >
                        {tech}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-12">
                <button
                  className={`px-8 py-4 rounded-xl font-bold  transition-all hover:scale-105 active:scale-95 ${isDark ? "shadow-[0_0_20px_rgba(187,255,0,0.2)] hover:shadow-[0_0_30px_rgba(187,255,0,0.4)]" : "shadow-lg hover:shadow-xl"}`}
                  style={{
                    backgroundColor: themeColors.primary.DEFAULT,
                    color: isDark
                      ? themeColors.background.DEFAULT
                      : themeColors.text.DEFAULT,
                  }}
                >
                  View Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
