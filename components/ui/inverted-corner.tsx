import { getColorStyle, tailwindToHex } from "@/lib/color-utils";
import React, { useId } from "react";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface InvertedCornerProps extends React.SVGProps<SVGSVGElement> {
  position?: CornerPosition;
  fillColor?: string; // The color of the shape itself
  backgroundColor?: string; // The color behind the curve (optional)
  viewBox?: string; // The SVG viewBox attribute
}

/**
 * A component that renders an "inverted" rounded corner.
 * Useful for creating smooth connections between sections ("fillets").
 *
 * The shape fills the square *except* for a rounded corner cutout.
 *
 * @param position - Which corner has the cutout. Defaults to "top-left".
 * @param className - Use text-{color} or fill-{color} to set the color of the shape if fillColor is not provided.
 * @param fillColor - Explicit color for the shape. If "transparent", it cuts a hole in the background.
 * @param backgroundColor - Explicit color for the background behind the curve.
 */
export const InvertedCorner = ({
  position = "top-left",
  className = "",
  style,
  fillColor,
  backgroundColor = "transparent",
  viewBox = "0 0 100 100",
  ...props
}: InvertedCornerProps) => {
  const maskId = useId();
  let rotate = 0;
  switch (position) {
    case "top-left":
      rotate = 0;
      break;
    case "top-right":
      rotate = 90;
      break;
    case "bottom-right":
      rotate = 180;
      break;
    case "bottom-left":
      rotate = 270;
      break;
  }

  const pathD = "M 0 100 L 100 100 L 100 0 A 100 100 0 0 0 0 100 Z";
  const isTransparentFill = fillColor === "transparent";
  // Convert Tailwind class or hex to a hex string for the background fill
  const bgHex = tailwindToHex(backgroundColor || "transparent");

  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={{
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      preserveAspectRatio="none"
      {...props}
    >
      {isTransparentFill ? (
        <>
          <defs>
            <mask id={maskId}>
              <rect width="100" height="100" fill="white" />
              <path d={pathD} fill="black" />
            </mask>
          </defs>
          <rect
            width="100"
            height="100"
            fill={bgHex}
            mask={`url(#${maskId})`}
          />
        </>
      ) : (
        <>
          {/* Optional Background Layer (The part that gets "cut out") */}
          {bgHex !== "transparent" && (
            <rect width="100" height="100" fill={bgHex} />
          )}

          {/* The Inverted Corner Shape */}
          <path d={pathD} fill={fillColor || "currentColor"} />
        </>
      )}
    </svg>
  );
};
