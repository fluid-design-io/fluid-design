import { cn } from '@ui/lib/utils'

import ColorModeDropdownMenu from '../ui/color-mode-dropdown-menu'
import { ModeToggle } from '../ui/dark-mode-toggle'
import DesktopPreviewToolbarButtons from '../ui/desktop-primary-toolbar-buttons'
import { DiceButton } from '../ui/dice-button'

function Toolbar() {
  return (
    <div
      className={cn(
        'mx-auto max-w-[120rem]',
        'relative z-[41] flex select-none flex-row items-center justify-between py-2 sm:z-40',
        'fixed inset-x-0 bottom-0 w-full border-t border-t-border',
        'sm:border-t-none sm:sticky sm:inset-x-auto sm:bottom-auto sm:top-0 sm:border-none',
        'site-padding pointer-events-auto bg-background-accent',
        'transition-bg'
      )}
    >
      <div className="flex items-center justify-end gap-4">
        <ModeToggle />
        <ColorModeDropdownMenu />
      </div>
      <div className="flex items-center justify-end gap-4">
        <DesktopPreviewToolbarButtons />
        <DiceButton />
      </div>
    </div>
  )
}

export default Toolbar
