import { Popover, PopoverContent, PopoverTrigger } from '@ui/components/ui/popover'
import { Skeleton } from '@ui/components/ui/skeleton'
import { cn } from '@ui/lib/utils'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import primaryToolbarMenu from '../ui/primary-toolbar-menu'
import { usePluginCvdStore } from './plugin/cvd.plugin'
import ToolbarMenuItem from './toolbar-menu-item'

const CVDPlugin = dynamic(() => import('./plugin/cvd.plugin'), {
  loading: () => <Skeleton className="h-[40svh] lg:h-[max(calc(80vh-8rem),10rem)]" />,
  ssr: false,
})
function CVD({ className }: { className?: string }) {
  const menuItem = primaryToolbarMenu['Color Vision Deficiency']
  const maybePluginStore = usePluginCvdStore()
  const [open, setOpen] = useState(false)
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-label="Show cvd Plugin"
          className={cn(maybePluginStore?.isOn() && 'bg-primary/20', className)}
          type="button"
        >
          <ToolbarMenuItem {...menuItem} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[18rem] sm:w-[28rem]">
        {open && <CVDPlugin key={`shareable-${open}`} />}
      </PopoverContent>
    </Popover>
  )
}

export default CVD

CVD.displayName = 'CVD'
