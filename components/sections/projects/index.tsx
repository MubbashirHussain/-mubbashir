"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  MotionValue,
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="h-[200vh] relative z-20">
      {/* <Image
        src="/images/sec2-bg.png"
        alt="projects-bg"
        fill
        className="object-cover"
      /> */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-10 left-0 w-full z-10">
          <Container className="px-6 md:px-10 lg:px-20">
            <SectionHeading
              title="Projects"
              subtitle="My Work"
              description="A collection of projects that showcase my skills and expertise in crafting meaningful and effective digital experiences."
            />
          </Container>
        </div>
        <div className="w-full flex items-center justify-center h-full">
          <HorizontalCards scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function HorizontalCards({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Calculate total travel distance
  // We want the last card to end up in the center.
  // Total width of all intervals = (N-1) * Stride
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
        <CardWrapper key={index} index={index} x={x} project={project} />
      ))}
    </motion.div>
  );
}

function CardWrapper({
  index,
  x,
  project,
}: {
  index: number;
  x: MotionValue<number>;
  project: (typeof projects)[0];
}) {
  const stride = CARD_WIDTH + GAP;
  const position = index * stride;
  // When x = position, this card is at the center
  const center = position;

  const scale = useTransform(
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

  // Optional: Add opacity fade for distant cards
  const opacity = useTransform(
    x,
    [center - 2 * stride, center, center + 2 * stride],
    [0.6, 1, 0.6]
  );

  const zIndex = useTransform(
    x,
    [center - 2 * stride, center, center + 2 * stride],
    [1, 5, 1]
  );

  return (
    <motion.div
      style={{ scale, zIndex, opacity }}
      className="relative shrink-0"
    >
      <ProjectCard {...project} />
    </motion.div>
  );
}
