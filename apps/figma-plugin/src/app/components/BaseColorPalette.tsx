import { RawColor } from "@/src/typings/core";
import React from "react";
import { useAppStore } from "../store/store";

function BaseColorPalette() {
  const { baseColors } = useAppStore();
  if (!baseColors.primary || !baseColors.secondary || !baseColors.accent) {
    return (
      <p>
        Please select the primary, secondary and accent palettes in the plugin
        and click on "Create Palettes" to generate the color palettes.
      </p>
    );
  }
  return (
    <div className="flex flex-shrink-0 items-center justify-center space-x-6">
      {Object.entries(baseColors).map(([key, value], i) => {
        return (
          <div key={key}>
            <div className="flex space-x-2">
              <Palette color={value} i={i} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Palette = ({ color, i }: { color: RawColor; i: number }) => (
  <div
    style={{
      backgroundColor: `hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%)`,
      animationDuration: `${i * 0.5 + 0.5}s`,
    }}
    className="fade-in animate-in h-8 w-8 overflow-hidden rounded-full shadow-md ring-2 ring-white dark:ring-white/60"
  />
);

export default BaseColorPalette;
