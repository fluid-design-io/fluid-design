"use client";

import { cn } from "ui/lib/utils";

import { Toolbar } from "../toolbar";

function DesktopPreviewToolbarButtons() {
  return (
    <div
      className={cn(
        "hidden lg:flex",
        "h-10 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      )}
    >
      <Toolbar>
        <Toolbar.Readability />
        <Toolbar.CVD />
        <Toolbar.UploadImage />
        <Toolbar.DownloadBasePalette />
        <Toolbar.ShareableLink />
      </Toolbar>
    </div>
  );
}

export default DesktopPreviewToolbarButtons;
