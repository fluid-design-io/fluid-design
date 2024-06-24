'use client'

import { useToolStore } from '@/store/toolStore'
import { ColorMode } from '@/types/app'
import { Button } from '@ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@ui/components/ui/dropdown-menu'
function ColorModeDropdownMenu() {
  const { colorMode, setColorMode } = useToolStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center justify-center gap-1.5 text-sm uppercase" variant="outline">
          <span>{colorMode}</span>
          {/* <ChevronDownIcon className="h-3.5 w-3.5" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[8.75rem]">
        <DropdownMenuRadioGroup onValueChange={setColorMode} value={colorMode}>
          {Object.values(ColorMode).map((mode) => {
            return (
              <DropdownMenuRadioItem className="uppercase" key={mode} value={mode}>
                {mode}
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ColorModeDropdownMenu
