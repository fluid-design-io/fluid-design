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
          style={{
            backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGF2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB0aWZmOk9yaWVudGF0aW9uPSIxIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0xMC0xM1QyMDo1NTo1OC0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMTAtMTNUMjE6MTk6MTQtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMTAtMTNUMjE6MTk6MTQtMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ3N2M2OWE4LTliZmItNDFlYy1iNmNjLWM2MGE4NTdjZDk2YyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2YmEwNDY2Mi01ZDU2LTQ5MGUtOTU0OS01NjQ3YzIwNDQwN2MiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2YmEwNDY2Mi01ZDU2LTQ5MGUtOTU0OS01NjQ3YzIwNDQwN2MiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2YmEwNDY2Mi01ZDU2LTQ5MGUtOTU0OS01NjQ3YzIwNDQwN2MiIHN0RXZ0OndoZW49IjIwMjMtMTAtMTNUMjA6NTY6NTItMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xICgyMDIzMTAwMy5tLjIzNTAgNDY1NjYxZSkgIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkNzdjNjlhOC05YmZiLTQxZWMtYjZjYy1jNjBhODU3Y2Q5NmMiIHN0RXZ0OndoZW49IjIwMjMtMTAtMTNUMjE6MTk6MTQtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xICgyMDIzMTAwMy5tLjIzNTAgNDY1NjYxZSkgIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtN09IQAAApQSURBVFjDPdjHq1VXFAfg/Z7H2HvvvUZN7L2jIoqKigg6UgdiJv4JgmNRQiJOhQwsIGJXNPbe0myx9957iS/3W7C9cHn3nnv2Kr+y9j6v2L59e71du3aVP3z4sGLQoEGpoqIi/ffff+ndu3epXbt26fbt2+ns2bPpxx9/TK9evUp3795NvXr1Sn///Xe6c+dOGjhwYHr+/HkaOnRo2rFjR/r69Wvq0qVLKsVL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)`,
            backgroundSize: "40px",
          }}
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
