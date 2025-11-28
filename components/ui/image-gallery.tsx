import React from "react";
import { getColorStyle } from "@/lib/color-utils";

export interface ImageGalleryProps {
  /** Number of placeholder images */
  imageCount: number;
  /** Background color class (e.g., 'bg-primary') */
  bgClassName?: string;
  /** Background color (hex fallback) */
  backgroundColor?: string;
  /** Border radius for the gallery container */
  borderRadius?: string;
  /** Width of the container */
  width?: string;
  /** Height of the container */
  height?: string;
  /** Position (bottom, left, etc.) */
  position?: {
    bottom?: string;
    left?: string;
    top?: string;
    right?: string;
  };
  /** Gap between image boxes */
  gap?: string;
  /** Padding of the container */
  padding?: string;
  /** Additional className */
  className?: string;
  /** Custom image box className */
  imageBoxClassName?: string;
}

/**
 * Image gallery component with configurable layout.
 * Displays a grid of image placeholder boxes.
 *
 * @example
 * ```tsx
 * <ImageGallery
 *   imageCount={3}
 *   backgroundColor="primary"
 *   borderRadius="60px"
 * />
 * ```
 */
export const ImageGallery = React.forwardRef(
  (
    {
      imageCount = 3,
      bgClassName,
      backgroundColor = "primary",
      borderRadius = "60px",
      width = "50%",
      height = "30%",
      position = { bottom: "0", left: "0" },
      gap = "gap-6",
      padding = "p-10 pb-12 md:pb-0",
      className = "",
      imageBoxClassName = "w-[30%] aspect-square bg-background-secondary rounded-3xl h-fit",
    }: ImageGalleryProps,
    ref
  ) => {
    const bgStyle = backgroundColor ? getColorStyle(backgroundColor, "bg") : {};

    const positionStyles: React.CSSProperties = {
      ...bgStyle.style,
      borderTopRightRadius: borderRadius,
      width,
      height,
      ...position,
    };

    return (
      <div
        ref={ref as any}
        className={`flex flex-wrap ${gap} absolute z-10 ${padding} ${
          bgClassName || bgStyle.className || ""
        } ${className}`}
        style={positionStyles}
      >
        {Array.from({ length: imageCount }).map((_, index) => (
          <div key={index} className={`image-box ${imageBoxClassName}`} />
        ))}
      </div>
    );
  }
);

ImageGallery.displayName = "ImageGallery";
