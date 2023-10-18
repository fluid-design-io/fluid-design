"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

import DesktopPreviewToolbarIcon from "../ui/desktop-primary-toolbar-button";
import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import { useEffect, useState } from "react";
import { Input } from "ui/components/ui/input";
import { Button } from "ui/components/ui/button";
import { Copy } from "lucide-react";
import { useColorStore } from "@/store/store";
import { colorHelper } from "@/lib/colorHelper";

function ToolbarShareableLink() {
  const menuItem = primaryToolbarMenu.Share;
  const { baseColors } = useColorStore();
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");
  const handleCopy = () => {
    navigator.clipboard.writeText(src);
    setOpen(false);
  };
  useEffect(() => {
    if (!baseColors) return;
    let search = Object.values(baseColors)
      .map((color) => colorHelper.toHex(color))
      .join(",");
    search = encodeURIComponent(search);
    const url = `${process.env.NEXT_PUBLIC_URL}/?colors=${search}`;
    setSrc(url);
  }, [!!open]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <DesktopPreviewToolbarIcon {...menuItem} />
      </PopoverTrigger>
      <PopoverContent className="w-[max(24rem,80%)]" align="end">
        <div className="flex space-x-2">
          <Input className="h-8" value={src} readOnly />
          <Button className="h-8" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ToolbarShareableLink;

ToolbarShareableLink.displayName = "ToolbarShareableLink";
