import { Download, Eye, ImagePlus, Link } from "lucide-react";
import EyeCVD from "../svg/eye-cvd";

export enum ToolbarMenus {
  UPLOAD_IMAGE = "Upload Image",
  DOWNLOAD = "Download",
  SHARE = "Share",
  READABILITY = "Readability",
  CVD = "Color Vision Deficiency",
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
  [ToolbarMenus.READABILITY]: {
    title: "Readability",
    description: "Check the contrast ratio of your palette",
    icon: Eye,
  },
  [ToolbarMenus.CVD]: {
    title: "Color Vision Deficiency",
    description: "Simulate color vision deficiency",
    icon: EyeCVD,
  },
  [ToolbarMenus.UPLOAD_IMAGE]: {
    title: "Upload Image",
    description: "Generate a color palette from an image",
    icon: ImagePlus,
  },
  [ToolbarMenus.DOWNLOAD]: {
    title: "Download",
    description: "Download the current palette as a PNG",
    icon: Download,
  },
  [ToolbarMenus.SHARE]: {
    title: "Share",
    description: "Create a sharable link to your palette",
    icon: Link,
  },
};

export default primaryToolbarMenu;
