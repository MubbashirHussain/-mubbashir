"use client";

import { motion, useSpring, AnimatePresence } from "framer-motion";
import { FC, JSX, useEffect, useRef, useState } from "react";
import { ArrowUpRight, GripHorizontal } from "lucide-react";
import { useCursor } from "@/components/providers/cursor-provider";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const ButtonCursorSVG: FC = () => {
  return (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2953 16.2959C17.0471 15.5455 18.1115 15.5399 19.3724 15.8359C20.6474 16.1352 22.3273 16.7938 24.4984 17.6426C24.5108 17.6474 24.5227 17.6534 24.5345 17.6592L31.7377 20.4775C33.8108 21.288 35.4156 21.9137 36.4867 22.5039C37.0231 22.7995 37.4666 23.1072 37.7738 23.4551C38.0926 23.8161 38.2745 24.2345 38.2484 24.7158C38.2228 25.1979 37.995 25.5942 37.6381 25.9189C37.2935 26.2323 36.8162 26.4918 36.2474 26.7295C35.1117 27.2041 33.4381 27.6583 31.2748 28.248C30.6169 28.4278 30.1576 28.555 29.8051 28.6895C29.4624 28.8201 29.2584 28.9455 29.1019 29.1025H29.101C28.9432 29.2603 28.8182 29.4655 28.6879 29.8076C28.5538 30.1595 28.4281 30.6179 28.2494 31.2744C27.6596 33.4388 27.2045 35.1131 26.7299 36.249C26.4921 36.8179 26.2326 37.2951 25.9193 37.6396C25.5944 37.9969 25.1977 38.2236 24.7152 38.249L24.7162 38.25C24.235 38.2761 23.8166 38.0941 23.4554 37.7754C23.1074 37.4682 22.7991 37.0248 22.5033 36.4883C21.9126 35.4171 21.2865 33.8125 20.476 31.7393L17.641 24.498C16.7923 22.328 16.1337 20.6487 15.8344 19.374C15.5384 18.1133 15.5439 17.0487 16.2943 16.2969L16.2953 16.2959Z"
        fill="#020202"
        stroke="white"
        stroke-linejoin="round"
      />
      <path
        d="M12.2344 30.0964C12.3632 29.4183 13.0181 28.9726 13.6963 29.1013C14.2316 29.2029 14.7803 29.2722 15.3428 29.3074C16.0316 29.3506 16.5547 29.9437 16.5117 30.6326C16.4686 31.3215 15.8755 31.8456 15.1865 31.8025C14.5227 31.7609 13.87 31.6789 13.2295 31.5574C12.5514 31.4285 12.1056 30.7746 12.2344 30.0964ZM3.53904 23.2351C4.11012 22.8472 4.88748 22.9961 5.27537 23.5671C6.20792 24.9401 7.3926 26.1239 8.7656 27.0564C9.33655 27.4443 9.48448 28.2217 9.09666 28.7927C8.70878 29.3638 7.93142 29.5126 7.36033 29.1248C5.72637 28.0149 4.31779 26.6054 3.20799 24.9714C2.82012 24.4004 2.96802 23.623 3.53904 23.2351ZM0.7783 13.2312C0.907958 12.5532 1.56314 12.1084 2.24119 12.238C2.91904 12.3678 3.36297 13.023 3.23338 13.7009C2.92165 15.332 2.92161 17.0074 3.23338 18.6384C3.36296 19.3163 2.91897 19.9705 2.24119 20.1003C1.56325 20.2299 0.908096 19.786 0.7783 19.1082C0.407233 17.1669 0.407233 15.1724 0.7783 13.2312ZM30.0937 12.238C30.7719 12.1094 31.426 12.555 31.5547 13.2332C31.6762 13.8735 31.7572 14.5256 31.7988 15.1892C31.842 15.8782 31.3188 16.4722 30.6299 16.5154C29.9409 16.5585 29.3468 16.0345 29.3037 15.3455C29.2685 14.7831 29.2002 14.2343 29.0986 13.699C28.9699 13.0208 29.4155 12.3668 30.0937 12.238ZM23.2344 3.54273C23.6222 2.97168 24.3996 2.82282 24.9707 3.21069C26.6046 4.32051 28.0132 5.73007 29.123 7.36402C29.5108 7.93503 29.3629 8.71242 28.792 9.10034C28.2209 9.4882 27.4436 9.3393 27.0556 8.76831C26.1231 7.39531 24.9384 6.2116 23.5654 5.27905C22.9944 4.89116 22.8465 4.1138 23.2344 3.54273ZM7.36033 3.20874C7.93139 2.82088 8.70876 2.96975 9.09666 3.54077C9.48449 4.11178 9.3365 4.88917 8.7656 5.2771C7.39263 6.20963 6.20791 7.39338 5.27537 8.76636C4.88749 9.33744 4.11013 9.48627 3.53904 9.09839C2.96808 8.71047 2.82014 7.9331 3.20799 7.36206C4.3178 5.72812 5.72638 4.31854 7.36033 3.20874ZM13.2285 0.778077C15.169 0.407319 17.162 0.407297 19.1025 0.778077C19.7805 0.907634 20.2251 1.56199 20.0957 2.23999C19.9661 2.91799 19.3118 3.36256 18.6338 3.23316C17.0032 2.92158 15.3278 2.92158 13.6972 3.23316C13.0192 3.36267 12.3649 2.91805 12.2353 2.23999C12.1059 1.56198 12.5505 0.907636 13.2285 0.778077Z"
        fill="black"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const NavigationCursor: FC = () => {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
      <ArrowUpRight className="h-8 w-8 text-black" />
    </div>
  );
};

const ButtonCursor: FC = () => {
  return <ButtonCursorSVG />;
};

const GrabCursor: FC = () => {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
      <GripHorizontal className="h-6 w-6 text-black" />
    </div>
  );
};

export function ArrowCursor({
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const { cursorType, setCursorType } = useCursor();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMoving, setIsMoving] = useState(false);
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".cursor-navigation")) {
        setCursorType("navigation");
      } else if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-button")
      ) {
        setCursorType("button");
      } else if (target.closest(".cursor-grab")) {
        setCursorType("grab");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [setCursorType]);

  useEffect(() => {
    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      // Only rotate the default cursor (arrow)
      if (cursorType === "default" && speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90;

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95);
        setIsMoving(true);

        const timeout = setTimeout(() => {
          scale.set(1);
          setIsMoving(false);
        }, 150);

        return () => clearTimeout(timeout);
      } else if (cursorType !== "default") {
        // Reset rotation for other cursors
        rotation.set(0);
        scale.set(1);
      }
    };

    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e);
        rafId = 0;
      });
    };

    // Hide system cursor globally
    const styleId = "cursor-style";
    let style = document.getElementById(styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        * {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        styleEl.remove();
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, rotation, scale, cursorType]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: cursorType === "default" ? rotation : 0, // Only rotate default
        scale: scale,
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      <AnimatePresence mode="wait">
        {cursorType === "default" && (
          <motion.div
            key="default"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DefaultCursorSVG />
          </motion.div>
        )}
        {cursorType === "navigation" && (
          <motion.div
            key="navigation"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <NavigationCursor />
          </motion.div>
        )}
        {cursorType === "button" && (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ButtonCursor />
          </motion.div>
        )}
        {cursorType === "grab" && (
          <motion.div
            key="grab"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GrabCursor />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
