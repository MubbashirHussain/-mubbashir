"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { DraggableNode } from "./DraggableNode";
import { Connection } from "./Connection";
import { cn } from "@/lib/utils";
import DotGridBackground from "../layout/dotGridBackround";
import { TypewriterEffectSmooth } from "../animations/typeWritterText";
import {
  Component,
  GitPullRequestCreate,
  LucideClockFading,
  PlayIcon,
  Plus,
  SquareIcon,
  StickyNote,
} from "lucide-react";
import { TextShimmerWave } from "../animations/waveText";
import gsap from "gsap";

export const NodeFlowApp = () => {
  // Refs for connection ports and the main canvas
  const containerRef = useRef<HTMLDivElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);

  // Node Port Refs
  const node1OutRef = useRef<HTMLDivElement>(null);
  const node2InRef = useRef<HTMLDivElement>(null);
  const node2OutRef = useRef<HTMLDivElement>(null);
  const node3InRef = useRef<HTMLDivElement>(null);

  // Node Refs for animation
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);

  // Connection Refs
  const connection1Ref = useRef<SVGSVGElement>(null);
  const connection2Ref = useRef<SVGSVGElement>(null);

  // List item refs
  const node1ListRef = useRef<HTMLUListElement>(null);
  const node2ListRef = useRef<HTMLUListElement>(null);
  const node3ListRef = useRef<HTMLUListElement>(null);

  const [NodesPosition, setNodesPosition] = useState<
    {
      node: number;
      positions: { top: number; left: number };
    }[]
  >([
    {
      node: 1,
      positions: {
        top: -990,
        left: -990,
      },
    },
    {
      node: 3,
      positions: {
        top: -990,
        left: -990,
      },
    },
    {
      node: 3,
      positions: {
        top: -990,
        left: -990,
      },
    },
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use a small timeout to ensure the container has fully rendered
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      console.log("container dimensions", width, height, containerRef);

      setNodesPosition([
        {
          node: 1,
          positions: {
            top: (height / 100) * 12,
            left: (width / 100) * 12,
          },
        },
        {
          node: 2,
          positions: {
            top: (height / 100) * 40,
            left: (width / 100) * 35,
          },
        },
        {
          node: 3,
          positions: {
            top: (height / 100) * 20,
            left: (width / 100) * 60,
          },
        },
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dotGridRef.current]); // Empty dependency array - run only once on mount

  // Dragging Logic State
  const [isPlaying, setIsPlaying] = useState(false);

  // GSAP Animation Effect
  useEffect(() => {
    if (!isPlaying) return;

    // Set initial states - hide everything with scale and opacity only
    gsap.set([node1Ref.current, node2Ref.current, node3Ref.current], {
      opacity: 0,
    });

    // Create timeline
    const tl = gsap.timeline();

    // Step 1: Animate Node 1 in
    tl.to(node1Ref.current, {
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    // Step 2: Animate Node 1 list items one by one
    if (node1ListRef.current) {
      tl.to(
        node1ListRef.current.children,
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.15,
          ease: "power2.out",
        },
        "+=0.2"
      );
    }

    // Step 3: Animate first connection
    tl.to(
      {},
      {
        duration: 0.5,
        onStart: () => {
          if (connection1Ref.current) {
            gsap.fromTo(
              connection1Ref.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 }
            );
          }
        },
      },
      "+=0.3"
    );

    // Step 4: Animate Node 2 in
    tl.to(
      node2Ref.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "+=0.2"
    );

    // Step 5: Animate Node 2 list items one by one
    if (node2ListRef.current) {
      tl.to(
        node2ListRef.current.children,
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.15,
          ease: "power2.out",
        },
        "+=0.2"
      );
    }

    // Step 6: Animate second connection
    tl.to(
      {},
      {
        duration: 0.5,
        onStart: () => {
          if (connection2Ref.current) {
            gsap.fromTo(
              connection2Ref.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 }
            );
          }
        },
      },
      "+=0.3"
    );

    // Step 7: Animate Node 3 in
    tl.to(
      node3Ref.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "+=0.2"
    );

    // Step 8: Animate Node 3 list items one by one
    if (node3ListRef.current) {
      tl.to(
        node3ListRef.current.children,
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.15,
          ease: "power2.out",
        },
        "+=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isPlaying]);

  // --- Drag Handlers ---

  const styles = {
    canvasBg: "h-full w-full",
    nodePort: "absolute w-3 h-3 rounded-full border-2 bg-white z-10",
    startingNode: "border-2 border-[#D8B4FE] cursor-move",
    startingPort: "right-[-6px] top-1/2 -translate-y-1/2 border-[#7C3AED]",
    aiNode: "border-2 border-[#7C3AED] bg-white",
    aiInputPort:
      "left-[-6px] top-[30px] -translate-y-1/2 border-[#7C3AED] bg-[#7C3AED]",
  };

  return (
    <DotGridBackground
      isMoveable={true}
      ref={dotGridRef}
      className="h-full w-full"
      moveingChildren={
        <>
          <div className="flex flex-col items-center justify-center h-full w-full relative">
            {/* Control Panel */}
            <div className="prompt-input flex absolute bottom-30 rounded-xl items-center justify-between p-2 border border-gray-300 min-w-md bg-background shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full border border-gray-200 cursor-pointer">
                  <Plus className="text-text" />
                </div>
                <div className="w-[2px] bg-gray-200 h-8 rounded-full" />
                {isPlaying ? (
                  <TextShimmerWave
                    className="[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF] text-[16px]"
                    duration={1}
                    spread={1}
                    zDistance={1}
                    scaleDistance={1.1}
                    rotateYDistance={20}
                  >
                    Creating the perfect dish...
                  </TextShimmerWave>
                ) : (
                  <TypewriterEffectSmooth
                    fontSize={16}
                    fontWeight={400}
                    className="m-0 text-text"
                    words={[
                      { text: "Create my" },
                      {
                        text: "Portfolio website",
                        className: "text-primary-700",
                      },
                    ]}
                    speed={1}
                    cursorClassName="hidden w-[2px] rounded-full bg-gray-200"
                    onAnimationComplete={() =>
                      setTimeout(() => setIsPlaying(true), 1000)
                    }
                  />
                )}
              </div>
              <div className="bg-gray-100 p-2 rounded-full border border-gray-200 cursor-pointer">
                {isPlaying ? (
                  <SquareIcon size={20} className="text-text" />
                ) : (
                  <PlayIcon size={20} className="text-text" />
                )}
              </div>
            </div>

            {/* Canvas Container */}
            <div
              ref={containerRef}
              className={styles.canvasBg + " w-full h-full"}
            >
              {/* Connection Layer */}
              <Connection
                className="opacity-0"
                ref={connection1Ref}
                startRef={node1OutRef}
                endRef={node2InRef}
                containerRef={containerRef}
                controlOffset1={150}
                controlOffset2={150}
                trigger={NodesPosition}
              />
              <Connection
                className="opacity-0"
                ref={connection2Ref}
                startRef={node2OutRef}
                endRef={node3InRef}
                containerRef={containerRef}
                controlOffset1={100}
                controlOffset2={150}
                trigger={NodesPosition}
              />

              {/* 2. AI Node */}
              <DraggableNode
                ref={node1Ref}
                id="ai-node-1"
                position={NodesPosition[0]?.positions}
                className={
                  "bg-background shadow-none border rounded-2xl border-gray-300 w-fit opacity-0"
                }
                // onMouseDown={handleMouseDown}
              >
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <GitPullRequestCreate className="text-violet-800" />
                  <span className="font-semibold text-violet-800">
                    Generate Site
                  </span>
                </div>
                <div className="mt-3">
                  <ul ref={node1ListRef} className="flex flex-col gap-3">
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Analyzing...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Start Working...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Create Pages...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Create Components...</span>
                    </li>
                  </ul>
                </div>
                {/* Output Port */}
                <div
                  ref={node1OutRef}
                  className={cn(styles.nodePort, styles.startingPort)}
                ></div>
              </DraggableNode>
              <DraggableNode
                ref={node2Ref}
                id="ai-node-2"
                position={NodesPosition[1]?.positions}
                className={
                  "bg-background shadow-none border rounded-2xl border-gray-300 w-fit  opacity-0"
                }
              >
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <StickyNote className="text-violet-800" />
                  <span className="font-semibold text-violet-800">
                    Generate Pages...
                  </span>
                </div>
                <div className="mt-3">
                  <ul ref={node2ListRef} className="flex flex-col gap-3">
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Analyzing...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Generating Home...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Generating About...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Generating Contact...</span>
                    </li>
                  </ul>
                </div>
                {/* Input Port Ref */}
                <div
                  ref={node2InRef}
                  className={cn(styles.nodePort, styles.aiInputPort)}
                />
                <div
                  ref={node2OutRef}
                  className={cn(styles.nodePort, styles.startingPort)}
                />
              </DraggableNode>
              <DraggableNode
                ref={node3Ref}
                id="ai-node-3"
                position={NodesPosition[2].positions}
                className={
                  "bg-background shadow-none border rounded-2xl border-gray-300 w-fit  opacity-0"
                }
              >
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <Component className="text-violet-800" />
                  <span className="font-semibold text-violet-800">
                    Generate Components...
                  </span>
                </div>
                <div className="mt-3">
                  <ul ref={node3ListRef} className="flex flex-col gap-3">
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Analyzing...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Generating Home...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Generating About...</span>
                    </li>
                    <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
                      <LucideClockFading size={16} className="text-text" />
                      <span className="text-text">Generating Contact...</span>
                    </li>
                  </ul>
                </div>
                {/* Input Port Ref */}
                <div
                  ref={node3InRef}
                  className={cn(styles.nodePort, styles.aiInputPort)}
                ></div>
              </DraggableNode>
            </div>
          </div>
        </>
      }
      children={<div className="h-screen w-screen" />}
    />
  );
};
