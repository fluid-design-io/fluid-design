"use client";

import {
  Performance,
  useColorStore,
  useSiteSettingsStore,
} from "@/store/store";
import useStore from "@/store/useStore";
import { ColorValue } from "@/types/app";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import React, { memo, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@ui/lib/utils";
import { motion } from "framer-motion";
import { textAnimation } from "@/lib/animation";

const getColorNames = async (colors: string[]) => {
  const data = await fetch("/api/color-names", {
    method: "POST",
    body: JSON.stringify({ colors }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });
  return data.names;
};
function SixtyThirtyTenPalettes({ className }: { className?: string }) {
  const [colorNames, setColorNames] = useState(["", "", ""]);
  const [mounted, setMounted] = useState(false);
  const store = useStore(useColorStore, (state) => state);
  const settings = useStore(useSiteSettingsStore, (state) => state);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!mounted) return;
    const { colorPalettes } = store;
    if (Object.values(colorPalettes).every((palette) => palette.length === 0)) {
      console.log(`colorPalettes`, colorPalettes);
      return;
    }
    getColorNames([
      colorPalettes.primary[5].color,
      colorPalettes.secondary[5].color,
      colorPalettes.accent[5].color,
      colorPalettes.gray[5].color,
    ]).then((names) => {
      setColorNames(names);
    });
  }, [mounted, store]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!store || !settings) return <p>Loading...</p>;
  const { colorPalettes, colorMode } = store;
  const { performance } = settings;
  const mainPalettes = Object.values(colorPalettes);
  const boxStyle = [
    "border-primary/10 text-primary/30 selection:bg-foreground/10 selection:text-primary contrast-more:text-foreground",
    "border-secondary/10 text-secondary-foreground/30 selection:bg-foreground/10 selection:text-secondary-foreground contrast-more:text-secondary-foreground",
    "border-accent/10 text-accent-foreground/30 selection:bg-foreground/10 selection:text-accent-foreground contrast-more:text-accent-foreground",
    "border-border/10 text-foreground/30 selection:bg-foreground/10 selection:text-foreground contrast-more:text-foreground",
  ];
  const animationDelay = (i: number) => {
    let springDelay = 0;
    switch (performance) {
      case Performance.low:
        springDelay = i;
      default:
        springDelay = Math.pow(1.8, i) - 0.6;
    }
    return 0.06 * 6 + springDelay * 0.06;
  };
  return (
    <div
      className={cn(
        "grid grid-cols-1 content-stretch gap-4 md:gap-5",
        "@md/section-secondary:grid-cols-4",
        "flex-1",
        className,
      )}
    >
      <AnimatePresence
        mode={performance === "high" ? "popLayout" : "wait"}
        initial={false}
      >
        {mainPalettes.map((palettes, i) => (
          <motion.div
            key={`sixty-thirty-ten-palette-${i}-${palettes[0]?.color}`}
            {...textAnimation(shouldReduceMotion, animationDelay(i), {
              performance,
            })}
          >
            <SixtyThirtyTenPalette
              palettes={palettes}
              className={boxStyle[i]}
              colorName={colorNames[i]}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * A square aspected palette where:
 * - 60% is the palette color step at 0, positioned at the top
 * - 30% is the palette color step at 2, positioned at the left bottom
 * - 10% is the palette color step at 5, positioned at the right bottom
 * @param palette
 */
const SixtyThirtyTenPalette = memo(
  ({
    palettes,
    className,
    colorName,
  }: {
    palettes: ColorValue[];
    className?: string;
    colorName: string;
  }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const colorSixty = isDark ? palettes[9]?.color : palettes[1]?.color;
    const colorThirty = isDark ? palettes[8]?.color : palettes[2]?.color;
    const colorTen = isDark ? palettes[5]?.color : palettes[5]?.color;
    return (
      <div
        className={cn(
          "relative flex aspect-[28/9] h-full min-h-[4rem] w-full overflow-hidden rounded-lg border",
          "@md/section-secondary:aspect-[9/21]",
          "@md/section-secondary:flex-col @xl/section-secondary:aspect-[9/16]",
          "@2xl/section-secondary:aspect-auto @2xl/section-secondary:rounded-2xl",
          className,
        )}
      >
        <div
          className={cn(
            "absolute start-0 top-0 p-4 font-sans text-lg font-extralight transition-colors delay-300 duration-700",
            "contrast-more:font-medium contrast-more:text-foreground/80 contrast-more:hover:text-foreground",
          )}
        >
          {colorName}
        </div>
        <div
          className="flex-[0.6] transition-colors"
          style={{
            backgroundColor: colorSixty,
          }}
        ></div>
        <div className="flex flex-[0.4] @md/section-secondary:flex-col">
          <div
            className="flex-[0.75] transition-colors"
            style={{
              backgroundColor: colorThirty,
            }}
          ></div>
          <div
            className="flex-[0.25] transition-colors"
            style={{
              backgroundColor: colorTen,
            }}
          ></div>
        </div>
      </div>
    );
  },
);

SixtyThirtyTenPalette.displayName = "SixtyThirtyTenPalette";

export default SixtyThirtyTenPalettes;
