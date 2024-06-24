import { Button } from '@ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/components/ui/dropdown-menu'
import { cn } from '@ui/lib/utils'
import { ChevronUp } from 'lucide-react'

import { Toolbar } from '../toolbar'

function MobilePrimaryMenu({ disabled }: { disabled: boolean }) {
  const dropdownClassName =
    'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent w-full'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn('lg:hidden')}>
        <Button
          aria-label="Open Menu"
          className={cn('transition-colors duration-300', 'rounded-s-none border-s border-s-border lg:rounded-s-md')}
          disabled={disabled}
          size="sm"
          title="Open menu"
        >
          <ChevronUp className="h-4 w-4 sm:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel>Tools</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Toolbar>
          <DropdownMenuItem asChild>
            <Toolbar.Readability className={dropdownClassName} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Toolbar.CVD className={dropdownClassName} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Toolbar.UploadImage />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Toolbar.DownloadBasePalette className={dropdownClassName} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Toolbar.ShareableLink className={dropdownClassName} />
          </DropdownMenuItem>
        </Toolbar>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobilePrimaryMenu
