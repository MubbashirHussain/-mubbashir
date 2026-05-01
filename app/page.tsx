"use client";

import { Header } from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import PhilosophySection from "@/components/sections/Philosophy";
import ProjectsSection from "@/components/sections/projects";
import ExperienceSection from "@/components/sections/experience";
import { Container } from "@/components/ui/container";
import Terminal from "@/components/ui/terminal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useEffect } from "react";
import SpreaterLine from "@/components/animations/spreaterLine";
import ContactSection from "@/components/sections/contact";
export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = headerRef.current;
    const main = mainRef.current;
    const hero = heroRef.current;

    if (!header || !main || !hero) return;

    const ctx = gsap.context(() => {
      // Initial animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(header, {
        y: -100,
        duration: 1,
        delay: 0.4,
      });

      // Scroll Trigger animation
      ScrollTrigger.create({
        trigger: hero,
        start: "95% top", // When 95% of hero is at top of viewport
        onEnter: () => {
          gsap.to(header, {
            left: "80%",
            x: 0, // Clear the parsed CSS matrix translation
            xPercent: -90,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(header, {
            left: "50%", // Reset to original center position
            x: 0, // Clear the parsed CSS matrix translation
            xPercent: -50, // Reset to original center transform
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onRefresh: (self) => {
          // Handle initial state on reload
          if (self.isActive) {
            gsap.set(header, {
              left: "80%",
              x: 0,
              xPercent: -90,
            });
          }
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);
  return (
    <main className="max-w-screen" ref={mainRef}>
      <div className="absolute bottom-0 w-full bg-transparent z-[100]">
        <Terminal />
      </div>
      {/* Header */}

      <Header
        ref={headerRef}
        // links={navLinks}
        className=""
        bgClassName="bg-secondary"
        textClassName="text-text-inverse"
        width="30%"
        height="7%"
        // We'll control horizontal position via GSAP
        style={{ position: "fixed" }} // Ensure it's fixed as per SideTab default, but we might need to override if SideTab sets it. SideTab sets fixed.
      />
      <div className="bg-primary sticky top-0 z-30" ref={heroRef}>
        <Container className="h-screen bg-background relative max-h-[1020px]">
          <HeroSection />
        </Container>
      </div>

      <div className="bg-background relative z-30">
        <Container className="font-space-grotesk">
          <div className="sec-2-main">
            <PhilosophySection />
          </div>
        </Container>

        <SpreaterLine title="Projects" />

        <div className="relative z-30 bg-background shadow-lg">
          <ProjectsSection />
        </div>

        <SpreaterLine title="Experience" />

        <ExperienceSection />

        <ContactSection />
      </div>
    </main>
  );
}
