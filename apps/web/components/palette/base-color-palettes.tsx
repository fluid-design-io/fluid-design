import { colorStepMap } from "@/lib/colorStepMap";
import { useColorStore } from "@/store/store";
import { BaseColorTypes } from "@/types/app";
import { cn } from "@ui/lib/utils";
import React from "react";

import PaletteButton from "./base-palette-button";
import { colorHelper } from "@/lib/colorHelper";

function BaseColorPalettes() {
  const { colorPalettes, colorMode } = useColorStore.getState();
  const animation = (i, type) => {
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
    let springDelay = Math.round((Math.pow(1.2, i) - 0.8) * 100) / 100;
    return baseDelay + springDelay * 0.06;
  };
  return (
    <div className="grid gap-4 @xs/section-secondary:grid-cols-2 @md/section-secondary:grid-cols-4 @2xl/section-secondary:grid-cols-1">
      {Object.keys(colorPalettes).map((type: BaseColorTypes) => {
        return (
          <div
            id={`${type}-color-palettes`}
            className={cn(
              "grid grid-flow-row grid-cols-1 gap-1.5",
              "@2xl/section-secondary:grid-cols-11",
            )}
            key={`base-color-palette-${type}`}
          >
            {colorPalettes[type].map((color, i) => {
              const step = i;
              return (
                <div
                  className="flex flex-col bg-background transition-colors"
                  key={`base-color-palette-${type}-${step}`}
                >
                  <PaletteButton
                    {...{
                      animation: animation(step, type),
                      type,
                      step: step,
                      color: color,
                      colorMode,
                    }}
                  />
                  <div
                    className={cn(
                      "mt-1.5 flex flex-col items-start justify-start text-xs tabular-nums",
                      "@xs/section-secondary:flex-row @xs/section-secondary:items-center @xs/section-secondary:justify-between",
                      "@md/section-secondary:flex-col @md/section-secondary:items-start @md/section-secondary:justify-start",
                      "@md/section-secondary:min-h-[2.0625rem]",
                    )}
                  >
                    <div className="font-comfortaa font-bold text-foreground/80">
                      {colorStepMap[i]}
                    </div>
                    <div className="relative">
                      <div
                        className={cn(
                          "line-clamp-1 text-muted-foreground/80 transition-colors duration-1000 @md/section-secondary:w-[-webkit-fill-available]",
                          "hover:w-max hover:overflow-visible hover:bg-background hover:transition-none",
                          "hover:-mx-1 hover:-my-0.5 hover:rounded hover:px-1 hover:py-0.5",
                          "hover:text-muted-foreground hover:ring-1 hover:ring-inset hover:ring-border",
                          "contrast-more:font-medium contrast-more:text-foreground/80 contrast-more:hover:text-foreground",
                          "@md/section-secondary:hover:absolute @md/section-secondary:hover:left-0 @md/section-secondary:hover:top-0 @md/section-secondary:hover:z-10 @md/section-secondary:hover:shadow-sm",
                        )}
                      >
                        {colorHelper.toColorMode(color.raw, colorMode)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default BaseColorPalettes;
