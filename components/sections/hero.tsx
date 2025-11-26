import { Container } from "@/components/ui/container";
import { Header, NavLink } from "@/components/layout/header";
import { SideTab } from "@/components/ui/side-tab";
import { ImageGallery } from "@/components/ui/image-gallery";
import { useRef } from "react";
import { useElementUnits } from "@/hooks/use-element-units";
import { FloatingIcon, ProfileImage } from "@/components/ui/profile-image";
import BatteryIcon from "@/components/ui/batteryIcon";
import Charge from "@/components/ui/svg/charge";
import {
  ArrowDown,
  ArrowDownWideNarrowIcon,
  Github,
  Linkedin,
} from "lucide-react";
import { tailwindToHex } from "@/lib/color-utils";
import { HeroLeftSection } from "./hero-section";

export default function HeroSection() {
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toPxContainer = useElementUnits(containerRef);

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
    <div>
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
            <HeroLeftSection
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

          <SideTab
            // top=""
            bottom="0%"
            left="25%"
            className={`-left-[50%] -translate-x-1/2 z-30 flex items-center justify-center `}
            color={"bg-secondary"}
            bgClassName="bg-background"
            eachCorner={{
              br: { enabled: true, backgroundColor: "bg-background" },
              tr: { enabled: false },
              bl: { enabled: true, backgroundColor: "bg-background" },
              tl: { enabled: false },
            }}
            radius={"30px"}
            side="bottom"
            height={"6%"}
            width={"20%"}
            cornerSize={30}
          >
            <span className="text-secondary animate-bounce flex gap-3 justify-center items-center">
              Scroll <ArrowDown size={20} />
            </span>
          </SideTab>
          {/* Bottom Image Gallery */}
          <ImageGallery
            imageCount={3}
            bgClassName="bg-primary"
            borderRadius="60px"
            width="50%"
            height="30%"
            position={{ bottom: "0", left: "0" }}
            className=""
          />

          {/* Spacer */}
          <div className="col-span-1"></div>
          {/* Right Column - Profile Image */}
          <div className="col-span-4 flex flex-col ">
            <div className="bg-secondary flex justify-between items-center p-2 px-3 w-[80%] my-3 rounded-full h-[60px]  self-baseline-last">
              <BatteryIcon
                className="ms-2"
                batteryPercentage={82}
                bgColor=""
                tipColor="bg-white"
                strokeColor="border-white"
                fillColor="bg-white"
                textColor="text-white"
              />
              <div className="group flex h-10 items-center border border-white rounded-full p-2 transition-all duration-300 hover:bg-white hover:text-secondary text-white cursor-pointer hover:pr-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Charge className="w-5 h-5" />
                </div>
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium">
                  Plug In
                </span>
              </div>
            </div>

            {/* Background Shape */}
            <div
              className={`h-[80%] w-[43%] right-0 bg-primary absolute top-[10%]`}
              style={{
                borderRadius: toPxContainer("5%"),
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
    </div>
  );
}
