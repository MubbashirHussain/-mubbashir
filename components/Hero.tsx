"use client";

import Image from "next/image";
import Container from "./base/Container";

import { MorphingText } from "@/components/liquidText";
import GlitchImage from "./GlitchImage";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { LiquidGlass } from "./liquidGlass";
import { FloatingParticles } from "@/components/ui/floating-particles";

const texts = [
  "Hi, I'm Mubbashir. 👋",
  "Building iOS & Android Apps.",
  "MERN Stack & React Native.",
  "Scalable Backend Systems.",
];

export default function Hero() {
  return (
    <div className="">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#18ffb0_100%)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#18ffb0,transparent)]"></div>
      </div>
      <FloatingParticles
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
        particleCount={500}
        particleColor1="#18ffb0"
        particleColor2="#ffffff"
        particleSize={2}
        antigravityForce={10}
      />
      <Container className="w-full h-screen relative overflow-hidden">
        <div className="flex h-screen  gap-20">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <div className="h-[4rem] relative ">
              <MorphingText texts={texts} className="" />
            </div>
            <p className="mt-4 text-neutral-300 text-2xl max-w-lg mt-10">
              Bring your UI to life with beautiful 3D scenes. Create immersive
              experiences that capture attention and enhance your design.
            </p>

            {/* <InteractiveHoverButton text="Get Started" /> */}
          </div>

          {/* Right content */}
          <div className="flex-1 relative ">
            <GlitchImage />
          </div>
        </div>
      </Container>
    </div>
  );
}
