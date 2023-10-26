"use client";

import { colorHelper } from "@/lib/colorHelper";
import { useColorStore } from "@/store/store";
import { BaseColorTypes } from "@/types/app";

function ColorString({ type, step }: { type: BaseColorTypes; step: number }) {
  const { colorMode, colorPalettes } = useColorStore();
  const color = colorPalettes[type][step].raw;
  const colorString = colorHelper.toColorMode(color, colorMode);
  return (
    <code className="animate-text" title={colorString}>
      {colorString}
    </code>
  );
}

export default ColorString;
