'use client'

import { useColorStore } from '@/context/color-store-provider'
import { BaseColorTypes } from '@/types/app'
import { cn } from '@ui/lib/utils'

function ReadabilityString({ step, type }: { step: number; type: BaseColorTypes }) {
  const colorPalettes = useColorStore((s) => s.colors.colorPalettes)
  const readability = colorPalettes[type][step]?.readability
  // Function to determine border style
  const getBorderStyle = (readabilityValue: number) => {
    if (readabilityValue >= 7) {
      return 'border-border ring-1 ring-inset ring-offset-2 ring-primary ring-offset-border'
    } else if (readabilityValue >= 4.5) {
      return 'border border-accent-foreground'
    } else if (readabilityValue >= 3) {
      return 'border border-dashed'
    } else {
      return ''
    }
  }

  const foregroundBorderStyle = readability ? getBorderStyle(readability.foreground.readability) : ''

  const backgroundBorderStyle = readability ? getBorderStyle(readability.background.readability) : ''
  return (
    <div className="animate-text flex w-full justify-between text-foreground/90" title={`readability`}>
      <span
        className={cn(foregroundBorderStyle, 'rounded px-1')}
        title={`Against Foreground Readability: ${readability?.foreground?.readability}`}
      >
        {readability?.foreground?.readability}
      </span>
      <span
        className={cn(backgroundBorderStyle, '!-ml-0.5 rounded px-1')}
        title={`Against Background Readability: ${readability?.background?.readability}`}
      >
        {readability?.background?.readability}
      </span>
    </div>
  )
}

export default ReadabilityString
