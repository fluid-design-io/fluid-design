import { cn } from "@ui/lib/utils";
import React from "react";

import ColorPicker from "./color-picker";

function BaseColorPickers() {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        "@md/section-primary:flex-row @md/section-primary:gap-5",
      )}
    >
      <ColorPicker className="[transition-delay:0s]" type="primary" />
      <ColorPicker className="[transition-delay:0.03s]" type="secondary" />
      <ColorPicker className="[transition-delay:0.10s]" type="accent" />
    </div>
  );
}

export default BaseColorPickers;
