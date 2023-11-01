"use client";

import { colorHelper } from "@/lib/colorHelper";
import { useColorStore } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function ExistingColorsOverwritter({ searchParams }) {
  const { updateBaseColor, generatePalette } = useColorStore();
  const colors = searchParams.colors;
  const [loading, setLoading] = useState(colors ? true : false);
  useEffect(() => {
    if (!colors) return;
    if (colors.split(",").length !== 3) return;
    const colorArray = colors.split(",");
    const baseColors = {
      primary: colorHelper.toRaw(colorArray[0]),
      secondary: colorHelper.toRaw(colorArray[1]),
      accent: colorHelper.toRaw(colorArray[2]),
    };
    setTimeout(() => {
      console.log(`Overwriting colors with ${colors}`);
      updateBaseColor("primary", baseColors.primary);
      updateBaseColor("secondary", baseColors.secondary);
      updateBaseColor("accent", baseColors.accent);
      setTimeout(() => {
        generatePalette(true);
      }, 200);
      setLoading(false);
    }, 150);
  }, []);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3 } }}
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="text-primary">Loading</div>
            <div className="flex space-x-2">
              <div className="h-4 w-4 animate-bounce rounded-full bg-primary transition-colors"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-secondary transition-colors"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-accent transition-colors"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ExistingColorsOverwritter;
