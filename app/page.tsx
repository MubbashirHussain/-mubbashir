"use client";

import HeroSection from "@/components/sections/hero";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <main className="">
      <div className="bg-primary">
        <HeroSection />
      </div>
      <div className="bg-background">
        <Container>
          <div className="h-screen"></div>
        </Container>
      </div>
    </main>
  );
}
