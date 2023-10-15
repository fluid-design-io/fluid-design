"use client";

import { useColorStore } from "@/store/store";
import { BaseColorTypes, ColorMode } from "@/types/app";
import { cn } from "@ui/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ColorPickerModal from "../palette/color-picker-modal";
import { useState } from "react";
import { colorHelper } from "@/lib/colorHelper";

const ColorPickerFabButton = ({ type }: { type: BaseColorTypes }) => {
  const { baseColors, updateBaseColor } = useColorStore();
  const [isOpen, setIsOpen] = useState(false);
  const colorString = colorHelper.toColorMode(baseColors[type], ColorMode.HEX);
  const shadowColor = {
    primary: "hover:shadow-primary/30",
    secondary: "hover:shadow-secondary/30",
    accent: "hover:shadow-accent/30",
  };
  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.button
        className={cn(
          "relative h-12 w-12 shadow-lg transition-shadow hover:shadow-xl",
          shadowColor[type],
        )}
        onClick={() => setIsOpen(true)}
        key={`color-picker-${type}`}
        initial={{ scale: 0.88, borderRadius: 16 }}
        animate={{ scale: 1, borderRadius: 48 }}
        exit={{ scale: 0.88, borderRadius: 16 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          bounce: 0.2,
        }}
        layoutId={`color-picker-${type}-fab`}
      >
        <motion.span
          key={`color-picker-${type}-fill`}
          className={cn(
            "absolute inset-0 rounded-full transition-all",
            "ring-2 ring-inset",
            isOpen
              ? "ring-transparent"
              : "ring-white delay-500 duration-1000 dark:ring-white/40",
          )}
          style={{ backgroundColor: colorString }}
        />
        <span className="sr-only">Click to change {type} color</span>
        <motion.div layoutId={`color-picker-value-${type}-fab`} />
      </motion.button>
      {isOpen && (
        <ColorPickerModal
          onClose={() => setIsOpen(false)}
          colorString={colorString}
          onChange={updateBaseColor}
          type={type}
          prefix="fab"
        />
      )}
    </AnimatePresence>
  );
};

export default ColorPickerFabButton;
