"use client";

import html2canvas from "html2canvas";
import { DownloadIcon } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "ui/components/ui/button";
import { Switch } from "ui/components/ui/switch";
import { Skeleton } from "ui/components/ui/skeleton";
import { useToast } from "ui/components/ui/use-toast";
import { cn } from "ui/lib/utils";
import { Label } from "ui/components/ui/label";
import { motion } from "framer-motion";

type GenerateImageOptions = {
  desktopSize?: boolean;
};

function DownloadBasePalettePlugin({ setOpen }) {
  const [isLoaded, setisLoaded] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [desktopSize, setDesktopSize] = useState(undefined);
  const [isDesktopSize, setIsDesktopSize] = useState(false);
  const { toast } = useToast();
  const handleGenerateImage = (options: GenerateImageOptions) => {
    if (typeof desktopSize === "undefined") return;
    setisLoaded(false);
    // find #base-color-palette and capture it as an image (we'll show the preview)
    const paletteWrap = document?.getElementById("base-color-palette");
    if (paletteWrap) {
      // !FIX LINE HEIGHT
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule(
        "body > div:last-child img { display: inline-block; }",
      );
      options.desktopSize &&
        style.sheet?.insertRule("body { min-width: 1920px }");
      html2canvas(paletteWrap, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 1,
      }).then((canvas) => {
        const data = canvas.toDataURL("image/png");
        setImageData(data);
        setisLoaded(true);
        // remove the style
        style.remove();
      });
    }
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "palette.png";
    link.href = imageData;
    link.click();
    toast({
      title: "Downloaded!",
    });
    setOpen(false);
  };

  useEffect(() => {
    if (typeof desktopSize === "undefined") return;
    handleGenerateImage({ desktopSize });
  }, [desktopSize]);
  useEffect(() => {
    const calculateSize = () => {
      if (window.innerWidth < 1920) {
        setDesktopSize(false);
        setIsDesktopSize(false);
      } else {
        setDesktopSize(true);
        setIsDesktopSize(true);
      }
    };
    calculateSize();
    window.addEventListener("resize", calculateSize);
    return () => {
      window.removeEventListener("resize", calculateSize);
    };
  }, []);

  return (
    <Fragment>
      <div className="relative">
        <div
          className={cn(
            "mb-4 overflow-hidden rounded-md",
            "w-[16rem] rounded-md sm:w-[22rem]",
            !isDesktopSize &&
              "aspect-[0.121/1] sm:aspect-[0.339/1] md:aspect-[0.653/1] lg:aspect-[1.82/1]",
            isDesktopSize && "aspect-[1.82/1]",
          )}
          // style={{
          //   aspectRatio: paletteAspectRatio.current,
          // }}
        >
          {isLoaded ? (
            <motion.img
              initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              src={imageData}
              className={cn(
                "absolute inset-0 h-full w-full rounded border object-cover",
              )}
              alt="Palette preview"
              width={288}
              height={151}
            />
          ) : (
            <Skeleton className={cn("h-full w-full")} />
          )}
        </div>
      </div>
      <div className="flex justify-between">
        {isDesktopSize !== true ? (
          <div className="flex items-center justify-center space-x-1.5">
            <Switch
              id="preserve-size"
              onCheckedChange={setDesktopSize}
              checked={desktopSize}
              aria-label="Desktop Size"
            />
            <Label htmlFor="preserve-size" className="text-foreground/80">
              Desktop Size
            </Label>
          </div>
        ) : (
          <div />
        )}
        <Button className="h-8" size="sm" onClick={handleDownload}>
          <DownloadIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ms-2">Download image</span>
        </Button>
      </div>
    </Fragment>
  );
}

export default DownloadBasePalettePlugin;
