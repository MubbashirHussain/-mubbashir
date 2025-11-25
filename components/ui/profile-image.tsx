import React, { useState } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { getColorStyle } from "@/lib/color-utils";

export interface FloatingIcon {
  /** Icon component from lucide-react */
  icon: LucideIcon;
  /** Background color class (e.g., 'bg-secondary') */
  bgClassName?: string;
  /** Background color of the icon container (Tailwind color name or hex) */
  backgroundColor?: string;
  /** Position className (e.g., "-right-8 top-20") */
  position: string;
  /** Icon size */
  size?: number;
}

export interface ProfileImageProps {
  /** Image source URL */
  imageSrc: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Frame color class (e.g., 'bg-primary') */
  frameBgClassName?: string;
  /** Frame color (hex fallback) */
  frameColor?: string;
  /** Apply grayscale filter */
  grayscale?: boolean;
  /** Floating icons configuration */
  floatingIcons?: FloatingIcon[];
  /** Additional className */
  className?: string;
}

/**
 * Profile image component with 3D tilt effect and floating icons.
 * Features interactive mouse-based parallax effect.
 *
 * @example
 * ```tsx
 * <ProfileImage
 *   imageSrc="/profile.jpg"
 *   frameColor="primary"
 *   floatingIcons={[
 *     { icon: Github, backgroundColor: "secondary", position: "-right-8 top-20" }
 *   ]}
 * />
 * ```
 */
export const ProfileImage = ({
  imageSrc = "/hero-person.png",
  imageAlt = "Portrait",
  frameBgClassName,
  frameColor = "primary",
  grayscale = true,
  floatingIcons = [],
  className = "",
}: ProfileImageProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameStyle = frameColor ? getColorStyle(frameColor, "bg") : {};

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltX = (centerY - e.clientY) / 25;
    const tiltY = (e.clientX - centerX) / 25;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative flex justify-center items-center md:pt-10 h-full ${className}`}
    >
      <div
        className="relative h-[700px] aspect-3/4 group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }}
      >
        {/* Frame Border Effect */}
        <div
          className={`absolute inset-0 p-4 transform rotate-2 transition-all duration-500 ease-out ${
            frameBgClassName || frameStyle.className || ""
          }`}
          style={{
            ...frameStyle.style,
            borderRadius: "3.5rem",
            boxShadow: `${tilt.y * 3}px ${
              tilt.x * 3
            }px 30px rgba(0, 0, 0, 0.2)`,
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotate(2deg)`,
            transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out",
          }}
        >
          {/* Inner White Frame */}
          <div
            className="h-full w-full bg-background shadow-2xl overflow-hidden"
            style={{ borderRadius: "3rem", padding: "12px" }}
          >
            {/* Image Container */}
            <div
              className="h-full w-full overflow-hidden relative"
              style={{ borderRadius: "2.5rem" }}
            >
              {/* Inner Shadow Overlay */}
              <div
                className="absolute inset-0 z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] pointer-events-none"
                style={{ borderRadius: "2.5rem" }}
              />

              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className={`w-full border h-full object-cover contrast-125 transition-all duration-700 hover:scale-[1.03] ${
                  grayscale ? "grayscale hover:grayscale-0" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        {floatingIcons.map((iconConfig, index) => {
          const IconComponent = iconConfig.icon;
          const iconBgStyle = iconConfig.backgroundColor
            ? getColorStyle(iconConfig.backgroundColor, "bg")
            : {};

          return (
            <div
              key={index}
              className={`absolute text-text-inverse p-4 rounded-2xl shadow-xl hidden md:block ${
                index === 0 ? "animate-bounce-slow" : "animate-bounce-delayed"
              } ${iconConfig.position} ${
                iconConfig.bgClassName || iconBgStyle.className || ""
              }`}
              style={iconBgStyle.style}
            >
              <IconComponent size={iconConfig.size || 24} />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-bounce-delayed {
          animation: bounce 3s infinite 1.5s;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-10%);
          }
          50% {
            transform: translateY(10%);
          }
        }
      `}</style>
    </div>
  );
};
