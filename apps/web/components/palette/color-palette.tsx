import PaletteHeader from "@/components/palette/palette-header";

import dynamic from "next/dynamic";

const PaletteBody = dynamic(() => import("@/components/palette/palette-body"));

function ColorPalette() {
  return (
    <div
      className="mt-6 rounded-3xl border border-border bg-background p-4 transition-colors sm:p-6 md:mt-8 lg:mt-10 lg:p-8 xl:p-12"
      id="base-color-palette"
    >
      <PaletteHeader />
      <PaletteBody />
    </div>
  );
}

export default ColorPalette;
