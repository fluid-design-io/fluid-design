'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/components/tooltip'
import { Button } from '@ui/components/ui/button'
import React from 'react'

const DesktopPreviewToolbarIcon = ({
  description,
  icon: Icon,
  title,
}: {
  description: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
}) => {
  return (
    <TooltipProvider delayDuration={250} key={`desktop-primary-toolbar-${title}`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={title}
            asChild
            className="hidden h-8 w-8 select-none items-center rounded-sm px-1 py-1 text-sm font-medium text-foreground/75 outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground lg:flex"
            size="icon"
            variant="ghost"
          >
            <div>
              <div className="sr-only">{title}</div>
              <Icon className="size-5" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="max-w-[10rem]">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default DesktopPreviewToolbarIcon
