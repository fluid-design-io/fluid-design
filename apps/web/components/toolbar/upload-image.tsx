"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/ui/sheet";
import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import ToolbarMenuItem from "./toolbar-menu-item";
import dynamic from "next/dynamic";
import { Skeleton } from "@ui/components/ui/skeleton";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";

const UploadImaagePluginDialogContent = dynamic(
  () =>
    import("@/components/toolbar/plugin/upload-image.plugin").then(
      (mod) => mod.UploadImaagePlugin,
    ),
  {
    loading: () => <Skeleton className="h-52 w-full" />,
    ssr: false,
  },
);

const ImageToolbar = dynamic(
  () =>
    import("@/components/toolbar/plugin/upload-image.plugin").then(
      (mod) => mod.ImageToolbar,
    ),
  {
    loading: () => <Skeleton className="h-52 w-full" />,
    ssr: false,
  },
);

function ToolbarUploadImage() {
  const [open, setOpen] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const menuItem = primaryToolbarMenu["Upload Image"];
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <ToolbarMenuItem {...menuItem} />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          overlay={false}
          className="bg-background/75 px-0 pb-0 backdrop-blur-3xl backdrop-brightness-110 backdrop-saturate-150 dark:backdrop-brightness-90"
        >
          <motion.div>
            <SheetHeader className="px-6 lg:px-8">
              <SheetTitle>Upload Image</SheetTitle>
              <SheetDescription>
                Upload an image to generate a color palette from it.
              </SheetDescription>
            </SheetHeader>
            {open && <UploadImaagePluginDialogContent setOpen={setOpen} />}
          </motion.div>
        </SheetContent>
      </Sheet>
      {hasUploaded && <ImageToolbar />}
    </Fragment>
  );
}

export default ToolbarUploadImage;

ToolbarUploadImage.displayName = "ToolbarUploadImage";
