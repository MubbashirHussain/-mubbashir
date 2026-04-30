"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/sectionHeading";
import { Container } from "@/components/base/container";
import Image from "next/image";

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

const ExperienceItem = ({ exp }: { exp: (typeof experiences)[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 30 });
  const springY = useSpring(y, { stiffness: 120, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // High frequency on X (larger range), Low frequency on Y (smaller range)
    x.set(mouseX / 1);
    y.set(mouseY / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group md:px-8 border-b  border-secondary-400 py-12 lg:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors hover:bg-secondary-900 px-4 cursor-navigation duration-800 ease-in-out max-w-[100vw]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 jusZ">
          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk text-text-main group-hover:text-secondary-50 transition-colors duration-500 ease-in-out
              group-hover:text-shadow-[1px_1px_0_theme('colors.black'),_-1px_-1px_0_theme('colors.black'),_1px_-1px_0_theme('colors.black'),_-1px_1px_0_theme('colors.black')]"
          >
            {exp.role}
          </h3>
          <div className="small-card-parent w-auto relative mt-3 -ml-4 hidden lg:block">
            <motion.div
              style={{ x: springX, y: springY }}
              className="small-card h-3 absolute  top-0 max-w-[350px] w-3 group-hover:w-[350px] bg-background rounded-2xl border transition-all duration-900 ease-in-out
                     group-hover:h-[200px] group-hover:border-secondary-500 group-hover:top-[-80px] overflow-hidden
                     left-3 z-20"
            >
              {/* Tooltip */}
              <div className="relative w-full h-full transition-all duration-900 ease-in-out">
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 bg-secondary opacity-100
                            rounded-l-2xl h-full w-[10%] flex items-center justify-center border border-secondary-500
                           group-hover:text-primary group-hover:opacity-100 uppercase"
                >
                  <h4 className="text-md font-bold text-text-main rotate-90 origin-left-center whitespace-nowrap">
                    {exp.company}
                  </h4>
                </div>
                <ul className="absolute left-[15%] top-4 mb-4 text-xs w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {exp.description.map((desc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-text-dark leading-relaxed mb-1 text-text"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-secondary-500 shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>
                <div
                  className="absolute left-[15%] bottom-4 flex flex-wrap gap-2 w-0 group-hover:w-auto opacity-0 group-hover:opacity-100
                                group-hover:transition-opacity group-hover:duration-500 group-hover:delay-700 group-hover:ease-out"
                >
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-1 py-0.5 text-[8px] font-medium uppercase tracking-wider text-text-background bg-secondary/20 rounded border border-black/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <p className="text-lg md:text-xl text-text-muted">{exp.company}</p>

        {/* Mobile Description */}
        <div className="lg:hidden mt-4 space-y-4">
          <ul className="space-y-2">
            {exp.description.map((desc, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-muted"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary-500 shrink-0" />
                {desc}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-text-background bg-secondary/10 rounded border border-black/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl font-medium text-text-muted/50 group-hover:text-text-main transition-colors font-space-grotesk duration-800 ease-in-out group-hover:text-background">
        {exp.period}
      </div>
    </div>
  );
};

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-background py-20 lg:py-32 flex flex-col justify-center max-w-[100vw]"
    >
      <Container className="w-full max-w-[100vw]">
        <div className="mb-20">
          <SectionHeading
            title="Experience"
            subtitle="My Journey"
            description="A yearly snapshot of my creative growth and professional development."
          />
        </div>
      </Container>

      <div className="flex flex-col">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} exp={exp} />
        ))}
      </div>
      {/* Floating Tooltip */}
      {/* {hoveredExp && (
        
      )} */}
    </section>
  );
}
