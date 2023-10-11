import PaletteHeader from "@/components/palette/palette-header";

import dynamic from "next/dynamic";
// import PaletteBody from "./palette-body";

const PaletteBody = dynamic(() => import("./palette-body"), { ssr: false });

function ColorPalette() {
  return (
    <div className="mt-6 rounded-3xl border border-border bg-background p-4 transition-colors sm:p-6 md:mt-8 lg:mt-10 lg:p-8 xl:p-12">
      <PaletteHeader />
      <PaletteBody />
    </div>
  );
}

export default ColorPalette;
