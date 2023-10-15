"use client";

import { colorHelper } from "@/lib/colorHelper";
import { useColorStore } from "@/store/store";
import { BaseColorTypes, RawColor } from "@/types/app";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@ui/lib/utils";

function ColorString({
  type,
  step,
  animation,
}: {
  type: BaseColorTypes;
  step: number;
  animation: number;
}) {
  const { colorMode, colorPalettes } = useColorStore();
  const color = colorPalettes[type][step].raw;
  const colorString = colorHelper.toColorMode(color, colorMode);
  return (
    <motion.code
      className={cn(
        "transition-opacity duration-500 [.coloring_&]:opacity-0 [.coloring_&]:duration-200",
      )}
      title={colorString}
    >
      {colorString}
    </motion.code>
  );
}

export default ColorString;
