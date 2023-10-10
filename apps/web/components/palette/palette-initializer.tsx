"use client";

import { useEffect } from "react";

import { useColorStore } from "@/store/store";
import tinycolor from "tinycolor2";
import useStore from "@/store/useStore";
import { useSearchParams } from "next/navigation";

function PaletteInitializer() {
  const { generatePalette } = useColorStore();
  useEffect(() => {
    console.log("hi");
    // if (
    //   tinycolor(primary).isValid() &&
    //   tinycolor(secondary).isValid() &&
    //   tinycolor(accent).isValid()
    // ) {
    //   console.log("generating existing palette");
    //   generatePalette(true);
    // } else {
    //   console.log("generating new palette");
    //   generatePalette(false);
    // }
  }, []);
  return null;
}

export default PaletteInitializer;
