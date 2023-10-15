"use client";

import { useColorStore } from "@/store/store";
import { useRef } from "react";

function ColorStoreInitializer({ ...props }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useColorStore.setState(props);
    initialized.current = true;
  }
  return null;
}

export default ColorStoreInitializer;
