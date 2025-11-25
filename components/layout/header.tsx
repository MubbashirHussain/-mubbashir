import React from "react";
import { SideTab } from "@/components/ui/side-tab";
import { getColorStyle } from "@/lib/color-utils";
import { FloatingIcon } from "../ui/profile-image";

export interface NavLink {
  /** Display text for the link */
  label: string;
  /** URL/href for the link */
  href: string;
  /** Optional target attribute (e.g., "_blank") */
  target?: string;
  /** Optional rel attribute (e.g., "noopener noreferrer") */
  rel?: string;
}

export interface ProfileImageProps {
  /** Image source URL */
  imageSrc: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Frame color class (e.g., 'bg-primary') */
  frameBgClassName?: string;
  /** Apply grayscale filter */
  grayscale?: boolean;
  /** Floating icons configuration */
  floatingIcons?: FloatingIcon[];
}

export interface HeaderProps {
  /** Array of navigation links */
  links?: NavLink[];
  /** Background className (e.g., 'bg-secondary') */
  bgClassName?: string;
  /** Background color as hex (fallback) */
  backgroundColor?: string;
  /** Text className (e.g., 'text-text-inverse') */
  textClassName?: string;
  /** Text color as hex (fallback) */
  textColor?: string;
  /** Accent color class (e.g., 'text-primary') */
  accentClassName?: string;
  /** Call to action button background class (e.g., 'bg-accent') */
  ctaBgClassName?: string;
  /** Frame background class (e.g., 'bg-gray-200') */
  frameBgClassName?: string;
  /** Width of the header (percentage or fixed value) */
  width?: string;
  /** Height of the header (percentage or fixed value) */
  height?: string;
  /** Border radius for the header container */
  radius?: string;
  /** Corner size for inverted corners */
  cornerSize?: number;
  /** Additional classes for the header container */
  className?: string;
  /** Gap between navigation links */
  navGap?: string;
}

/**
 * A configurable header component with navigation links.
 * Built on top of SideTab for a unique, modern design.
 *
 * @example
 * ```tsx
 * <Header
 *   links={[
 *     { label: "Home", href: "/" },
 *     { label: "About", href: "/about" },
 *     { label: "Contact", href: "/contact" }
 *   ]}
 *   backgroundColor="secondary"
 *   textColor="text-inverse"
 * />
 * ```
 */
export const Header = ({
  links = [
    { label: "Home", href: "#", rel: "noopener noreferrer" },
    { label: "Services", href: "#", rel: "noopener noreferrer" },
    { label: "Portfolio", href: "#", rel: "noopener noreferrer" },
    { label: "Blog", href: "#", rel: "noopener noreferrer" },
    { label: "Contact", href: "#", rel: "noopener noreferrer" },
  ],
  bgClassName,
  backgroundColor,
  textClassName,
  textColor,
  width = "30%",
  height = "7%",
  radius = "40px",
  cornerSize = 40,
  className = "",
  navGap = "gap-8",
}: HeaderProps) => {
  const textColorStyle = textColor ? getColorStyle(textColor, "text") : {};
  const bgStyle = backgroundColor
    ? getColorStyle(backgroundColor, "bg-secondary")
    : {};

  return (
    <SideTab
      top="0"
      left="50%"
      className={`-left-[50%] -translate-x-1/2 flex items-center justify-center fixed top-0 z-50 ${className}`}
      color={backgroundColor}
      bgClassName={bgClassName}
      eachCorner={{
        br: { enabled: false },
        tr: { enabled: true, backgroundColor: "bg-secondary" },
        bl: { enabled: false },
        tl: { enabled: true, backgroundColor: "bg-secondary" },
      }}
      radius={radius}
      side="top"
      height={height}
      width={width}
      cornerSize={cornerSize}
    >
      <nav className="flex flex-col gap-2">
        <ul className={`flex ${navGap}`}>
          {links.map((link, index) => (
            <li
              key={index}
              className={textClassName || textColorStyle.className || ""}
              style={textColorStyle.style}
            >
              <a
                href={link.href}
                target={link.target}
                rel={link.rel}
                className="hover:opacity-80 transition-opacity"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </SideTab>
  );
};
