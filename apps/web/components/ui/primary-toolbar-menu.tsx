import { Download, ImagePlus, Link } from "lucide-react";

export enum ToolbarMenus {
  UPLOAD_IMAGE = "Upload Image",
  DOWNLOAD = "Download",
  SHARE = "Share",
}

export type ToolbarMenu = {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type PrimaryToolbarMenu = {
  [key in ToolbarMenus]: ToolbarMenu;
};

const primaryToolbarMenu: PrimaryToolbarMenu = {
  [ToolbarMenus.UPLOAD_IMAGE]: {
    title: "Upload Image",
    description: "Coming Soon... Generate a color palette from an image",
    icon: ImagePlus,
  },
  [ToolbarMenus.DOWNLOAD]: {
    title: "Download",
    description: "Coming Soon... Download the current palette as a PNG",
    icon: Download,
  },
  [ToolbarMenus.SHARE]: {
    title: "Share",
    description: "Create a sharable link to your palette",
    icon: Link,
  },
};

export default primaryToolbarMenu;
