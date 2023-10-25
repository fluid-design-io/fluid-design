"use client";
import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import ToolbarMenuItem from "./toolbar-menu-item";

import { useToolStore } from "@/store/toolStore";

function ToolbarUploadImage() {
  const { setOpenImageColorExtractor, openImageColorExtractor } =
    useToolStore();
  const menuItem = primaryToolbarMenu["Upload Image"];
  return (
    <button
      type="button"
      onClick={() =>
        openImageColorExtractor
          ? setOpenImageColorExtractor(false)
          : setOpenImageColorExtractor(true)
      }
      aria-label="Upload Image"
    >
      <ToolbarMenuItem {...menuItem} />
    </button>
  );
}

export default ToolbarUploadImage;

ToolbarUploadImage.displayName = "ToolbarUploadImage";
