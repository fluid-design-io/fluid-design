"use client";

import ToolbarUploadImage from "./upload-image";
import ToolbarDownloadBasePalette from "./download-base-palette";
import ToolbarShareableLink from "./shareable-link";
import { Fragment } from "react";
import { useToolStore } from "@/store/toolStore";
import { createPortal } from "react-dom";

import dynamic from "next/dynamic";
import useStore from "@/store/useStore";
import { AnimatePresence } from "framer-motion";

const UploadImaagePluginDialogContent = dynamic(
  () => import("@/components/toolbar/plugin/upload-image.plugin"),
  {
    loading: () => null,
    ssr: false,
  },
);

const ToolbarPrimative = ({ children }) => {
  const openImageColorExtractor = useStore(
    useToolStore,
    (state) => state.openImageColorExtractor,
  );
  return (
    <Fragment>
      {children}
      {!!openImageColorExtractor &&
        createPortal(
          <UploadImaagePluginDialogContent
            key={`uipd-${openImageColorExtractor}`}
          />,
          document.body,
        )}
    </Fragment>
  );
};

ToolbarPrimative.displayName = "Toolbar";

export const Toolbar = Object.assign(ToolbarPrimative, {
  UploadImage: ToolbarUploadImage,
  DownloadBasePalette: ToolbarDownloadBasePalette,
  ShareableLink: ToolbarShareableLink,
});
