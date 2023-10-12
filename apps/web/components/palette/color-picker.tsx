"use client";

import { colorHelper } from "@/lib/colorHelper";
import { useColorStore, useSiteSettingsStore } from "@/store/store";
import { BaseColorTypes, BaseColors, RawColor } from "@/types/app";
import { cn } from "@ui/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import ColorPickerModal from "./color-picker-modal";
import { CopyIcon, Palette } from "lucide-react";
import { useToast } from "@ui/components/ui/use-toast";
import { textAnimation } from "@/lib/animation";
import ToastCopied from "../toast-copied";

function ColorPicker({
  type,
  className,
}: {
  type: BaseColorTypes;
  className?: string;
}) {
  const { baseColors, colorMode, updateBaseColor } = useColorStore();
  const { performance } = useSiteSettingsStore();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const colorString = colorHelper.toColorMode(baseColors[type], colorMode);
  const foregroundColor = colorHelper.toForeground(colorString);
  const shouldReduceMotion = useReducedMotion();
  const animationDelay = () => {
    switch (type) {
      case "primary":
        return 0;
      case "secondary":
        return 0.06;
      case "accent":
        return 0.18;
    }
  };
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={`color-picker-${type}`}
        layoutId={`color-picker-${type}`}
        className={cn(
          // general
          "overflow-hidden",
          // min width - horizontal
          "flex aspect-[3/1] max-h-40 w-full items-end justify-stretch rounded-2xl border border-border",
          // small - vertical
          "@md/section-primary:aspect-[1/1.618] @md/section-primary:max-h-none @md/section-primary:flex-col-reverse @md/section-primary:items-stretch @md/section-primary:justify-start @md/section-primary:gap-6",
        )}
      >
        <div
          className={cn(
            "p-2",
            // min width
            "min-w-[max(9rem,40%)]",
            // small
            "@md/section-primary:min-w-none @md/section-primary:w-full",
          )}
        >
          <motion.h2
            layoutId={`color-picker-title-${type}`}
            className="text-start text-sm font-semibold capitalize text-foreground/75 delay-0 @md/section-primary:leading-3 md:text-base"
          >
            {type}
          </motion.h2>
          <motion.button
            layoutId={`color-picker-value-${type}`}
            className={cn(
              "group/color-button relative w-full text-start font-comfortaa text-xs tabular-nums text-muted-foreground delay-0",
              "flex items-center justify-between focus:outline-none",
            )}
            aria-label={`Click to copy ${type} color`}
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(colorString);
              toast({
                //@ts-ignore
                title: <ToastCopied color={colorString} />,
              });
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`color-picker-value-${colorString}`}
                className={cn(
                  "pointer-events-none relative z-10 w-full bg-background transition-colors",
                  "group-hover/color-button:text-foreground group-focus/color-button:text-foreground",
                  "contrast-more:font-medium contrast-more:text-foreground/80 contrast-more:group-hover:text-foreground contrast-more:group-focus:text-foreground",
                )}
                {...textAnimation(shouldReduceMotion, animationDelay(), {
                  performance,
                })}
              >
                {colorString}
              </motion.span>
            </AnimatePresence>
            <CopyIcon className="z-10 h-3.5 w-3.5 text-foreground opacity-0 transition-opacity group-hover/color-button:opacity-100 group-focus/color-button:opacity-100" />
            <span
              className={cn(
                "absolute inset-0 z-[9]",
                "group-hover/color-button:bg-muted group-focus/color-button:bg-muted",
                "-mx-2 -my-2 rounded-[0.9rem] px-2 py-2 transition",
                "ring-inset group-hover/color-button:ring-1 group-hover/color-button:ring-primary group-focus/color-button:ring-1 group-focus/color-button:ring-primary",
              )}
            />
          </motion.button>
        </div>
        <motion.button
          className={cn(
            "group/picker-button flex flex-col items-center justify-center transition-colors duration-1000",
            // mobile
            "h-full flex-grow",
            className,
          )}
          type="button"
          aria-label={`Click to change ${type} color`}
          style={{
            backgroundColor: colorString,
          }}
          onClick={() => setIsOpen(true)}
        >
          <span>
            <Palette
              className={cn(
                "mt-4 h-8 w-8 opacity-0 transition-opacity group-hover/picker-button:opacity-100",
              )}
              style={{
                color: foregroundColor,
              }}
            />
          </span>
          <span
            className={cn(
              "mt-1 touch-none select-none text-center text-xs opacity-0 transition-opacity delay-0 group-hover/picker-button:opacity-100 group-hover/picker-button:delay-1000",
            )}
            style={{
              color: foregroundColor,
            }}
          >
            Change {type} color
          </span>
        </motion.button>
      </motion.div>
      {isOpen && (
        <ColorPickerModal
          onClose={() => setIsOpen(false)}
          colorString={colorString}
          onChange={updateBaseColor}
          type={type}
        />
      )}
    </AnimatePresence>
  );
}

export default ColorPicker;
