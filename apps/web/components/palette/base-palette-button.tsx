"use client";

import { BaseColorTypes, RawColor } from "@/types/app";
import { cn } from "@ui/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Copy } from "lucide-react";
import { colorHelper } from "@/lib/colorHelper";
import { useColorStore } from "@/store/store";

const PaletteButton = ({
  type,
  step,
  animation = undefined,
}: {
  type: BaseColorTypes;
  step: number;
  animation: any;
}) => {
  const { theme } = useTheme();
  const [isHocus, setIsHocus] = useState(false);
  const { colorMode, colorPalettes } = useColorStore();
  const color = colorPalettes[type][step].raw;
  const { h, s } = color;
  const shadowSmall = `${h},${s * 100}%,${theme === "dark" ? 17 : 73}%, ${
    theme === "dark" ? 0.8 : 0.3
  }`;
  const shadowLarge = `${h},${s * 100}%,${theme === "dark" ? 10 : 80}%, ${
    theme === "dark" ? 0.8 : 0.3
  }`;
  const activeShaodw = `0 4px 14px -2px hsl(${shadowSmall}), 0 12px 24px -2px hsl(${shadowLarge})`;

  return (
    <motion.button
      onClick={() =>
        navigator.clipboard.writeText(colorHelper.toColorMode(color, colorMode))
      }
      className={cn(
        "overflow-hidden rounded-lg border border-border",
        "transition-shadow duration-300",
        "group",
      )}
      type="button"
      aria-label={`Click to copy ${color} to clipboard`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHocus(true)}
      onHoverEnd={() => setIsHocus(false)}
      onBlur={() => setIsHocus(false)}
      onFocus={() => setIsHocus(true)}
      transition={{
        type: "spring",
        mass: 0.2,
      }}
      style={{
        boxShadow: isHocus ? activeShaodw : "none",
      }}
      {...animation}
    >
      <div
        className="flex h-10 items-center justify-center transition-colors"
        style={{ backgroundColor: colorHelper.toHex(color) }}
      >
        <Copy
          color={colorHelper.toForeground(color)}
          className="h-4 w-4 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
        />
      </div>
    </motion.button>
  );
};

export default PaletteButton;
