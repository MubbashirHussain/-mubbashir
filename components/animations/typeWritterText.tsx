import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
// Component 2: Smooth/Container-based Typewriter Effect
export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  speed = 2,
  delay = 0.5,
  textColor,
  fontSize,
  fontWeight,
  cursorColor,
  onAnimationComplete,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
  speed?: number;
  delay?: number;
  textColor?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  cursorColor?: string;
  onAnimationComplete?: () => void;
}) => {
  // Split text inside of words into array of characters (used for rendering, not animation)
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div className="flex">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block whitespace-nowrap">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  // FIX: Removed conflicting default color classes (dark:text-white text-gray-800)
                  // The color will now be inherited from the parent unless word.className overrides it.
                  className={cn(word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content", // The animation effect happens here by expanding the container width
        }}
        transition={{
          duration: speed,
          ease: "linear",
          delay: delay,
        }}
        onAnimationComplete={onAnimationComplete}
      >
        <div
          className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-extrabold text-center"
          style={{
            whiteSpace: "nowrap",
            color: textColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      {/* Blinking Cursor */}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          // FIX: Removed mb-2 and relies on items-center for vertical alignment
          "block rounded-sm w-[4px] h-2 sm:h-2 xl:h-2 bg-blue-500",
          cursorClassName
        )}
        style={{
          backgroundColor: cursorColor,
        }}
      ></motion.span>
    </div>
  );
};
