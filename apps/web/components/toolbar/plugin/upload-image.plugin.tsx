"use client";

import { Button } from "ui/components/ui/button";
import React, { Fragment, useState } from "react";
import { cn } from "ui/lib/utils";
import { useToast } from "ui/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { extractColors } from "extract-colors";
import ImageDragAndDrop from "@/components/core/image-drag-and-drop";
import { useColorStore } from "@/store/store";
import { colorHelper } from "@/lib/colorHelper";
import { BaseColorTypes } from "@/types/app";
import { FinalColor } from "extract-colors/lib/types/Color";

function UploadImaagePlugin({ setOpen }) {
  const { updateBaseColor, generatePalette } = useColorStore();
  const [colors, setColors] = useState([]);
  const [imageBaseColors, setImageBaseColors] = useState([]); // [primary, secondary, accent]
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [imgPreview, setImgPreview] = useState(null);
  const { toast } = useToast();

  const handleDropImage = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    // add file preview

    setImgPreview(URL.createObjectURL(file));

    if (file.size > 10000000) {
      toast({
        title: "File too large",
        description: "Please upload a file less than 10MB",
        variant: "destructive",
      });
      return;
    }

    let colors = [];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result as string;
      img.onload = async () => {
        // <-- This function is already async
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const extractedColors = await extractColors(data); // <-- Await the Promise
        extractedColors.forEach((color) => {
          // filter out colors that are too
          // muted (< 0.02 saturation), too dark (<0.03 lightness), or too light (>0.97 lightness)
          if (
            color.saturation < 0.02 ||
            color.lightness < 0.03 ||
            color.lightness > 0.97
          )
            return;
          colors.push(color);
        });
        // if there are less than 3 colors, add white to the array
        if (colors.length < 3) {
          colors = [...colors, ...Array(3 - colors.length).fill("#fff")];
        }
        updateBaseColor("primary", colorHelper.toRaw(colors[0].hex));
        updateBaseColor("secondary", colorHelper.toRaw(colors[1].hex));
        updateBaseColor("accent", colorHelper.toRaw(colors[2].hex));
        generatePalette(true);
        setImageBaseColors(colors.slice(0, 3));
        setColors(colors.slice(3));
      };
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateNewBaseColor = (c: FinalColor, i) => {
    updateBaseColor(
      ["primary", "secondary", "accent"][activeColorIndex] as BaseColorTypes,
      colorHelper.toRaw(c.hex),
    );
    generatePalette(true);
    // remove the selected color from the colors array and add the previous base color to the colors array
    const prevColors = [...colors];
    prevColors.splice(i, 1);
    prevColors.push(imageBaseColors[activeColorIndex]);
    setColors(prevColors);

    // replace the color with the new one at the same index
    const prevBaseColors = [...imageBaseColors];
    prevBaseColors[activeColorIndex] = c;
    setImageBaseColors(prevBaseColors);
    // set the next color as active
    activeColorIndex === 2
      ? setActiveColorIndex(0)
      : setActiveColorIndex(activeColorIndex + 1);
  };
  console.log(colors.length);
  return (
    <div
      className={cn(
        "mt-4 grid gap-4 sm:gap-6 lg:gap-8",
        "max-h-[calc(100dvh-5.5rem)] overflow-y-auto overflow-x-visible px-4 pb-6 sm:px-6 lg:px-8",
        !!imgPreview
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1",
      )}
    >
      <div
        className={cn(
          "min-h-64 relative isolate h-[min(35vh,32rem)] w-full sm:col-span-2 lg:col-span-1",
        )}
      >
        <AnimatePresence mode="popLayout">
          {imgPreview && (
            <motion.img
              key={imgPreview}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              src={imgPreview}
              className="pointer-events-none absolute inset-0 z-[-2] h-full w-full rounded-md object-cover"
            />
          )}
        </AnimatePresence>
        <ImageDragAndDrop
          onDrop={handleDropImage}
          className="h-full min-h-[16rem] w-full"
          dropAreaStyles={cn(
            "space-y-4",
            imgPreview && [
              "bg-background/70 backdrop-blur-md backdrop-brightness-110 backdrop-saturate-150",
              "absolute bottom-0 inset-x-0 flex justify-center items-center flex flex-row",
              "[&_.drop-icon]:w-6 [&_.drop-icon]:h-6 [&_.drop-icon]:m-0",
              "space-y-0 space-x-2",
            ],
          )}
        />
      </div>
      {!!imgPreview && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-lg font-semibold">Base Colors</h3>
            <div className="mt-2 flex flex-wrap">
              {imageBaseColors.map((color, index) => (
                <motion.button
                  layoutId={`color-${color.hex}`}
                  key={`${color.hex}-${index}`}
                  className={cn(
                    "mb-2 flex h-12 w-full items-center justify-center",
                    activeColorIndex === index
                      ? "ring-2 ring-primary ring-offset-2"
                      : "ring-0",
                  )}
                  style={{ backgroundColor: color.hex, borderRadius: 24 }}
                  onClick={() => setActiveColorIndex(index)}
                >
                  <motion.span
                    layoutId={`color-name-${color.hex}`}
                    className={cn(
                      "inline font-mono text-xs",
                      color.lightness < 0.5
                        ? "text-background"
                        : "text-foreground",
                    )}
                  >
                    {color.hex}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Colors</h3>
              <Button
                variant="ghost"
                size="sm"
                className="-mr-1"
                onClick={() => {
                  setColors([]);
                  setImageBaseColors([]);
                  setImgPreview(null);
                }}
              >
                Clear
              </Button>
            </div>

            {!!imgPreview && colors.length === 0 && (
              <div className="mt-2">
                <p className="text-sm text-foreground/50">
                  There are no colors to display. Upload a new image to get
                  started.
                </p>
              </div>
            )}
            {colors.length > 0 && (
              <div className="mt-2 grid grid-cols-4 flex-wrap gap-2">
                {colors.map((color, index) => (
                  <motion.button
                    layoutId={`color-${color.hex}`}
                    key={`${color.hex}`}
                    className="flex h-12 w-full items-center justify-center"
                    style={{ backgroundColor: color.hex, borderRadius: 8 }}
                    onClick={() => handleUpdateNewBaseColor(color, index)}
                  >
                    <motion.span
                      layoutId={`color-name-${color.hex}`}
                      className={cn(
                        "inline font-mono text-xs",
                        color.lightness < 0.5
                          ? "text-background"
                          : "text-foreground",
                      )}
                    >
                      {color.hex}
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </Fragment>
      )}
    </div>
  );
}

function ImageToolbar() {
  return <motion.div>Toolbar</motion.div>;
}

export { UploadImaagePlugin, ImageToolbar };
