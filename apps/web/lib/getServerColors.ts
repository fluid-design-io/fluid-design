import { cookies } from "next/headers";
import { generateBaseColors } from "./generateBaseColors";
import { generateColorPalette } from "./colorCalculator";
import { BaseColorTypes, ColorMode } from "@/types/app";
import { colorHelper } from "./colorHelper";
import { generateReadability } from "./generateReadability";

export const getServerColors = async () => {
  const newBaseColors = generateBaseColors();
  const cookieStore = cookies();
  const mode = cookieStore.get("colorMode");
  const showReadability = cookieStore.get("showReadability");
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
  /* Calculate WCAG 2.0 */
  const foreground = grayPalette[0];
  const background = grayPalette[10];
  const palettesWithReadability = generateReadability({
    foreground,
    background,
    primaryPalette,
    secondaryPalette,
    accentPalette,
    grayPalette,
  });
  return {
    baseColors: newBaseColors,
    colorPalettes: {
      primary: palettesWithReadability.primary,
      secondary: palettesWithReadability.secondary,
      accent: palettesWithReadability.accent,
      gray: palettesWithReadability.gray,
    },
    colorMode: mode ? (mode.value as ColorMode) : ColorMode.HEX,
    showReadability: showReadability?.value
      ? showReadability.value === "true"
        ? true
        : false
      : false,
  };
};
