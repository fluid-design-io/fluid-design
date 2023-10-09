"use client";

import { useColorStore } from "@/store/store";
import useStore from "@/store/useStore";
import { Button } from "@ui/components/ui/button";
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  LoaderIcon,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobilePrimaryMenu from "./mobile-primary-menu";
import { cn } from "@ui/lib/utils";

export const DiceButton = () => {
  const store = useStore(useColorStore, (state) => state);
  const [face, setFace] = useState(0);
  const [loading, setLoading] = useState(false);
  const faces = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const Face = faces[face];

  const roll = () => {
    let currentFace = face;
    const newFace = Math.floor(Math.random() * 6);
    if (currentFace === newFace) {
      roll();
      return;
    }
    setFace(newFace);
    store.generatePalette();
    // delay 1000ms
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="inline-flex">
      <Button
        variant="default"
        onClick={roll}
        title="Roll to generate a new random palette"
        disabled={loading}
        className={cn("rounded-e-none lg:rounded-e-md")}
        size="sm"
      >
        <div className="sr-only">Roll to generate a new random palette</div>
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="dice-button-loading"
              className="flex items-center justify-center gap-2"
            >
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  duration: 0.3,
                }}
              >
                <LoaderIcon className="h-5 w-5 animate-spin" />
              </motion.span>
              <span className="text-sm font-semibold">Generate</span>
            </motion.div>
          ) : (
            <motion.div
              key="dice-button"
              className="flex items-center justify-center gap-2"
            >
              <motion.span
                initial={{ rotate: -30, scale: 0.9, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 30, scale: 0.9, opacity: 0 }}
                transition={{
                  duration: 0.3,
                }}
              >
                <Face className="h-5 w-5" />
              </motion.span>
              <span className="text-sm font-semibold">Generate</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <MobilePrimaryMenu disabled={loading} />
    </div>
  );
};
