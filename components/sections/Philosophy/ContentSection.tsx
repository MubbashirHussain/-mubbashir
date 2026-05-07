import React from "react";

export interface SectionData {
  id: string;
  title: string;
  iconName: React.ReactNode;
  content: React.ReactNode[];
}
interface ContentSectionProps {
  data: SectionData;
  isActive: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ data, isActive }) => {
  return (
    <section
      id={data.id}
      className="scroll-mt-8 mb-24 relative group last:mb-0"
    >
      <div className="flex items-center gap-4 md:gap-0 mb-6 relative z-10">
        {/* Timeline Icon Node 
            Mobile: Relative position, inline with text.
            Desktop: Absolute position centered on the left ruler line.
            Calculation: 
            Line is at 16px (left-4) of the container.
            Content wrapper has pl-16 (64px).
            Icon is 48px (size-12). Center is 24px.
            Target Icon Center: 16px relative to container.
            Target Icon Left: 16px - 24px = -8px relative to container.
            Current context is offset by 64px.
            Needed left: -8px - 64px = -72px.
            -72px = -4.5rem.
        */}
        <div
          className={`
            flex items-center justify-center size-12 rounded-full border transition-all duration-500 z-20 shrink-0
            md:absolute md:-left-[4.5rem] md:top-1/2 md:-translate-y-1/2
            ${
              isActive
                ? "bg-primary-100 border-primary-300 text-text scale-110"
                : "bg-secondary border-secondary-100 text-text-muted md:bg-secondary-50"
            } cursor-button
        `}
        >
          <span
            className={`material-symbols-outlined text-xl transition-transform duration-500 ${
              isActive ? "scale-110 text-secondary-600" : "scale-100"
            }`}
          >
            {data.iconName}
          </span>
        </div>

        <h2
          className={`
          text-2xl md:text-3xl font-bold leading-tight tracking-tight transition-colors duration-500
          ${isActive ? "text-text" : "text-text/60"}
        `}
        >
          {data.title}
        </h2>
      </div>

      <div
        className={`
        space-y-4 text-base md:text-lg font-normal leading-relaxed transition-opacity duration-500
        ${
          isActive
            ? "text-text-muted opacity-100"
            : "text-text-muted/60 opacity-80"
        }
      `}
      >
        {data.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
