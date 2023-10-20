"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "ui/components/ui/skeleton";
import { usePathname } from "next/navigation";
import ToolbarMenuItem from "./toolbar-menu-item";

const DownloadBasePalettePlugin = dynamic(
  () => import("@/components/toolbar/plugin/download-base-palette.plugin"),
  {
    loading: () => <Skeleton className="h-52 w-full" />,
    ssr: false,
  },
);

function ToolbarDownloadBasePalette() {
  const menuItem = primaryToolbarMenu.Download;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname !== "/") return null;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <ToolbarMenuItem {...menuItem} />
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] sm:w-[24rem]" align="end">
        {open && <DownloadBasePalettePlugin setOpen={setOpen} />}
      </PopoverContent>
    </Popover>
  );
}

export default ToolbarDownloadBasePalette;

ToolbarDownloadBasePalette.displayName = "ToolbarDownloadBasePalette";
