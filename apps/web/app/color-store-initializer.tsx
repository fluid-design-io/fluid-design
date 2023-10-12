"use client";

import { updateCSSVariables } from "@/lib/updateCssVariables";
import { useColorStore } from "@/store/store";
import { useRef } from "react";

function ColorStoreInitializer({ ...props }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useColorStore.setState(props);
    updateCSSVariables({
      primary: props?.colorPalettes.primary,
      secondary: props?.colorPalettes.secondary,
      accent: props?.colorPalettes.accent,
      gray: props?.colorPalettes.gray,
    });
    initialized.current = true;
  }
  return null;
}

export default ColorStoreInitializer;
