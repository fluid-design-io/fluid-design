"use client";

import {
  Performance,
  useColorStore,
  useSiteSettingsStore,
} from "@/store/store";
import { ColorMode, RawColor } from "@/types/app";
import { cn } from "@ui/lib/utils";
import tinycolor from "tinycolor2";
import { memo } from "react";
import { colorHelper } from "@/lib/colorHelper";
import { Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { textAnimation } from "@/lib/animation";
import useStore from "@/store/useStore";

function AnalogousMonochromaticPalettes({ className }: { className?: string }) {
  const { baseColors, colorMode } = useColorStore();
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <PillPalette color={baseColors.primary} type="mono" mode={colorMode} />
      <PillPalette color={baseColors.primary} type="analog" mode={colorMode} />
    </div>
  );
}

const PillPalette = memo(
  ({
    color,
    type,
    mode,
  }: {
    color: RawColor;
    type: "mono" | "analog";
    mode: ColorMode;
  }) => {
    const shouldReduceMotion = useReducedMotion();

    const { performance } = useSiteSettingsStore();
    const colors =
      type === "mono"
        ? tinycolor(color).monochromatic(6)
        : tinycolor(color).analogous(6);
    colors.sort((a, b) => {
      return tinycolor(b).getBrightness() - tinycolor(a).getBrightness();
    });
    const animationDelay = (i) => {
      let springDelay = 0;
      switch (performance) {
        case Performance.low:
          springDelay = i;
        default:
          springDelay = Math.pow(1.3, i) - 0.8;
      }
      switch (type) {
        case "mono":
          return 0.06 * 6 + springDelay * 0.06;
        case "analog":
          return 0.06 * 8 + springDelay * 0.06;
      }
    };
    return (
      <div
        className={cn(
          "col-span-2 flex flex-col gap-3 md:gap-4",
          "@md/section-primary:col-span-1",
          "@md/section-secondary:col-span-1",
        )}
      >
        <AnimatePresence
          mode={performance === "high" ? "popLayout" : "wait"}
          initial={false}
        >
          {colors.map((color, i) => {
            const c = color.toHexString();
            const isDark = tinycolor(color).isDark();
            const foregroundColor = isDark
              ? "text-white/30 hover:text-white/70 focus:text-white/70 contrast-more:text-white/80 contrast-more:hover:text-white contrast-more:font-medium"
              : "text-black/30 hover:text-black/70 focus:text-black/70 contrast-more:text-black/80 contrast-more:hover:text-black contrast-more:font-medium";
            return (
              <motion.button
                key={`${type}-${c}-${i}`}
                className={cn(
                  "group/pill-btn flex h-10 w-full items-center justify-between rounded-full border border-border px-2.5 text-xs transition-colors focus:outline-none focus:ring focus:ring-accent focus:ring-opacity-50",
                  foregroundColor,
                )}
                style={{ backgroundColor: c }}
                type="button"
                aria-label={`Copy ${c} to clipboard`}
                {...textAnimation(shouldReduceMotion, animationDelay(i), {
                  performance,
                })}
              >
                <motion.code key={`${type}-${c}-text-${i}`}>
                  {colorHelper.toColorMode(color, mode)}
                </motion.code>
                <Copy className="h-4 w-4 opacity-0 transition-opacity group-hover/pill-btn:opacity-100 group-focus/pill-btn:opacity-100" />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    );
  },
);

PillPalette.displayName = "AnalogousMonochromaticPalettes";

export default AnalogousMonochromaticPalettes;
