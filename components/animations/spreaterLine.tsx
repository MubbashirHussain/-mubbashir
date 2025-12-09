import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

// Utility to wrap value within a range
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Tilt/Skew effect based on scroll velocity
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-15, 15]);

  // Seamless looping logic
  // We repeat the content N times.
  // The wrapping point should be -100% / N.
  // This ensures that when we shift by exactly one "chunk", we wrap back to the start.
  // We use 20 repetitions to ensure it covers even wide screens.
  const repetitions = 20;
  // We want to move Right (0 increasing).
  // So we wrap from a negative offset back to 0. Use range [-chunk, 0].
  // When value hits 0, it wraps to -chunk.
  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 flex flex-nowrap whitespace-nowrap">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap"
        style={{ x, skewX }}
      >
        {Array.from({ length: repetitions }).map((_, index) => (
          <div key={index} className="mr-4 inline-block">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SpreaterLine({ title , className }: { title: string , className?: string }) {
  return (
    <section className={`bg-secondary relative z-30 py-4 w-full overflow-hidden ${className}`}>
      <ParallaxText baseVelocity={2}>
        <div className="flex items-center gap-4">
          <h1 className="text-primary uppercase text-3xl font-space-grotesk font-bold">
            ✦
          </h1>
          <h1 className="text-primary uppercase text-3xl font-space-grotesk font-bold">
            {title}
          </h1>
        </div>
      </ParallaxText>
    </section>
  );
}
