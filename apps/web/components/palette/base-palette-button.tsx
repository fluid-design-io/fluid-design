"use client";

import { BaseColorTypes, RawColor } from "@/types/app";
import { cn } from "@ui/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { colorHelper } from "@/lib/colorHelper";
import {
  Performance,
  useColorStore,
  useSiteSettingsStore,
} from "@/store/store";
import { useToast } from "ui/components/ui/use-toast";
import ToastCopied from "../ui/toast-copied";

const PaletteButton = ({
  type,
  step,
  animation,
}: {
  type: BaseColorTypes;
  step: number;
  animation: number;
}) => {
  const { theme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { colorMode, colorPalettes } = useColorStore();
  const { toast } = useToast();
  const { performance } = useSiteSettingsStore();
  const color = colorPalettes[type][step].raw;
  const { h, s } = color;
  const shadowSmall = `${h} ${s * 100}% ${theme === "dark" ? 17 : 73}% `;
  const shadowLarge = `${h} ${s * 100}% ${theme === "dark" ? 10 : 80}% `;
  const activeShaodw = `0 4px 14px -2px hsl(${shadowSmall}/var(--shadow-opacity)), 0 12px 24px -2px hsl(${shadowLarge}/var(--shadow-opacity))`;
  const colorString = colorHelper.toColorMode(color, colorMode);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    setTimeout(
      () => {
        setIsChanging(true);
        setTimeout(
          () => {
            setIsChanging(false);
          },
          100 + animation * 800,
        );
      },
      100 + animation * 800,
    );
  }, [color]);
  return (
    <motion.button
      onClick={() => {
        navigator.clipboard.writeText(colorString);
        toast({
          //@ts-ignore
          title: <ToastCopied color={colorString} />,
        });
      }}
      className={cn(
        "rounded-lg border border-border",
        "group",
        "transition-shadow duration-300 [--shadow-opacity:0] hover:[--shadow-opacity:0.8] dark:hover:[--shadow-opacity:0.3]",
      )}
      type="button"
      aria-label={`Click to copy ${colorString} to clipboard`}
      title={colorString}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: isChanging ? animation * 1.2 : 0.3,
      }}
      animate={
        performance === Performance.high
          ? {
              filter: isChanging ? "blur(2.5px)" : "blur(0px)",
            }
          : {}
      }
      style={{
        boxShadow: activeShaodw,
      }}
    >
      <motion.div
        className={cn(
          "flex h-10 items-center justify-center rounded-[calc(var(--radius)_-_1px)]",
        )}
        style={{
          backgroundColor: colorHelper.toHex(color),
          transitionDelay: `${animation}s`,
          transitionDuration: `${animation * 1.2}s`,
        }}
        initial={{
          opacity: 1,
        }}
        animate={
          performance === Performance.high
            ? {
                opacity: isChanging ? 0.8 : 1,
              }
            : {}
        }
      >
        <Copy
          color={colorHelper.toForeground(color)}
          className="h-4 w-4 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
        />
      </motion.div>
    </motion.button>
  );
};

export default PaletteButton;
