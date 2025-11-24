"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Github, Twitter, Linkedin } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-300 rounded-full",
            isScrolled
              ? "bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg"
              : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-white z-50"
          >
            Mubbashir<span className="text-[#18ffb0]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#18ffb0] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <Link
                href="https://github.com"
                target="_blank"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
            <Link
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-black bg-white rounded-full hover:bg-[#18ffb0] transition-colors duration-300"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-white hover:text-[#18ffb0] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-6 mt-8">
              <Link
                href="https://github.com"
                target="_blank"
                className="text-neutral-400 hover:text-white"
              >
                <Github className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-neutral-400 hover:text-white"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-neutral-400 hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
