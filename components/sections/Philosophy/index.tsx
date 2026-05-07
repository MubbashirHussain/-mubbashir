import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import SidebarNav, { NavItem } from "./SideBar";
import ContentSection, { SectionData } from "./ContentSection";
import { ArrowDown, Code, Hand, PencilRuler } from "lucide-react";
import SectionHeading from "@/components/ui/sectionHeading";
import { SideTab } from "@/components/ui/side-tab";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();


  // Framer Motion Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to vertical movement
  // We want to move the content UP as we scroll down.
  // The distance to move is roughly the height of the content minus the viewport height.
  // Let's estimate or measure. For now, we can use a percentage or pixel value.
  // Assuming the content list is longer than the viewport (which it is).
  // Let's translate by -50% to -100% depending on length.
  // A safer bet is to use a large negative value that covers the content.
  // Since we don't have exact height measurement here easily without layout effects,
  // we'll use a responsive percentage.
  const y = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);

  // Update active ID based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Simple threshold mapping for 3 sections
      if (latest < 0.33) {
        if (activeId !== sections[0].id) setActiveId(sections[0].id);
      } else if (latest < 0.66) {
        if (activeId !== sections[1].id) setActiveId(sections[1].id);
      } else {
        if (activeId !== sections[2].id) setActiveId(sections[2].id);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeId]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    // With window scrolling, we'd need to scroll the window to the correct % of the container.
    // This is tricky to get exact pixel perfection without more measurements.
    // For now, we update the active ID manually.
    setActiveId(id);

    // Optional: Calculate scroll destination
    // const sectionIndex = sections.findIndex(s => s.id === id);
    // const scrollRatio = sectionIndex / (sections.length - 1);
    // Scroll window logic would go here if needed.
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full group/design-root h-[200vh] bg-background z-30"
    >
      <SideTab
        key={theme}

        // top=""
        // ref={scrollTabRef}
        top="-60px"
        left="25%"
        className={`-left-[50%] -translate-x-1/2 flex z-20 items-center justify-center pointer-events-auto`}
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
        height={"60px"}
        width={"20%"}
        cornerSize={30}
      >
        <span className="text-text-secondary animate-bounce flex gap-3 justify-center items-center">
          Scroll <ArrowDown size={20} />
        </span>
      </SideTab>
      <main className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 md:px-10 lg:px-20 pt-5 lg:pt-10">
        <div className="mx-auto max-w-7xl w-full h-full flex flex-col">
          {/* Page Title */}
          <SectionHeading
            title="My Philosophy"
            subtitle="Core Principles"
            description="Exploring the core principles that guide my work in crafting meaningful and effective digital experiences."
          />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 h-full overflow-hidden">
            {/* Sidebar Sticky Nav */}
            <aside className="hidden lg:block lg:w-1/3 lg:pt-10">
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
              <div className="flex flex-wrap gap-2 border border-black/10 dark:border-white/10 rounded-lg p-2">
                {navItems.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`px-3 py-1 text-sm font-medium transition-colors ${
                        activeId === item.id
                          ? "bg-primary-100 border-primary-300 text-text"
                          : "bg-transparent border-black/10 dark:border-white/10 text-text-muted hover:border-black/30 dark:hover:border-white/30"
                      }`}
                    >
                      {item.label}
                    </a>
                    {index < navItems.length - 1 && (
                      <span className="w-px h-4 bg-black/10 dark:bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area - Animated Viewport */}
            <div className="lg:w-2/3 h-full relative">
              <motion.div
                style={{ y }}
                className="relative flex flex-col pb-32"
              >
                {/* Timeline Vertical Line Wrapper */}
                <div className="relative min-h-full pl-3">
                  <div className="flex flex-col md:pl-16 pt-3">
                    <div
                      aria-hidden="true"
                      className="absolute line mt-9 left-0 md:left-6 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 hidden md:block z-0"
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
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhilosophySection;
