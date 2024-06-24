import CVD from './cvd'
import ToolbarDownloadBasePalette from './download-base-palette'
import Readability from './readability'
import ToolbarShareableLink from './shareable-link'
import ToolbarUploadImage from './upload-image'

const ToolbarPrimative = ({ children }: { children: React.ReactNode }) => children

ToolbarPrimative.displayName = 'Toolbar'

export const Toolbar = Object.assign(ToolbarPrimative, {
  CVD: CVD,
  DownloadBasePalette: ToolbarDownloadBasePalette,
  Readability: Readability,
  ShareableLink: ToolbarShareableLink,
  UploadImage: ToolbarUploadImage,
})
