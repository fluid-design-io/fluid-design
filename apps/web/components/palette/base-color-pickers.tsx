import React from "react";
import ColorPicker from "./color-picker";
import { cn } from "@ui/lib/utils";

function BaseColorPickers() {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        "@md/section-primary:flex-row @md/section-primary:gap-5",
      )}
    >
      <ColorPicker type="primary" className="[transition-delay:0s]" />
      <ColorPicker type="secondary" className="[transition-delay:0.03s]" />
      <ColorPicker type="accent" className="[transition-delay:0.10s]" />
    </div>
  );
}

export default BaseColorPickers;
