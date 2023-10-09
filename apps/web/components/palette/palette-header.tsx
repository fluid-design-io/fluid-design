import { Palette } from "lucide-react";

function PaletteHeader() {
  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end sm:gap-8">
      <div
        className="-mx-2 -my-1.5 min-w-[6rem] flex-1 rounded-2xl px-2 py-1.5 text-[min(6.25rem,4.4vw)] font-semibold text-foreground/75 caret-accent-foreground outline-none transition-colors selection:bg-accent-foreground selection:text-accent hover:bg-accent/30 focus:bg-accent/70 focus:text-foreground/90 focus:ring focus:ring-accent focus:ring-opacity-50"
        contentEditable
        suppressContentEditableWarning
      >
        Awesome Colors
      </div>

      <div className="flex items-center justify-start gap-1.5 text-xs text-muted-foreground sm:ms-4">
        <Palette className="h-2.5 w-2.5" />
        <p>fluid-design-io/fluid-colors</p>
      </div>
    </div>
  );
}

export default PaletteHeader;
