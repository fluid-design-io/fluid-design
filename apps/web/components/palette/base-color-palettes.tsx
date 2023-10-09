"use client";

import { colorHelper } from "@/lib/colorHelper";
import { colorStepMap } from "@/lib/colorStepMap";
import {
  Performance,
  useColorStore,
  useSiteSettingsStore,
} from "@/store/store";
import useStore from "@/store/useStore";
import { BaseColorTypes, RawColor } from "@/types/app";
import { cn } from "@ui/lib/utils";
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { textAnimation } from "@/lib/animation";
import { Copy } from "lucide-react";
import { useToast } from "@ui/components/ui/use-toast";
import ToastCopied from "../toast-copied";

function BaseColorPalettes() {
  const store = useStore(useColorStore, (state) => state);
  const settings = useStore(useSiteSettingsStore, (state) => state);
  const { toast } = useToast();
  const shouldReduceMotion = useReducedMotion();
  if (!store || !settings) return <p>Loading...</p>;
  const { colorPalettes, colorMode } = store;
  const { performance } = settings;
  const animationDelay = (i, type) => {
    let baseDelay = 0.12;
    switch (type) {
      case "primary":
        baseDelay += 0;
        break;
      case "secondary":
        baseDelay += 0.06;
        break;
      case "accent":
        baseDelay += 0.12;
        break;
      case "gray":
        baseDelay += 0.18;
        break;
      default:
        baseDelay += 0;
        break;
    }
    // Apply spring-like effect using exponential function to high and medium performance devices
    let springDelay = 0;
    switch (performance) {
      case Performance.low:
        springDelay = i;
      default:
        springDelay = Math.pow(1.2, i) - 0.8;
    }
    return baseDelay + springDelay * 0.06;
  };
  return (
    <div className="grid gap-4 @xs/section-secondary:grid-cols-2 @md/section-secondary:grid-cols-4 @2xl/section-secondary:grid-cols-1">
      {Object.keys(colorPalettes).map((type: BaseColorTypes) => {
        // ! This is a hack to reverse the order of the color palettes then reverse again with the grid order
        // ! We do this because the <code> element needs to be on top when hovered
        // ! We can't use position due to framer-motion animation
        let reversed = colorPalettes[type].slice();
        reversed.reverse();
        return (
          <div
            className={cn(
              "grid grid-flow-row grid-cols-1 gap-1.5",
              "@2xl/section-secondary:grid-cols-11",
            )}
            key={`base-color-palette-${type}`}
          >
            <AnimatePresence
              mode={performance === "high" ? "popLayout" : "wait"}
            >
              {reversed.map((color, i) => {
                const colorString = colorHelper.toHex(color.color);
                const animation = textAnimation(
                  shouldReduceMotion,
                  // Here we reverse the order of the animation
                  animationDelay(reversed.length - i, type),
                  { performance },
                );
                return (
                  <div
                    className="flex flex-col bg-background transition-colors"
                    key={`base-color-palette-${type}-${colorString}`}
                    style={{
                      order: colorPalettes[type].length - i,
                    }}
                  >
                    <PaletteButton
                      {...{
                        color: color.raw,
                        animation,
                        onClick: () => {
                          navigator.clipboard.writeText(colorString);
                          toast({
                            //@ts-ignore
                            title: <ToastCopied color={colorString} />,
                          });
                        },
                      }}
                    />
                    <motion.div
                      className={cn(
                        "mt-1.5 flex flex-col items-start justify-start text-xs tabular-nums",
                        "@xs/section-secondary:flex-row @xs/section-secondary:items-center @xs/section-secondary:justify-between",
                        "@md/section-secondary:flex-col @md/section-secondary:items-start @md/section-secondary:justify-start",
                      )}
                      {...animation}
                    >
                      <div className="font-comfortaa font-bold text-foreground/80">
                        {colorStepMap[i]}
                      </div>
                      <code
                        className={cn(
                          "line-clamp-1 text-muted-foreground/80 transition-colors duration-1000 @md/section-secondary:w-[-webkit-fill-available]",
                          "hover:w-max hover:overflow-visible hover:bg-background hover:transition-none",
                          "hover:-mx-1 hover:-my-0.5 hover:rounded hover:px-1 hover:py-0.5",
                          "hover:text-muted-foreground hover:ring-1 hover:ring-inset hover:ring-border",
                          "contrast-more:font-medium contrast-more:text-foreground/80 contrast-more:hover:text-foreground",
                        )}
                      >
                        {colorHelper.toColorMode(color.color, colorMode)}
                      </code>
                    </motion.div>
                  </div>
                );
              })}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const PaletteButton = ({
  color,
  animation,
  onClick,
}: {
  color: RawColor;
  animation: any;
  onClick: () => void;
}) => {
  const { theme } = useTheme();
  const [isHocus, setIsHocus] = useState(false);
  const { h, s } = color;
  const shadowSmall = `${h},${s * 100}%,${theme === "dark" ? 17 : 73}%, ${
    theme === "dark" ? 0.8 : 0.3
  }`;
  const shadowLarge = `${h},${s * 100}%,${theme === "dark" ? 10 : 80}%, ${
    theme === "dark" ? 0.8 : 0.3
  }`;
  const activeShaodw = `0 4px 14px -2px hsl(${shadowSmall}), 0 12px 24px -2px hsl(${shadowLarge})`;

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "overflow-hidden rounded-lg border border-border",
        "transition-shadow duration-300",
        "group",
      )}
      type="button"
      aria-label={`Click to copy ${color} to clipboard`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHocus(true)}
      onHoverEnd={() => setIsHocus(false)}
      onBlur={() => setIsHocus(false)}
      onFocus={() => setIsHocus(true)}
      transition={{
        type: "spring",
        mass: 0.2,
      }}
      style={{
        boxShadow: isHocus ? activeShaodw : "none",
      }}
      {...animation}
    >
      <div
        className="flex h-10 items-center justify-center transition-colors"
        style={{ backgroundColor: colorHelper.toHex(color) }}
      >
        <Copy
          color={colorHelper.toForeground(color)}
          className="h-4 w-4 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
        />
      </div>
    </motion.button>
  );
};

export default BaseColorPalettes;
