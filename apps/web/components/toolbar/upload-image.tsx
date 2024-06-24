'use client'
import { useToolStore } from '@/store/toolStore'
import useStore from '@/store/useStore'
import { cn } from '@ui/lib/utils'
import dynamic from 'next/dynamic'
import { Fragment } from 'react'
import { createPortal } from 'react-dom'

import primaryToolbarMenu from '../ui/primary-toolbar-menu'
import ToolbarMenuItem from './toolbar-menu-item'

const UploadImaagePluginDialogContent = dynamic(() => import('@/components/toolbar/plugin/upload-image.plugin'), {
  loading: () => null,
  ssr: false,
})

function ToolbarUploadImage() {
  const store = useStore(useToolStore, (state) => state)
  const menuItem = primaryToolbarMenu['Upload Image']
  const handleOpen = () => {
    store?.openImageColorExtractor ? store?.setOpenImageColorExtractor(false) : store?.setOpenImageColorExtractor(true)
  }
  return (
    <Fragment>
      <button
        aria-label="Upload Image"
        className={cn(store?.openImageColorExtractor && '-mx-1.5 rounded-sm bg-primary/20 px-1.5 lg:mx-0 lg:px-0')}
        onClick={handleOpen}
        type="button"
      >
        <ToolbarMenuItem {...menuItem} />
      </button>
      {!!store?.openImageColorExtractor &&
        createPortal(<UploadImaagePluginDialogContent id="upload-image-dialog" key={`uipd`} />, document.body)}
    </Fragment>
  )
}

export default ToolbarUploadImage

ToolbarUploadImage.displayName = 'ToolbarUploadImage'
