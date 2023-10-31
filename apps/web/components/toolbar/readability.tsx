import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import { useColorStore } from "@/store/store";
import ToolbarMenuItem from "./toolbar-menu-item";
import { cn } from "@ui/lib/utils";
import { handleToggleReadability } from "@/app/actions";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

import dynamic from "next/dynamic";

const ReadabilityPlugin = dynamic(() => import("./plugin/readability.plugin"), {
  ssr: false,
});

function Readability() {
  const menuItem = primaryToolbarMenu.Readability;
  const [open, setOpen] = useState(false);
  const { showReadability } = useColorStore();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <button
          type="button"
          aria-label="Show Readability Plugin"
          className={cn(
            showReadability &&
              "-mx-1.5 rounded-sm bg-primary/20 px-1.5 lg:mx-0 lg:px-0",
          )}
        >
          <ToolbarMenuItem {...menuItem} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] sm:w-[24rem]" align="end">
        {open && <ReadabilityPlugin key={`shareable-${open}`} />}
      </PopoverContent>
    </Popover>
  );
}

export default Readability;

Readability.displayName = "Readability";
