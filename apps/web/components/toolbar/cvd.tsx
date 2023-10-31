import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import { useColorStore } from "@/store/store";
import ToolbarMenuItem from "./toolbar-menu-item";
import { cn } from "@ui/lib/utils";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

import dynamic from "next/dynamic";
import { usePluginCvdStore } from "./plugin/cvd.plugin";

const CVDPlugin = dynamic(() => import("./plugin/cvd.plugin"), {
  ssr: false,
});
function CVD() {
  const menuItem = primaryToolbarMenu["Color Vision Deficiency"];
  const maybePluginStore = usePluginCvdStore();
  const [open, setOpen] = useState(false);
  // const { showReadability } = useColorStore();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Show cvd Plugin"
          className={cn(
            maybePluginStore?.isOn() &&
              "-mx-1.5 rounded-sm bg-primary/20 px-1.5 lg:mx-0 lg:px-0",
          )}
        >
          <ToolbarMenuItem {...menuItem} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] sm:w-[24rem]" align="end">
        {open && <CVDPlugin key={`shareable-${open}`} />}
      </PopoverContent>
    </Popover>
  );
}

export default CVD;

CVD.displayName = "CVD";
