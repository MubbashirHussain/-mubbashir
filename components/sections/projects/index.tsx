import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import SectionHeading from "@/components/ui/sectionHeading";
import ProjectCard from "./cards";
import Image from "next/image";
import { Container } from "@/components/ui/container";

const projects = [
  {
    title: "Oceanic Odyssey",
    description:
      "An interactive web experience showcasing marine biodiversity and conservation efforts, featuring stunning visuals from deep-sea explorations.",
    image: "",
  },
  {
    title: "EcoConnect",
    description:
      "A social platform connecting environmental enthusiasts with local green initiatives and volunteer opportunities.",
    image: "/images/project-ecoconnect.png",
  },
  {
    title: "QuantumFlow Analytics",
    description:
      "An advanced data visualization tool leveraging quantum-inspired algorithms for predictive market analysis.",
    image: "/images/project-quantumflow.png",
  },
  {
    title: "Aetheria VR",
    description:
      "An immersive virtual reality experience that transports users to fantastical, procedurally generated worlds.",
    image: "/images/project-aetheria.png",
  },
  {
    title: "Synapse AI",
    description:
      "A personalized learning assistant powered by AI, adapting educational content to individual student needs and progress.",
    image: "/images/project-synapse.png",
  },
  {
    title: "TerraHarvest Robotics",
    description:
      "Automated farming robots designed to optimize crop yield and reduce resource consumption in modern agriculture.",
    image: "/images/project-terraharvest.png",
  },
];

const CARD_WIDTH = 320;
const GAP = 32; // gap-8 = 32px

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${isMobile ? "h-auto" : "h-[200vh]"} relative z-20`}
    >
      <div
        className={`project_bg ${
          isMobile
            ? "relative h-auto min-h-screen pb-20"
            : "sticky top-0 h-screen overflow-hidden"
        }`}
      >
        <div
          className={`${
            isMobile ? "relative pt-20 mb-10" : "absolute top-10 left-0"
          } w-full z-10`}
        >
          <Container className="px-6 md:px-10 lg:px-20">
            <SectionHeading
              title="Projects"
              subtitle="My Work"
              description="A collection of projects that showcase my skills and expertise in crafting meaningful and effective digital experiences."
            />
          </Container>
        </div>
        <div className="w-full flex items-center justify-center h-full">
          {isMobile ? (
            <div className="flex flex-col gap-6 px-4 w-full max-w-md mx-auto">
              {projects.map((project, index) => (
                <motion.div key={index} className="w-full h-[400px]">
                  <ProjectCard
                    {...project}
                    index={index}
                    activeIndex={activeIndex}
                    onClick={() =>
                      setActiveIndex(index === activeIndex ? null : index)
                    }
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <HorizontalCards
              scrollYProgress={scrollYProgress}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          )}
        </div>
      </div>
      <style>
        {`
          .project_bg {
            background-image: url('/images/project-bg.png');
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
    </section>
  );
}

function HorizontalCards({
  scrollYProgress,
  activeIndex,
  setActiveIndex,
}: {
  scrollYProgress: MotionValue<number>;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}) {
  const stride = CARD_WIDTH + GAP;
  const totalWidth = (projects.length - 1) * stride;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, totalWidth]);

  return (
    <motion.div
      style={{ x, marginRight: -CARD_WIDTH / 2 }}
      className="flex flex-row-reverse gap-8 absolute right-1/2 -rotate-10 top-1/2"
    >
      {projects.map((project, index) => (
        <CardWrapper
          key={index}
          index={index}
          x={x}
          project={project}
          isActive={activeIndex === index}
          onExpand={() => setActiveIndex(index === activeIndex ? null : index)}
          onClose={() => setActiveIndex(null)}
          activeIndex={activeIndex}
        />
      ))}
    </motion.div>
  );
}

function CardWrapper({
  index,
  x,
  project,
  isActive,
  onExpand,
  onClose,
  activeIndex,
}: {
  index: number;
  x: MotionValue<number>;
  project: (typeof projects)[0];
  isActive: boolean;
  onExpand: () => void;
  onClose: () => void;
  activeIndex: number | null;
}) {
  const stride = CARD_WIDTH + GAP;
  const position = index * stride;
  const center = position;

  const animatedScale = useTransform(
    x,
    [
      center - 2 * stride,
      center - stride,
      center,
      center + stride,
      center + 2 * stride,
    ],
    [1, 1.2, 1.4, 1.2, 1]
  );
  const scale = isActive ? 1 : animatedScale;

  const opacity = useTransform(
    x,
    [center - 2 * stride, center, center + 2 * stride],
    [1, 1, 1]
  );

  const animatedZIndex = useTransform(
    x,
    [center - 2 * stride, center, center + 2 * stride],
    [1, 5, 1]
  );
  const zIndex = isActive ? 100 : animatedZIndex;

  const animatedRotate = useTransform(
    x,
    [center - 2 * stride, center, center + 2 * stride],
    [5, 10, 5]
  );
  const rotate = isActive ? 0 : animatedRotate;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      style={{ scale, zIndex, opacity, rotate }}
      className={`relative shrink-0 w-[320px] h-[300px] ${
        isActive ? "z-50" : ""
      }`} // Explicit size to maintain flow
    >
      <ProjectCard
        {...project}
        layoutId={`project-${index}`}
        onClick={onExpand}
        index={index}
        activeIndex={activeIndex}
      />
    </motion.div>
  );
}
