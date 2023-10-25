import ToolbarUploadImage from "./upload-image";
import ToolbarDownloadBasePalette from "./download-base-palette";
import ToolbarShareableLink from "./shareable-link";

const ToolbarPrimative = ({ children }) => children;

ToolbarPrimative.displayName = "Toolbar";

export const Toolbar = Object.assign(ToolbarPrimative, {
  UploadImage: ToolbarUploadImage,
  DownloadBasePalette: ToolbarDownloadBasePalette,
  ShareableLink: ToolbarShareableLink,
});
