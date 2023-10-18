import { cookies } from "next/headers";
import { generateBaseColors } from "./generateBaseColors";
import { generateColorPalette } from "./colorCalculator";
import { BaseColorTypes, ColorMode } from "@/types/app";
import { colorHelper } from "./colorHelper";

export const getServerColors = async () => {
  const newBaseColors = generateBaseColors();
  const cookieStore = cookies();
  const mode = cookieStore.get("colorMode");
  // short-hand
  const [primaryPalette, secondaryPalette, accentPalette, grayPalette] = [
    "primary",
    "secondary",
    "accent",
    "gray",
  ].map((color) =>
    generateColorPalette({
      color: color === "gray" ? newBaseColors.primary : newBaseColors[color],
      type: color as BaseColorTypes,
      colorMode: mode ? (mode.value as ColorMode) : ColorMode.HEX,
    }),
  );
  return {
    baseColors: newBaseColors,
    colorPalettes: {
      primary: primaryPalette,
      secondary: secondaryPalette,
      accent: accentPalette,
      gray: grayPalette,
    },
    colorMode: mode ? (mode.value as ColorMode) : ColorMode.HEX,
  };
};
