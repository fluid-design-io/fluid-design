"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const RootSkipNavContent = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(
    <div className="skip-main-wrap">
      <div className="skip-main flex flex-col gap-1">
        <h2 className="px-2 text-lg font-semibold">Skip to</h2>
        <a className="skip-btn" href="#palette-body">
          Color Generator
        </a>
        <a className="skip-btn" href="#analogous-mono-palette">
          Analogous and Monochromatic Palettes
        </a>
        <div className="flex flex-col gap-1">
          <p className="px-2 font-medium">Color Palettes</p>
          <a className="skip-btn" href="#primary-color-palettes">
            Primary
          </a>
          <a className="skip-btn" href="#secondary-color-palettes">
            Secondary
          </a>
          <a className="skip-btn" href="#accent-color-palettes">
            Accent
          </a>
          <a className="skip-btn" href="#gray-color-palettes">
            Gray
          </a>
        </div>
      </div>
    </div>,
    // #skip-nav
    document.getElementById("skip-nav")!,
  );
};

export default RootSkipNavContent;
