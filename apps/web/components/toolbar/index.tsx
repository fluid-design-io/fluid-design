import ToolbarUploadImage from "./upload-image";
import ToolbarDownloadBasePalette from "./download-base-palette";
import ToolbarShareableLink from "./shareable-link";
import Readability from "./readability";
import CVD from "./cvd";

const ToolbarPrimative = ({ children }) => children;

ToolbarPrimative.displayName = "Toolbar";

export const Toolbar = Object.assign(ToolbarPrimative, {
  UploadImage: ToolbarUploadImage,
  DownloadBasePalette: ToolbarDownloadBasePalette,
  ShareableLink: ToolbarShareableLink,
  Readability: Readability,
  CVD: CVD,
});
