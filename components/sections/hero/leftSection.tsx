import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SideTab } from "@/components/ui/side-tab";
import { getColorStyle } from "@/lib/color-utils";
import gsap from "gsap";

export interface HeroLeftSectionProps {
  /** Name to display in the heading */
  name?: string;
  /** Description/bio text */
  description?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button click handler */
  onCtaClick?: () => void;
  /** Show "Open to Work" badge */
  showOpenToWork?: boolean;
  /** Open to work badge text */
  openToWorkText?: string;
  /** Accent color (for underline, button, etc.) - Tailwind color name or hex */
  accentColor?: string;
  /** Additional className */
  className?: string;
}

/**
 * Hero section component with customizable content.
 * Includes decorative side tabs, heading with animated underline,
 * description, and CTA button.
 *
 * @example
 * ```tsx
 * <HeroLeftSection
 *   name="John Doe"
 *   description="I'm a developer..."
 *   ctaText="Hire me"
 *   onCtaClick={() => console.log('CTA clicked')}
 *   accentColor="primary"
 * />
 * ```
 */
export const HeroLeftSection = ({
  name = "Mubbashir",
  description = "I'm a digital designer and developer crafting nurturing digital environments. Like a peaceful sanctuary in the city, I build interfaces that are both invigorating and accessible, suitable for all users.",
  ctaText = "Get in touch",
  onCtaClick,
  showOpenToWork = true,
  openToWorkText = "Open to work",
  accentColor = "primary",
  className = "",
}: HeroLeftSectionProps) => {
  const accentStyle = getColorStyle(accentColor, "text");
  const bgStyle = getColorStyle(accentColor, "bg");

  const blobRef = useRef<HTMLDivElement>(null);
  const blobRef1 = useRef<HTMLDivElement>(null);
  const TextSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blobRef.current) {
      gsap.from([blobRef.current, blobRef1.current], {
        y: -300,
        duration: 1.5,
        ease: "power3.out",
      });
      gsap.from(TextSectionRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className={`flex flex-col justify-start md:pr-12 ${className}`}>
      {/* Decorative Side Tabs */}
      <div className="">
        <SideTab
          ref={blobRef}
          top="13.5%"
          left="0%"
          right="0%"
          bottom="0%"
          color="primary"
          eachCorner={{
            br: { enabled: false },
            tr: {
              enabled: true,
              className: "left-[67.5%] ",
              viewBox: "0 0 190 100",
            },
            tl: { enabled: true },
            bl: { enabled: true },
          }}
          eachRadius={{
            tr: "60px",
          }}
          cornerSize={40}
          side="left"
          height="8%"
          width="18%"
        />
        <SideTab
          ref={blobRef1}
          top="18.5%"
          left="15%"
          right="0%"
          bottom="0%"
          color="primary"
          cornerSize={30}
          eachCorner={{
            bl: {
              enabled: true,
              // fillColor: "primary",
              // backgroundColor: "primary",
              viewBox: "0 0 190 100",
              className: "left-[15.7%]",
            },
            tl: { enabled: false },
            br: { enabled: false },
            tr: { enabled: false },
          }}
          radius="60px"
          eachRadius={{
            tl: "0px",
            tr: "60px",
            br: "60px",
            bl: "60px",
          }}
          side="left"
          height="7%"
          width="16%"
        />
      </div>
      <div className="" ref={TextSectionRef}>
        {/* "Open to Work" Badge */}
        {showOpenToWork && (
          <div className="inline-flex items-center gap-3 border border-primary-200 bg-primary-50 px-5 py-2 rounded-full w-fit mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-secondary-800 tracking-wide">
              {openToWorkText}
            </span>
          </div>
        )}

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight text-text">
          Hey, I am{" "}
          <span className="relative">
            {name}
            {/* Underline decoration */}
            <svg
              className={`absolute w-full h-3 left-0 ${
                accentStyle.className || ""
              }`}
              viewBox="0 0 200 010"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={accentStyle.style}
            >
              <path
                d="M2.00025 6.99997C25.7501 2.49994 132.5 -1.49999 198 3.99998"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-lg">
          {description}
        </p>

        {/* CTA Button */}
        <button
          onClick={onCtaClick}
          className={`text-secondary font-bold text-lg px-8 py-4 rounded-full w-fit transition-all duration-300 shadow-sm  hover:shadow-md hover:scale-105 flex items-center gap-3 group mb-16 md:mb-24 hover:bg-secondary hover:text-primary ${
            bgStyle.className || ""
          }`}
          style={bgStyle.style}
        >
          <span>{ctaText}</span>
          <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
