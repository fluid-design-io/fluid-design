import { Contrast, Download, ImagePlus, Link } from 'lucide-react'

import EyeCVD from '../svg/eye-cvd'

export enum ToolbarMenus {
  CVD = 'Color Vision Deficiency',
  DOWNLOAD = 'Download',
  READABILITY = 'Readability',
  SHARE = 'Share',
  UPLOAD_IMAGE = 'Upload Image',
}

export type ToolbarMenu = {
  description: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
}

export type PrimaryToolbarMenu = {
  [key in ToolbarMenus]: ToolbarMenu
}

const primaryToolbarMenu: PrimaryToolbarMenu = {
  [ToolbarMenus.CVD]: {
    description: 'Simulate color vision deficiency',
    icon: EyeCVD,
    title: 'Color Vision Deficiency',
  },
  [ToolbarMenus.DOWNLOAD]: {
    description: 'Download the current palette as a PNG',
    icon: Download,
    title: 'Download',
  },
  [ToolbarMenus.READABILITY]: {
    description: 'Check the contrast ratio of your palette',
    icon: Contrast,
    title: 'Readability',
  },
  [ToolbarMenus.SHARE]: {
    description: 'Create a sharable link to your palette',
    icon: Link,
    title: 'Share',
  },
  [ToolbarMenus.UPLOAD_IMAGE]: {
    description: 'Generate a color palette from an image',
    icon: ImagePlus,
    title: 'Upload Image',
  },
}

export default primaryToolbarMenu
