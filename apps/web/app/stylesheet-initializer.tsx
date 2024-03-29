"use client";

import { updateCSSVariables } from "@/lib/updateCssVariables";
import { useColorStore } from "@/store/store";
import { useLayoutEffect } from "react";

function StyleSheetInitializer() {
  const { colorPalettes, baseColors, colorMode } = useColorStore();
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    updateCSSVariables(
      {
        primary: colorPalettes.primary,
        secondary: colorPalettes.secondary,
        accent: colorPalettes.accent,
        gray: colorPalettes.gray,
      },
      baseColors,
      colorMode,
    );
  }, []);
  return null;
}

export default StyleSheetInitializer;
