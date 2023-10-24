"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import { useEffect, useState } from "react";
import { useColorStore } from "@/store/store";
import { colorHelper } from "@/lib/colorHelper";
import dynamic from "next/dynamic";
import { Skeleton } from "ui/components/ui/skeleton";
import ToolbarMenuItem from "./toolbar-menu-item";
import { AnimatePresence } from "framer-motion";

const ShareableLinkPlugin = dynamic(
  () => import("@/components/toolbar/plugin/shareable-link.plugin"),
  {
    loading: () => <Skeleton className="h-52 w-full" />,
    ssr: false,
  },
);

function ToolbarShareableLink() {
  const menuItem = primaryToolbarMenu.Share;
  const { baseColors } = useColorStore();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState("");
  useEffect(() => {
    if (!baseColors) return;
    let search = Object.values(baseColors)
      .map((color) => colorHelper.toHex(color))
      .join(",");
    search = encodeURIComponent(search);
    setColors(search);
  }, [!!open]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <ToolbarMenuItem {...menuItem} />
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] sm:w-[24rem]" align="end">
        <AnimatePresence mode="wait">
          {open && (
            <ShareableLinkPlugin
              key={`shareable-${open}`}
              colors={colors}
              setOpen={setOpen}
            />
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}

export default ToolbarShareableLink;

ToolbarShareableLink.displayName = "ToolbarShareableLink";
