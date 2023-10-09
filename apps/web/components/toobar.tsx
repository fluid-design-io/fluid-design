import { cn } from "@ui/lib/utils";
import ColorModeDropdownMenu from "./color-mode-dropdown-menu";
import { ModeToggle } from "./dark-mode-toggle";
import { DiceButton } from "./dice-button";

function Toolbar() {
  return (
    <div
      className={cn(
        "bg-background-accent z-10 flex select-none flex-row items-center justify-between py-2 transition-colors",
        "fixed inset-x-0 bottom-0 w-full border-t border-t-border",
        "sm:border-t-none sm:sticky sm:inset-x-auto sm:bottom-auto sm:top-0 sm:border-none",
        "site-padding sm:px-0 md:px-0 lg:px-0",
      )}
    >
      <div className="flex items-center justify-end gap-4">
        <ColorModeDropdownMenu />
        <ModeToggle />
      </div>
      <DiceButton />
    </div>
  );
}

export default Toolbar;
