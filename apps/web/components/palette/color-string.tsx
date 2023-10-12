"use client";

import { colorHelper } from "@/lib/colorHelper";
import { useColorStore } from "@/store/store";
import { RawColor } from "@/types/app";
import React from "react";

function ColorString({ color }: { color: RawColor }) {
  const { colorMode } = useColorStore();
  return <>{colorHelper.toColorMode(color, colorMode)}</>;
}

export default ColorString;
