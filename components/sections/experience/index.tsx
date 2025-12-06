"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import SectionHeading from "@/components/ui/sectionHeading";
import { Container } from "@/components/base/container";

const experiences = [
  {
    id: "exp-1",
    role: "Senior Frontend Engineer",
    company: "TechNova Solutions",
    period: "2023 - Present",
    description: [
      "Leading the frontend migration of legacy systems to Next.js, improving page load speeds by 40%.",
      "Architecting a scalable design system used across 5 different products.",
      "Mentoring junior developers and establishing code quality standards.",
    ],
    tech: ["React", "Next.js", "TypeScript", "TailwindCSS", "GraphQL"],
  },
  {
    id: "exp-2",
    role: "Full Stack Developer",
    company: "Creative Pulse Studio",
    period: "2021 - 2023",
    description: [
      "Developed interactive marketing websites for Fortune 500 clients with high-fidelity animations.",
      "Integrated headless CMS solutions to empower marketing teams.",
      "Built custom e-commerce flows using Stripe and serverless functions.",
    ],
    tech: ["Vue.js", "Nuxt", "Node.js", "AWS Lambda", "GSAP"],
  },
  {
    id: "exp-3",
    role: "UI/UX Developer",
    company: "PixelPerfect Inc.",
    period: "2019 - 2021",
    description: [
      "Bridged the gap between design and engineering, ensuring pixel-perfect implementation of UI designs.",
      "Optimized accessibility across all client projects, achieving WCAG 2.1 AA compliance.",
      "Collaborated with designers to prototype micro-interactions in code.",
    ],
    tech: ["React", "Sass", "Framer Motion", "Figma", "Storybook"],
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for tooltip
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const [hoveredExp, setHoveredExp] = useState<(typeof experiences)[0] | null>(
    null
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative z-30 bg-background py-20 lg:py-32"
    >
      <Container>
        <div className="mb-20">
          <SectionHeading
            title="Experience"
            subtitle="My Journey"
            description="A yearly snapshot of my creative growth and professional development."
          />
        </div>

        <div className="flex flex-col">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group relative border-b border-black/10 py-12 lg:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors hover:bg-secondary/5 px-4 -mx-4 rounded-xl cursor-default"
              onMouseEnter={() => setHoveredExp(exp)}
              onMouseLeave={() => setHoveredExp(null)}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk text-text-main group-hover:text-primary transition-colors">
                  {exp.role}
                </h3>
                <p className="text-lg md:text-xl text-text-muted">
                  {exp.company}
                </p>
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-medium text-text-muted/50 group-hover:text-text-main transition-colors font-space-grotesk">
                {exp.period}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Floating Tooltip */}
      {hoveredExp && (
        <motion.div
          className="fixed z-50 pointer-events-none hidden lg:block"
          style={{
            left: springX,
            top: springY,
            x: 20, // Offset from cursor
            y: 20,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-black/5 max-w-md">
            <h4 className="text-lg font-bold text-primary mb-2">
              {hoveredExp.company}
            </h4>
            <ul className="space-y-2 mb-4">
              {hoveredExp.description.map((desc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-text-dark leading-relaxed"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                  {desc}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {hoveredExp.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted bg-secondary/10 rounded border border-black/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
