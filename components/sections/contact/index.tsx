"use client";

import { Container } from "@/components/ui/container";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Github, Linkedin, Twitter, MapPin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { InteractiveContactCard } from "@/components/ui/interactive-card";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <section
      ref={containerRef}
      className="relative z-30 bg-secondary text-text-inverse overflow-hidden min-h-[100vh] flex flex-col justify-center py-10 lg:py-16 "
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 lg:gap-20">
          <div className="flex flex-col gap-8 max-w-3xl">
            <motion.h2
              style={{ y }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter hover:text-primary transition-colors duration-500 cursor-default"
            >
              <InteractiveContactCard>
                Let's create <br />
                <span className="text-primary italic">something</span> <br />
                together
              </InteractiveContactCard>
            </motion.h2>

            <div className="flex flex-col gap-2 mt-8">
              <p className="text-xl md:text-2xl text-secondary-300 max-w-lg font-light leading-relaxed">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your visions.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Link href="mailto:hello@mubbashir.dev">
                <InteractiveHoverButton
                  text="Drop me an email"
                  className="w-fit px-10 py-4 text-lg border-secondary-500 bg-background text-secondary hover:bg-primary hover:text-secondary hover:border-primary cursor-navigation"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-end">
            <div className="flex gap-6">
              {[
                { icon: Github, href: "https://github.com", label: "Github" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="p-4 rounded-full border border-secondary-600 hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300 group cursor-button"
                  target="_blank"
                >
                  <social.icon size={24} />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>

            <div className="text-right text-secondary-400 font-space-grotesk">
              <p className="text-sm">
                Based in <span className="text-text-inverse">Pakistan</span>
              </p>
              <p className="text-sm mt-1 flex items-center justify-end gap-2">
                Local time: <Clock />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-secondary-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-secondary-500 font-space-grotesk">
          <p>© {new Date().getFullYear()} Mubbashir. All rights reserved.</p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="hover:text-primary transition-colors cursor-button"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors cursor-button"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Karachi", // Assuming Pakistan based on text
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span>...</span>;

  return <span>{time}</span>;
}
