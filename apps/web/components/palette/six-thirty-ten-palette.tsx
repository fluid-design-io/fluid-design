"use client";

import {
  Performance,
  useColorStore,
  useSiteSettingsStore,
} from "@/store/store";
import { BaseColorTypes } from "@/types/app";
import React, { memo, useEffect, useState } from "react";
import { cn } from "@ui/lib/utils";

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
  const { colorPalettes } = useColorStore();

  useEffect(() => {
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
  }, [colorPalettes]);

  const boxStyle = ["box-primary", "box-secondary", "box-accent", "box-border"];
  return (
    <div
      className={cn(
        "grid grid-cols-1 content-stretch gap-4 md:gap-5",
        "@md/section-secondary:grid-cols-4",
        "flex-1",
        className,
      )}
    >
      {
        // map over base colors
        ["primary", "secondary", "accent", "gray"].map((key, i) => (
          <div key={`sixty-thirty-ten-palette-${i}-${key}`}>
            <SixtyThirtyTenPalette
              type={key as BaseColorTypes}
              className={boxStyle[i]}
              colorName={colorNames[i]}
            />
          </div>
        ))
      }
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
    type,
    className,
    colorName,
  }: {
    type: BaseColorTypes;
    className?: string;
    colorName: string;
  }) => {
    const colorSixty = {
      primary: "bg-[hsl(var(--primary-900))] dark:bg-[hsl(var(--primary-100))]",
      secondary:
        "bg-[hsl(var(--secondary-900))] dark:bg-[hsl(var(--secondary-100))]",
      accent: "bg-[hsl(var(--accent-900))] dark:bg-[hsl(var(--accent-100))]",
      gray: "bg-[hsl(var(--gray-900))] dark:bg-[hsl(var(--gray-100))]",
    };
    const colorThirty = {
      primary: "bg-[hsl(var(--primary-800))] dark:bg-[hsl(var(--primary-200))]",
      secondary:
        "bg-[hsl(var(--secondary-800))] dark:bg-[hsl(var(--secondary-200))]",
      accent: "bg-[hsl(var(--accent-800))] dark:bg-[hsl(var(--accent-200))]",
      gray: "bg-[hsl(var(--gray-800))] dark:bg-[hsl(var(--gray-200))]",
    };
    const colorTen = {
      primary: "bg-[hsl(var(--primary-500))] dark:bg-[hsl(var(--primary-500))]",
      secondary:
        "bg-[hsl(var(--secondary-500))] dark:bg-[hsl(var(--secondary-500))]",
      accent: "bg-[hsl(var(--accent-500))] dark:bg-[hsl(var(--accent-500))]",
      gray: "bg-[hsl(var(--gray-500))] dark:bg-[hsl(var(--gray-500))]",
    };
    return (
      <div
        className={cn(
          "relative flex aspect-[28/9] h-full min-h-[4rem] w-full overflow-hidden rounded-lg border",
          "@md/section-secondary:aspect-[9/21]",
          "@md/section-secondary:flex-col @xl/section-secondary:aspect-[9/14]",
          "@2xl/section-secondary:aspect-auto @2xl/section-secondary:rounded-2xl",
          className,
        )}
      >
        <div
          className={cn(
            "absolute start-0 top-0 p-4 font-sans text-lg font-extralight text-background/70 delay-300 duration-700",
            "contrast-more:font-medium contrast-more:text-foreground/80 contrast-more:hover:text-foreground",
            "animate-text !transition-all",
          )}
        >
          {colorName}
        </div>
        <div
          className={cn(
            "flex-[0.6] transition-colors delay-300 duration-1000",
            colorSixty[type],
          )}
        ></div>
        <div className="flex flex-[0.4] @md/section-secondary:flex-col">
          <div
            className={cn(
              "flex-[0.75] transition-colors delay-500 duration-1000",
              colorThirty[type],
            )}
          ></div>
          <div
            className={cn(
              "flex-[0.25] transition-colors delay-700 duration-1000",
              colorTen[type],
            )}
          ></div>
        </div>
      </div>
    );
  },
);

SixtyThirtyTenPalette.displayName = "SixtyThirtyTenPalette";

export default SixtyThirtyTenPalettes;
