import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectCard({
  title,
  description,
  image,
  className,
  layoutId,
  onClick,
  index,
  activeIndex,
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
  layoutId?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  index: number;
  activeIndex: number | null;
}) {
  const isExpanded = activeIndex === index;
  return (
    <motion.div
      layoutId={layoutId}
      transition={{ delay: 5 }}
      onClick={onClick}
      className={`
        relative bg-secondary-100 overflow-hidden shadow-xl
        transition-all duration-400
        ${
          isExpanded
            ? "w-full max-w-5xl h-[80vh] sm:h-[60vh] rounded-3xl cursor-default"
            : `group/card max-w-[320px] h-[300px] min-h-[250px] min-w-[250px] w-full rounded-2xl flex items-end cursor-navigation ${className}`
        }
      `}
    >
      {/* Image Container - Morphs from full background to right half */}
      <motion.div
        layoutId={layoutId ? `${layoutId}-image` : undefined}
        className={`absolute top-0 h-full z-0 overflow-hidden ${
          isExpanded ? "right-0 w-full sm:w-1/2" : "left-0 w-full"
        }`}
      >
        <Image
          src={"/images/person.png"}
          alt="Person"
          fill
          priority={isExpanded}
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Content Container - Morphs from bottom overlay to left panel */}
      <motion.div
        className={
          isExpanded
            ? "absolute top-0 left-0 w-full sm:w-1/2 h-full p-8 flex flex-col justify-center gap-4 z-20"
            : "relative w-full flex flex-col z-10 gap-1 p-4 transition-all duration-400 translate-y-[200px] group-hover/card:translate-y-0"
        }
      >
        <motion.h4
          layoutId={layoutId ? `${layoutId}-title` : undefined}
          className={`font-bold text-white ${
            isExpanded ? "text-3xl sm:text-4xl" : "text-xl"
          }`}
        >
          {title}
        </motion.h4>
        <motion.p
          layoutId={layoutId ? `${layoutId}-desc` : undefined}
          className={`text-white ${
            isExpanded ? "text-base sm:text-lg text-white/80" : "text-sm"
          }`}
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Hover Overlay - Only visible in compact state */}
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 rounded-2xl w-full h-full bg-black opacity-0 group-hover/card:opacity-10 transition-all duration-300 pointer-events-none" />
      )}
    </motion.div>
  );
}
