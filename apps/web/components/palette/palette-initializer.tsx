"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import useStore from "@/store/useStore";
import { useColorStore } from "@/store/store";
import tinycolor from "tinycolor2";

function PaletteInitializer() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const storeColors = searchParams.get("colors");
  const store = useStore(useColorStore, (state) => state);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    if (storeColors) {
      const { generatePalette } = store;
      const parsedColors = JSON.parse(storeColors);
      const { primary, secondary, accent } = parsedColors.state.baseColors;
      if (primary && secondary && accent) {
        // if all colors are valid, generate palette
        if (
          tinycolor(primary).isValid() &&
          tinycolor(secondary).isValid() &&
          tinycolor(accent).isValid()
        ) {
          generatePalette(true);
        }
      }
    }
  }, [storeColors, mounted]);
  return null;
}

export default PaletteInitializer;
