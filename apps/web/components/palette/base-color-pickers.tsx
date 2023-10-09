"use client";

import { useColorStore } from "@/store/store";
import useStore from "@/store/useStore";
import React from "react";
import ColorPicker from "./color-picker";
import { cn } from "@ui/lib/utils";

function BaseColorPickers() {
  const store = useStore(useColorStore, (state) => state);
  if (!store) return <p>Loading...</p>;
  const { baseColors, updateBaseColor } = store;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        "@md/section-primary:flex-row @md/section-primary:gap-5",
      )}
    >
      <ColorPicker
        color={baseColors.primary}
        onChange={updateBaseColor}
        type="primary"
        className="[transition-delay:0s]"
      />
      <ColorPicker
        color={baseColors.secondary}
        onChange={updateBaseColor}
        type="secondary"
        className="[transition-delay:0.03s]"
      />
      <ColorPicker
        color={baseColors.accent}
        onChange={updateBaseColor}
        type="accent"
        className="[transition-delay:0.10s]"
      />
    </div>
  );
}

export default BaseColorPickers;
