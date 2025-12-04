"use client";

import HeroSection from "@/components/sections/hero";
import PhilosophySection from "@/components/sections/Philosophy";
import { Container } from "@/components/ui/container";
import Terminal from "@/components/ui/terminal";

export default function Home() {
  return (
    <main className="max-w-screen">
      <Terminal />
      <div className="bg-primary">
        <HeroSection />
      </div>
      <div className="bg-background">
        <Container className="h-screen font-space-grotesk">
          <div className="sec-2-main h-screen">
            <PhilosophySection />
          </div>
          <style>
            {`
              .sec-2-main {
              background-image: url("/image/charge.svg");
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              }
            `}
          </style>
        </Container>
      </div>
    </main>
  );
}
