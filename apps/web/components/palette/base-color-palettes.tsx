import { colorHelper } from "@/lib/colorHelper";
import { colorStepMap } from "@/lib/colorStepMap";
import { useColorStore } from "@/store/store";
import { BaseColorTypes } from "@/types/app";
import { cn } from "@ui/lib/utils";
import React from "react";
import PaletteButton from "./base-palette-button";
import ColorString from "./color-string";

function BaseColorPalettes() {
  const { colorPalettes, colorMode } = useColorStore.getState();
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
            {reversed.map((color, i) => {
              const colorString = colorHelper.toHex(color.color);
              const step = colorPalettes[type].length - i - 1;
              return (
                <div
                  className="flex flex-col bg-background transition-colors"
                  key={`base-color-palette-${type}-${colorString}`}
                  style={{
                    order: step,
                  }}
                >
                  <PaletteButton
                    {...{
                      animation: undefined,
                      type,
                      step: step,
                    }}
                  />
                  <div
                    className={cn(
                      "mt-1.5 flex flex-col items-start justify-start text-xs tabular-nums",
                      "@xs/section-secondary:flex-row @xs/section-secondary:items-center @xs/section-secondary:justify-between",
                      "@md/section-secondary:flex-col @md/section-secondary:items-start @md/section-secondary:justify-start",
                    )}
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
                      <ColorString color={color.raw} />
                    </code>
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
