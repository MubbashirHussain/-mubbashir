import { useElementUnits } from "@/hooks/use-element-units";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Charge from "./svg/charge";
import gsap from "gsap";
import { scale } from "framer-motion";
import { SlidingNumber } from "./sliding-number";

interface BatteryIconProps {
  batteryPercentage: number;
  className?: string;
  strokeColor?: string;
  bgColor?: string;
  fillColor?: string;
  textColor?: string;
  tipColor?: string;
  showInSide?: boolean;
  showCharging?: boolean;
}

function AnimatedCharge() {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.from(divRef, {
      scale: 0,
      duration: 1,
    });
  }, []);
  return (
    <div
      ref={divRef}
      className="absolute h-[calc(100%+2)] w-full top-[45%] left-[60%] -translate-x-1/2 -translate-y-1/2"
    >
      <Charge
        filled={true}
        className="z-10 fill-black stroke-white"
        size={15}
      />
    </div>
  );
}

export default function BatteryIcon({
  batteryPercentage,
  className,
  strokeColor = "border-secondary",
  bgColor = "bg-transparent",
  fillColor = "bg-primary-600",
  textColor,
  tipColor = "bg-secondary",
  showInSide = false,
  showCharging = false,
}: BatteryIconProps) {
  const batteryRef = useRef<HTMLDivElement>(null);
  const toPxBattery = useElementUnits(batteryRef);
  const batteryWidth = toPxBattery(`${batteryPercentage}%`);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {!showInSide && (
        <span className={cn("flex items-center", textColor)}>
          <SlidingNumber value={batteryPercentage} />%
        </span>
      )}
      <div className="flex items-center">
        <div
          className={cn(
            "h-4 border w-7 rounded relative",
            strokeColor,
            bgColor
          )}
          ref={batteryRef}
          style={{
            padding: "1px",
            borderRadius: "4px",
          }}
        >
          <div
            className={cn("h-[calc(100%-2px)] rounded absolute", fillColor)}
            style={{
              borderRadius: "2px",
              width: `calc(${batteryWidth}px - 5px)`,
            }}
          ></div>
          {showCharging && <AnimatedCharge />}
          {showInSide && (
            <div
              className={cn(
                "h-[calc(100%-2px)] w-full rounded absolute text-xs flex justify-center items-center",
                textColor
              )}
            >
              <SlidingNumber value={batteryPercentage} />%
            </div>
          )}
        </div>
        <span
          className={cn("rounded-full", tipColor)}
          style={{ margin: "0 2px", width: "2px", height: "5px" }}
        ></span>
      </div>
    </div>
  );
}
