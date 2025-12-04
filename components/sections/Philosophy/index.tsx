import React, { useEffect, useState, useRef } from "react";
import SidebarNav, { NavItem } from "./SideBar";
import ContentSection, { SectionData } from "./ContentSection";
import { Code, Hand, PencilRuler } from "lucide-react";

// Data Definition
const sections: SectionData[] = [
  {
    id: "design",
    title: "Human-Centered Design",
    iconName: <PencilRuler />,
    content: [
      "Every line of code and every pixel is crafted with the end-user in mind. I believe that true innovation stems from a deep understanding of human needs, resulting in intuitive and delightful digital experiences that are both beautiful and functional.",
      "My process starts with empathy, diving deep into user research and personas to build a solid foundation. This user-first approach ensures that the final product not only looks great but also solves real-world problems and feels effortless to use.",
    ],
  },
  {
    id: "code",
    title: "Clean & Scalable Code",
    iconName: <Code />,
    content: [
      "I write code that is not just functional but also elegant, maintainable, and built for the future. By adhering to best practices, modern standards, and a component-based architecture, I create robust systems that can grow and adapt without accumulating technical debt.",
      "Performance is a key feature. I meticulously optimize for speed and efficiency, ensuring a fast, responsive experience for every user, regardless of their device or connection speed. A well-structured codebase is the backbone of any successful digital product.",
    ],
  },
  {
    id: "inclusive",
    title: "Inclusive by Default",
    iconName: <Hand />,
    content: [
      "The web should be for everyone. I am committed to building accessible and inclusive experiences from the ground up, ensuring that people of all abilities can navigate, understand, and interact with the digital world I help create.",
      "This means more than just meeting WCAG guidelines; it's about a fundamental mindset of designing with empathy for diverse users. From semantic HTML and ARIA roles to thoughtful color contrast and keyboard navigation, inclusivity is a non-negotiable part of my development process.",
    ],
  },
];

const navItems: NavItem[] = sections.map((s) => ({
  id: s.id,
  label: s.title,
  href: `#${s.id}`,
  iconName: s.iconName,
}));

const PhilosophySection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const observer = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll Spy Logic attached to the scroll container
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: scrollContainerRef.current, // Watch scrolling within this container
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in the top part of the view
      threshold: 0.1,
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.current?.observe(el);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      // Calculate position relative to container
      const containerTop =
        scrollContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offset =
        elementTop - containerTop + scrollContainerRef.current.scrollTop - 12; // 32px padding top

      scrollContainerRef.current.scrollTo({
        top: offset,
        behavior: "smooth",
      });
      // Fallback active set in case intersection observer is slow
      setActiveId(id);
    }
  };

  return (
    <div className="relative flex flex-col w-full group/design-root overflow-x-hidden">
      <main className="flex-1 px-6 md:px-10 lg:px-20 pt-16 lg:pt-24 header-height">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="mb-1 lg:mb-24 animate-in fade-in duration-700 slide-in-from-bottom-4">
            <p className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
              Core Principles
            </p>
            <h1 className="text-text-main text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              My Philosophy
            </h1>
            <p className="text-text-muted text-lg md:text-xl font-normal leading-normal mt-4 max-w-3xl">
              Exploring the core principles that guide my work in crafting
              meaningful and effective digital experiences.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 ">
            {/* Sidebar Sticky Nav */}
            <aside className="hidden lg:block lg:w-1/3 lg:sticky lg:top-32 lg:self-start animate-in fade-in duration-1000 slide-in-from-left-4 delay-200">
              <SidebarNav
                items={navItems}
                activeId={activeId}
                onLinkClick={handleNavClick}
              />
            </aside>

            {/* Mobile Nav Links (Visible only on small screens) */}
            <div className="lg:hidden mb-8">
              <p className="text-sm font-bold text-text-muted uppercase mb-4">
                Jump to section:
              </p>
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-3 py-2 rounded-full border text-sm font-medium transition-colors ${
                      activeId === item.id
                        ? "bg-primary border-primary text-text-main"
                        : "bg-transparent border-black/10 text-text-muted hover:border-black/30"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Main Content Area - Scrollable Viewport */}
            <div className="lg:w-2/3 animate-in fade-in duration-1000 slide-in-from-bottom-8 delay-300 ">
              <div
                ref={scrollContainerRef}
                className="relative h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent md:pl-0 scrollbar-hidden pb-25"
                style={{ scrollBehavior: "smooth" }}
              >
                {/* Timeline Vertical Line Wrapper 
                     We wrap the content in a relative div to ensure the line spans the full scroll height
                 */}
                <div className="relative min-h-full pl-3">
                  <div className="flex flex-col md:pl-16  pt-3 pb-32">
                    <div
                      aria-hidden="true"
                      className="absolute line mt-9 left-0 md:left-6 top-0 bottom-0 w-px bg-black/10 hidden md:block z-0"
                    />
                    {sections.map((section) => (
                      <ContentSection
                        key={section.id}
                        data={section}
                        isActive={activeId === section.id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhilosophySection;
