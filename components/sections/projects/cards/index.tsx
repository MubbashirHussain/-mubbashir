"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
          rotate: { duration: 0.3, ease: "easeOut" },
          width: { duration: 1, ease: "easeInOut", delay: 1 },
          default: {
            type: "spring",
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
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0,
          },
          rotate: { duration: 0.3, ease: "easeIn", delay: 0.4 },
        },
      }
    : {};

  return (
    <motion.div
      ref={!isExpanded ? cardRef : undefined}
      onClick={isExpanded ? undefined : onClick}
      className={`overflow-hidden ${isExpanded ? "shadow-2xl  border-white/10" : "group"}`}
      style={{
        position: isExpanded ? "fixed" : "relative",
        background: "#333333ee",
        cursor: isExpanded ? "default" : "pointer",
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? "none" : "auto",
        zIndex: isExpanded ? 210 : "auto",
        willChange: "transform, top, left, width, height",
        transformOrigin: "bottom center",
        ...(isExpanded ? {} : { rotate: rotate || 0 }),
        ...(isExpandedAnim
          ? {}
          : { width: "100%", height: "100%", borderRadius: 16 }),
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
              type: "spring",
              duration: 1,
              delay: isClosing ? 0 : 1,
            },
            left: {
              type: "spring",
              ease: "easeInOut",
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
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8 } }}
            />
            
            <motion.div 
              className="absolute top-5 left-5 z-10"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm"
                style={{ background: "#00000044", color: "#ffffff" }}
              >
                {tag}
              </span>
            </motion.div>

            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.3 } }}
            >
              <h3 className="font-bold text-white text-xl mb-1 leading-tight">
                {title}
              </h3>
              <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
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
            className="absolute inset-y-0 left-0 w-[40%] p-10 flex flex-col justify-center overflow-hidden "
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
              }, //  side content animations
            }}
            exit={{
              opacity: 0,
              x: -40,
              width: "0%",
              transition: { duration: 0.6, delay: 0, ease: "easeInOut" },
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full w-fit mb-6"
              style={{ background: `$ffffff22`, color: "#ffffff99" }}
            >
              {tag}
            </span>
            <h3 className="font-bold text-white text-4xl mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              {description}
            </p>

            {/* Mock Tech Stack */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider opacity-50">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Framer Motion", "Tailwind CSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-white/80"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-10">
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#ffffff80", color: "#000" }}
              >
                View Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
