"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import SectionHeading from "@/components/ui/sectionHeading";
import { ProjectCard } from "./cards";
import { Container } from "@/components/ui/container";

// ─── Data ───────────────────────────────────────────────────────────
const projects = [
  {
    title: "Oceanic Odyssey",
    tag: "Web Experience",
    description:
      "An interactive web experience showcasing marine biodiversity and conservation efforts, featuring stunning visuals from deep-sea explorations.",
    image: "",
  },
  {
    title: "EcoConnect",
    tag: "Social Platform",
    description:
      "A social platform connecting environmental enthusiasts with local green initiatives and volunteer opportunities.",
    image: "",
  },
  {
    title: "QuantumFlow",
    tag: "Analytics",
    description:
      "An advanced data visualization tool leveraging quantum-inspired algorithms for predictive market analysis.",
    image: "",
  },
  {
    title: "Aetheria VR",
    tag: "Virtual Reality",
    description:
      "An immersive virtual reality experience that transports users to fantastical, procedurally generated worlds.",
    image: "",
  },
  {
    title: "Synapse AI",
    tag: "Education",
    description:
      "A personalized learning assistant powered by AI, adapting educational content to individual student needs and progress.",
    image: "",
  },
  {
    title: "TerraHarvest",
    tag: "Robotics",
    description:
      "Automated farming robots designed to optimize crop yield and reduce resource consumption in modern agriculture.",
    image: "",
  },
];

const CARD_W = 300;
const CARD_H = 380;
const GAP = 24;

// ─── Main Section ───────────────────────────────────────────────────
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hiddenIndex, setHiddenIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while card is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const handleExpand = useCallback(
    (index: number, rect: DOMRect, rotation: number) => {
      setOriginRect(rect);
      setActiveIndex(index);
      setHiddenIndex(index);
      setIsClosing(false);
      // Store the initial rotation so the expanded card can animate from it
      (window as any)._expandRotation = rotation;
    },
    [],
  );

  const handleClose = useCallback(() => {
    // 1) Animate content out first
    setIsClosing(true);
    // 2) After content exits (~1000ms), shrink the card box
    setTimeout(() => {
      setActiveIndex(null);
      setIsClosing(false);
    }, 1000);
  }, []);

  return (
    <section ref={sectionRef} className="h-[500vh] relative z-20">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden project_bg">
        {/* Heading */}
        <div className="absolute top-10 left-0 w-full z-10 pointer-events-none">
          <Container className="px-6 md:px-10 lg:px-20">
            <SectionHeading
              title="Projects"
              subtitle="My Work"
              description="A collection of projects that showcase my skills and expertise in crafting meaningful and effective digital experiences."
            />
          </Container>
        </div>

        {/* Horizontal scroller */}
        <HorizontalScroller
          scrollYProgress={scrollYProgress}
          activeIndex={activeIndex}
          hiddenIndex={hiddenIndex}
          onExpand={handleExpand}
        />
      </div>

      {/* ── Expanded-card portal ─────────────────────────── */}
      {mounted &&
        createPortal(
          <AnimatePresence onExitComplete={() => setHiddenIndex(null)}>
            {activeIndex !== null && originRect && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  className="fixed inset-0 z-[200] backdrop-blur-md bg-black/55 cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={handleClose}
                />
                {/* Expanded card */}
                <ProjectCard
                  key={`card-expanded-${activeIndex}`}
                  {...projects[activeIndex]}
                  index={activeIndex}
                  isExpanded={true}
                  isClosing={isClosing}
                  originRect={originRect}
                  onClose={() => {
                    setHiddenIndex(activeIndex);
                  }}
                  onClick={handleClose}
                />
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <style>{`
        .project_bg {
          background-image: url('/images/project-bg.png');
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </section>
  );
}

// ─── Horizontal Scroller ────────────────────────────────────────────
function HorizontalScroller({
  scrollYProgress,
  activeIndex,
  hiddenIndex,
  onExpand,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  activeIndex: number | null;
  hiddenIndex: number | null;
  onExpand: (index: number, rect: DOMRect, rotation: number) => void;
}) {
  const stride = CARD_W + GAP;
  const totalCards = projects.length;

  // Smooth spring on scroll
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // x: start = half-screen inset (first card at center-right), end = all cards revealed
  // We'll compute these on the client via a ref
  const trackRef = useRef<HTMLDivElement>(null);

  // Start: first card starts at 50vw. As we scroll, move left by totalWidth.
  // useTransform drives translateX of the track.
  const totalScrollWidth = (totalCards - 1) * stride;

  const x = useTransform(smooth, [1, 0], [0, -totalScrollWidth]);

  return (
    // Outer container: positioned to start the first card at 50vw
    <div
      className="absolute inset-0 flex items-center"
      style={{ paddingLeft: "50vw" }}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex gap-6 items-center -rotate-8"
      >
        {projects.map((project, index) => (
          <CardItem
            key={index}
            index={index}
            project={project}
            isHidden={hiddenIndex === index}
            onExpand={onExpand}
            x={x}
          />
        ))}
      </motion.div>
    </div>
  );
}

function CardItem({
  index,
  project,
  isHidden,
  onExpand,
  x,
}: {
  index: number;
  project: (typeof projects)[0];
  isHidden: boolean;
  onExpand: (index: number, rect: DOMRect, rotation: number) => void;
  x: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      onExpand(
        index,
        cardRef.current.getBoundingClientRect(),
        animatedRotate.get(),
      );
    }
  };

  const stride = CARD_W + GAP;
  // Because x maps from 0 to -totalScrollWidth, the center for a given card is -index * stride
  const center = -index * stride;

  const animatedRotate = useTransform(
    x,
    [center - 7 * stride, center, center + 7 * stride],
    [-90, 10, 70],
  );

  return (
    <motion.div
      className="border-"
      ref={cardRef}
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
      }}
    >
      <ProjectCard
        {...project}
        index={index}
        isExpanded={false}
        isHidden={isHidden}
        onClick={handleClick}
        rotate={animatedRotate}
      />
    </motion.div>
  );
}
