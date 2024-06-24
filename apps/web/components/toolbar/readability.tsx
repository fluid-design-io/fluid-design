import { useToolStore } from '@/store/toolStore'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/components/ui/popover'
import { Skeleton } from '@ui/components/ui/skeleton'
import { cn } from '@ui/lib/utils'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import primaryToolbarMenu from '../ui/primary-toolbar-menu'
import ToolbarMenuItem from './toolbar-menu-item'

const ReadabilityPlugin = dynamic(() => import('./plugin/readability.plugin'), {
  loading: () => <Skeleton className="h-[40svh] w-full lg:h-[max(calc(80vh-6rem),10rem)]" />,
  ssr: false,
})

function Readability({ className }: { className?: string }) {
  const menuItem = primaryToolbarMenu.Readability
  const [open, setOpen] = useState(false)
  const { showReadability } = useToolStore()
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-label="Show Readability Plugin"
          className={cn(showReadability && 'bg-primary/20', className)}
          type="button"
        >
          <ToolbarMenuItem {...menuItem} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[18rem] sm:w-[28rem]">
        {open && <ReadabilityPlugin key={`shareable-${open}`} />}
      </PopoverContent>
    </Popover>
  )
}

export default Readability

Readability.displayName = 'Readability'
