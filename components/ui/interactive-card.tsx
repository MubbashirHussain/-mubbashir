"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

export const InteractiveContactCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isCopied, setIsCopied] = React.useState(false);
  const springX = useSpring(x, { stiffness: 120, damping: 30 });
  const springY = useSpring(y, { stiffness: 120, damping: 30 });

  const onCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling if needed
    navigator.clipboard.writeText("hello@mubbashir.dev");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
                      group-hover:w-[360px] group-hover:h-[260px] group-hover:-translate-x-[180px] group-hover:-translate-y-[130px] group-hover:rounded-2xl 
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

              {/* Body - Copy Email Utility */}
              <div className="mt-6">
                <button
                  onClick={onCopy}
                  className="group/email relative w-full flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 hover:bg-black/40 transition-all duration-300 cursor-copy overflow-hidden active:scale-[0.98]"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover/email:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover/email:border-white/10 transition-colors">
                      <Mail
                        size={16}
                        className="text-zinc-400 group-hover/email:text-white transition-colors"
                      />
                    </div>
                    <span className="text-sm font-semibold text-zinc-200 group-hover/email:text-white transition-colors">
                      hello@mubbashir.dev
                    </span>
                  </div>

                  <div className="relative z-10 p-2 rounded-lg bg-white/5 text-zinc-500 group-hover/email:text-white group-hover/email:bg-white/10 transition-all">
                    <AnimatePresence mode="wait" initial={false}>
                      {isCopied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Check size={16} className="text-emerald-400" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Copy size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </div>

              {/* Footer - Socials */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {[
                    { Icon: Linkedin, href: "#", label: "LinkedIn" },
                    { Icon: Twitter, href: "#", label: "Twitter" },
                    { Icon: Github, href: "#", label: "GitHub" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="group/icon p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105"
                      aria-label={social.label}
                    >
                      <social.Icon
                        size={16}
                        className="group-hover/icon:text-primary transition-colors"
                      />
                    </a>
                  ))}
                </div>

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
