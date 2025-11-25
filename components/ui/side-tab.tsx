import React from "react";
import { InvertedCorner } from "@/components/ui/inverted-corner";
import { getColorStyle, tailwindToHex } from "@/lib/color-utils";

/** Configuration for a single corner */
interface CornerConfig {
  /** Whether to show this corner */
  enabled?: boolean;
  /** Size of the corner (width and height) */
  size?: number | string;
  /** Fill color of the corner shape */
  fillColor?: string;
  /** Background color behind the corner curve */
  backgroundColor?: string;
  /** Additional CSS classes for this corner */
  className?: string;
  /** ViewBox for the corner shape */
  viewBox?: string;
}

/** Configuration for each corner using position-based keys */
interface EachCornerConfig {
  /** Top-left corner */
  tl?: CornerConfig;
  /** Top-right corner */
  tr?: CornerConfig;
  /** Bottom-left corner */
  bl?: CornerConfig;
  /** Bottom-right corner */
  br?: CornerConfig;
}

/** Configuration for each radius corner */
interface EachRadiusConfig {
  /** Top-left radius */
  tl?: string;
  /** Top-right radius */
  tr?: string;
  /** Bottom-left radius */
  bl?: string;
  /** Bottom-right radius */
  br?: string;
}

interface SideTabProps {
  /** Width of the tab */
  width?: number | string;
  /** Height of the tab */
  height?: number | string;
  /** Top position (e.g. "15%", 50) */
  top?: number | string;
  /** Left position (e.g. "15%", 50) */
  left?: number | string;
  /** Right position (e.g. "15%", 50) */
  right?: number | string;
  /** Bottom position (e.g. "15%", 50) */
  bottom?: number | string;
  /** Background color className (e.g., 'bg-primary') */
  bgClassName?: string;
  /** Background color as hex (fallback for non-Tailwind colors) */
  color?: string;
  /** Border radius for the tab's main rounded edge (single value for all) */
  radius?: string;
  /** Individual border radius for each corner (tl, tr, bl, br) */
  eachRadius?: EachRadiusConfig;
  /** Default size for all corners (can be overridden per corner) */
  cornerSize?: number | string;
  /** Configuration for each corner (tl, tr, bl, br) */
  eachCorner?: EachCornerConfig;
  /** Additional classes */
  className?: string;
  /** Side to attach the tab to */
  side?: "left" | "right" | "top" | "bottom";
  /** Child elements to render inside the tab */
  children?: React.ReactNode;
}

/**
 * A decorative tab component that attaches to a container.
 * Features smooth inverted corners for a seamless "melted" look.
 * Supports up to 4 corners with individual configuration.
 *
 * @example
 * ```tsx
 * <SideTab
 *   side="left"
 *   color="primary"
 *   radius="60px"
 *   eachRadius={{
 *     tl: "20px",
 *     tr: "40px",
 *     bl: "20px",
 *     br: "40px"
 *   }}
 *   eachCorner={{
 *     tl: { enabled: true, size: "40px" },
 *     tr: { enabled: false },
 *     br: { enabled: true, fillColor: "#FF0000" }
 *   }}
 * />
 * ```
 */
export const SideTab = ({
  width = "100px",
  height = "90px",
  top,
  left,
  right,
  bottom,
  bgClassName,
  color,
  radius = "9999px",
  eachRadius,
  cornerSize = "40px",
  eachCorner = {},
  className = "",
  side = "left",
  children,
}: SideTabProps) => {
  const isVertical = side === "left" || side === "right";
  const bgStyle = color ? getColorStyle(color, "bg") : {};
  const bgColor = tailwindToHex(bgClassName || "");

  // Determine the main tab's border radius based on side
  let borderRadiusStyle: React.CSSProperties = {};

  if (eachRadius) {
    // Use individual radius values if provided
    borderRadiusStyle = {
      borderTopLeftRadius: eachRadius.tl || "0",
      borderTopRightRadius: eachRadius.tr || "0",
      borderBottomLeftRadius: eachRadius.bl || "0",
      borderBottomRightRadius: eachRadius.br || "0",
    };
  } else {
    // Use single radius value based on side
    if (side === "left") {
      borderRadiusStyle = {
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
      };
    } else if (side === "right") {
      borderRadiusStyle = {
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
      };
    } else if (side === "top") {
      borderRadiusStyle = {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      };
    } else if (side === "bottom") {
      borderRadiusStyle = {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
      };
    }
  }

  // Determine styles for the main tab
  let mainTabStyles: React.CSSProperties = {
    width: width,
    height: height,
    top,
    left,
    right,
    bottom,
    ...bgStyle.style,
    ...borderRadiusStyle,
  };

  // Define default corner configuration
  const defaultCornerConfig: CornerConfig = {
    enabled: true,
    size: cornerSize,
    fillColor: "transparent",
    backgroundColor: color,
  };

  // Map position keys to array indices based on side
  // For left side: bl (1), tl (2), br (3), tr (4)
  let cornerKeyMap: (keyof EachCornerConfig)[] = [];

  if (side === "left") {
    cornerKeyMap = ["bl", "tl", "br", "tr"];
  } else if (side === "right") {
    cornerKeyMap = ["br", "tr", "bl", "tl"];
  } else if (side === "top") {
    cornerKeyMap = ["tr", "tl", "br", "bl"];
  } else if (side === "bottom") {
    cornerKeyMap = ["br", "bl", "tr", "tl"];
  }

  // Merge user config with defaults for each corner
  const mergedCorners = cornerKeyMap.map((key) => ({
    ...defaultCornerConfig,
    ...(eachCorner[key] || {}),
  }));

  // Define corner positions based on side
  type CornerPosition =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

  interface CornerLayout {
    className: string;
    position: CornerPosition;
  }

  let cornerLayouts: CornerLayout[] = [];

  if (side === "left") {
    cornerLayouts = [
      { className: "absolute bottom-full left-0", position: "bottom-left" },
      { className: "absolute top-full left-0", position: "top-left" },
      { className: "absolute bottom-full right-0", position: "bottom-right" },
      { className: "absolute top-full right-0", position: "top-right" },
    ];
  } else if (side === "right") {
    cornerLayouts = [
      { className: "absolute bottom-full right-0", position: "bottom-right" },
      { className: "absolute top-full right-0", position: "top-right" },
      { className: "absolute bottom-full left-0", position: "bottom-left" },
      { className: "absolute top-full left-0", position: "top-left" },
    ];
  } else if (side === "top") {
    cornerLayouts = [
      { className: "absolute right-full top-0", position: "top-right" },
      { className: "absolute left-full top-0", position: "top-left" },
      { className: "absolute right-full bottom-0", position: "bottom-right" },
      { className: "absolute left-full bottom-0", position: "bottom-left" },
    ];
  } else if (side === "bottom") {
    cornerLayouts = [
      { className: "absolute right-full bottom-0", position: "bottom-right" },
      { className: "absolute left-full bottom-0", position: "bottom-left" },
      { className: "absolute right-full top-0", position: "top-right" },
      { className: "absolute left-full top-0", position: "top-left" },
    ];
  }

  return (
    <div
      className={`absolute ${
        bgClassName || bgStyle.className || ""
      } ${className}`}
      style={mainTabStyles}
    >
      {mergedCorners.map((corner, index) =>
        corner.enabled ? (
          <InvertedCorner
            viewBox={corner.viewBox}
            key={index}
            className={`${cornerLayouts[index].className} ${
              corner.className || ""
            }`}
            style={{ width: corner.size, height: corner.size }}
            position={cornerLayouts[index].position}
            fillColor={corner.fillColor}
            backgroundColor={
              corner.backgroundColor ||
              tailwindToHex(bgStyle.className || bgColor)
            }
          />
        ) : null
      )}
      {children}
    </div>
  );
};
