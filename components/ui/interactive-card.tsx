"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export const InteractiveContactCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 30 });
  const springY = useSpring(y, { stiffness: 120, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX / 1);
    y.set(mouseY / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <span
      className="inline-block relative group cursor-navigation"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span className="inline-block w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full ml-1 align-baseline relative -top-1 md:-top-2 lg:-top-3 group-hover:bg-transparent transition-colors duration-300">
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute bottom-0 left-0 w-full h-full bg-primary group-hover:bg-secondary-900  rounded-2xl z-20 
                      group-hover:w-[320px] group-hover:h-[190px] group-hover:-translate-x-[160px] group-hover:-translate-y-[95px] group-hover:rounded-2xl 
                      transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden border border-white/10 pointer-events-none group-hover:pointer-events-auto shadow-2xl origin-bottom-left"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col h-full w-full relative bg-zinc-950/80 backdrop-blur-xl">
            {/* Background Effects */}
            <div className="absolute top-[-50%] left-[-20%] w-[150px] h-[150px] bg-primary/20 blur-[60px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[150px] h-[150px] bg-blue-500/10 blur-[60px] rounded-full" />

            <div className="relative z-10 flex flex-col justify-between h-full p-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <h4 className="text-white font-bold text-xl tracking-tight">
                    Mubbashir
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </div>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                      Available
                    </span>
                  </div>
                </div>
                {/* Abstract / Logo mark */}
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                  <span className="text-sm font-black text-primary">M.</span>
                </div>
              </div>

              {/* Body - Main Info */}
              <div className="space-y-1 my-auto">
                <p className="text-sm text-zinc-300 font-medium w-full bg-amber-50">
                  Digital Designer 
                </p>
                <p className="text-sm text-zinc-300 font-medium">& Developer</p>
              </div>

              {/* Footer - Contacts */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href="mailto:hello@mubbashir.dev"
                  className="flex items-center gap-2 group/link cursor-pointer hover:bg-white/5 px-2 py-1 -ml-2 rounded-lg transition-colors"
                >
                  <Mail
                    size={14}
                    className="text-zinc-500 group-hover/link:text-primary transition-colors"
                  />
                  <span className="text-xs text-zinc-400 group-hover/link:text-white transition-colors">
                    hello@mubbashir.dev
                  </span>
                </a>
                <div className="flex items-center gap-1.5 text-zinc-600">
                  <MapPin size={12} />
                  <span className="text-[10px]">PK</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </span>
    </span>
  );
};
