"use client";

import { Container } from "@/components/ui/container";
import { SideTab } from "@/components/ui/side-tab";
import { Header, NavLink } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfileImage, FloatingIcon } from "@/components/ui/profile-image";
import { ImageGallery } from "@/components/ui/image-gallery";
import { Github, Linkedin, Zap } from "lucide-react";
import { useRef } from "react";
import { tailwindToHex } from "@/lib/color-utils";
import { useElementUnits } from "@/hooks/use-element-units";

export default function Home() {
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toPx = useElementUnits(containerRef);

  // Navigation links configuration
  const navLinks: NavLink[] = [
    { label: "Home", href: "#", rel: "noopener noreferrer" },
    { label: "Services", href: "#services", rel: "noopener noreferrer" },
    { label: "Portfolio", href: "#portfolio", rel: "noopener noreferrer" },
    { label: "Blog", href: "#blog", rel: "noopener noreferrer" },
    { label: "Contact", href: "#contact", rel: "noopener noreferrer" },
  ];

  // Floating icons configuration
  const floatingIcons: FloatingIcon[] = [
    {
      icon: Github,
      backgroundColor: tailwindToHex("bg-secondary"),
      position: "-right-8 top-20",
      size: 24,
    },
    {
      icon: Linkedin,
      backgroundColor: tailwindToHex("bg-accent-600"),
      position: "-left-6 bottom-32",
      size: 24,
    },
  ];

  return (
    <main className="bg-primary">
      {/* Header */}
      <Header
        links={navLinks}
        bgClassName="bg-secondary"
        textClassName="text-text-inverse"
        width="30%"
        height="7%"
      />

      {/* Hero Section */}
      <Container className="h-screen bg-background relative max-h-[1020px]">
        <div className="grid grid-cols-12 gap-5 h-full" ref={containerRef}>
          {/* Left Column - Hero Content */}
          <div
            ref={parentRef}
            className="col-span-7 justify-start flex items-center"
          >
            <HeroSection
              name="Mubbashir"
              description="I'm a digital designer and developer crafting nurturing digital environments. Like a peaceful sanctuary in the city, I build interfaces that are both invigorating and accessible, suitable for all users."
              ctaText="Get in touch"
              onCtaClick={() => console.log("CTA clicked")}
              showOpenToWork={true}
              // accentClassName="text-primary"
              // ctaBgClassName="bg-primary"
            />
          </div>

          {/* Decorative Side Tab */}
          <SideTab
            bottom="29%"
            left="0%"
            bgClassName="bg-primary"
            eachCorner={{
              br: { enabled: false },
              tr: { enabled: false },
              bl: { enabled: true },
              tl: { enabled: false },
            }}
            side="left"
            height="1%"
            cornerSize={40}
          />

          {/* Bottom Image Gallery */}
          <ImageGallery
            imageCount={3}
            bgClassName="bg-primary"
            borderRadius="60px"
            width="50%"
            height="30%"
            position={{ bottom: "0", left: "0" }}
          />

          {/* Spacer */}
          <div className="col-span-1"></div>
          {/* Right Column - Profile Image */}
          <div className="col-span-4">
            {/* Background Shape */}
            <div
              className={`h-[80%] w-[43%] right-0 bg-primary absolute top-[10%]`}
              style={{
                borderRadius: toPx("5%"),
              }}
            />

            {/* Decorative Side Tabs */}
            <SideTab
              top="10%"
              right="0%"
              bgClassName="bg-primary"
              eachCorner={{
                br: { enabled: true },
                tr: { enabled: false },
                bl: { enabled: false },
                tl: { enabled: false },
              }}
              side="right"
              cornerSize={40}
            />
            <SideTab
              bottom="10%"
              right="0%"
              bgClassName="bg-primary"
              eachCorner={{
                br: { enabled: false },
                tr: { enabled: true },
                bl: { enabled: false },
                tl: { enabled: false },
              }}
              side="right"
              cornerSize={100}
            />

            {/* Profile Image with Tilt Effect */}
            <ProfileImage
              imageSrc="/hero-person.png"
              imageAlt="Mubbashir Portrait"
              frameBgClassName="bg-primary"
              grayscale={true}
              floatingIcons={floatingIcons}
            />
          </div>
        </div>
      </Container>

      {/* Additional Sections */}
      <Container className="h-screen">
        <div className=""></div>
      </Container>
    </main>
  );
}
