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
import { Skeleton } from "@ui/components/ui/skeleton";
import { cn } from "ui/lib/utils";
import Image from "next/image";
import { useToast } from "ui/components/ui/use-toast";

function ToolbarShareableLink() {
  const menuItem = primaryToolbarMenu.Share;
  const { baseColors } = useColorStore();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState("");
  const { toast } = useToast();
  const [loadingSocialPreview, setLoadingSocialPreview] = useState(true);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/?colors=${colors}`,
    );
    setOpen(false);
    toast({
      title: "Copied to clipboard!",
    });
  };
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
        <DesktopPreviewToolbarIcon {...menuItem} />
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] sm:w-[24rem]" align="end">
        <div className="relative">
          <div
            className={cn(
              "mb-4 overflow-hidden rounded-md",
              "aspect-[120/63] w-[16rem] rounded-md sm:w-[22rem]",
            )}
          >
            <Skeleton className="h-full w-full" />

            <Image
              src={`${process.env.NEXT_PUBLIC_URL}/api/og?colors=${colors}`}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity",
                loadingSocialPreview ? "opacity-0" : "opacity-100",
              )}
              alt="Social preview"
              onLoad={() => setLoadingSocialPreview(false)}
              width={288}
              height={151}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Input
            className="h-8"
            value={`${process.env.NEXT_PUBLIC_URL}/?colors=${colors}`}
            readOnly
          />
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
