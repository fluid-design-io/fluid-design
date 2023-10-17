import { cn } from "@ui/lib/utils";
import ColorModeDropdownMenu from "../ui/color-mode-dropdown-menu";
import { ModeToggle } from "../ui/dark-mode-toggle";
import { DiceButton } from "../ui/dice-button";
import DesktopPreviewToolbarButtons from "../ui/desktop-primary-toolbar-buttons";

function Toolbar() {
  return (
    <div
      className={cn(
        "relative z-40 flex select-none flex-row items-center justify-between bg-background-accent py-2 transition-colors",
        "fixed inset-x-0 bottom-0 w-full border-t border-t-border",
        "sm:border-t-none sm:sticky sm:inset-x-auto sm:bottom-auto sm:top-0 sm:border-none",
        "site-padding",
      )}
    >
      <div className="flex items-center justify-end gap-4">
        <ModeToggle />
        <ColorModeDropdownMenu />
      </div>
      <div className="flex items-center justify-end gap-4">
        <DesktopPreviewToolbarButtons />
        <DiceButton />
      </div>
    </div>
  );
}

export default Toolbar;
