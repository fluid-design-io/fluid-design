'use client'

import { useColorStore } from '@/context/color-store-provider'
import { BaseColorTypes } from '@/types/app'
import { cn } from '@ui/lib/utils'

function SixtyThirtyTenPalettes({ className }: { className?: string }) {
  const { colorNames, colors } = useColorStore((s) => s)

  const colorSixty = {
    accent: 'bg-[hsl(var(--accent-900))] dark:bg-[hsl(var(--accent-100))]',
    gray: 'bg-[hsl(var(--gray-900))] dark:bg-[hsl(var(--gray-100))]',
    primary: 'bg-[hsl(var(--primary-900))] dark:bg-[hsl(var(--primary-100))]',
    secondary: 'bg-[hsl(var(--secondary-900))] dark:bg-[hsl(var(--secondary-100))]',
  } satisfies Record<BaseColorTypes, string>
  const colorThirty = {
    accent: 'bg-[hsl(var(--accent-800))] dark:bg-[hsl(var(--accent-200))]',
    gray: 'bg-[hsl(var(--gray-800))] dark:bg-[hsl(var(--gray-200))]',
    primary: 'bg-[hsl(var(--primary-800))] dark:bg-[hsl(var(--primary-200))]',
    secondary: 'bg-[hsl(var(--secondary-800))] dark:bg-[hsl(var(--secondary-200))]',
  } satisfies Record<BaseColorTypes, string>
  const boxStyle = ['box-primary', 'box-secondary', 'box-accent', 'box-border']
  const baseColors: BaseColorTypes[] = ['primary', 'secondary', 'accent', 'gray']
  return (
    <div
      className={cn(
        'grid grid-cols-1 content-stretch gap-4 md:gap-5',
        '@md/section-secondary:grid-cols-4',
        'flex-1',
        className
      )}
    >
      {
        // map over base colors
        baseColors.map((key, i) => (
          <div key={`sixty-thirty-ten-palette-${i}-${key}`}>
            <div
              className={cn(
                'relative flex aspect-[28/9] h-full min-h-[4rem] w-full overflow-hidden rounded-lg border',
                '@md/section-secondary:aspect-[9/21]',
                '@md/section-secondary:flex-col @xl/section-secondary:aspect-[9/14]',
                '@2xl/section-secondary:aspect-auto @2xl/section-secondary:rounded-2xl',
                'transition-colors delay-700 duration-1000',
                boxStyle[i]
              )}
              style={{
                // fallback background color when css style tag is not loaded
                backgroundColor: colors.colorPalettes[key][5]?.color,
              }}
            >
              <div
                className={cn(
                  'absolute start-0 top-0 p-4 font-sans text-lg font-extralight text-background/80 delay-300 duration-700',
                  'contrast-more:font-medium contrast-more:text-foreground/80 contrast-more:hover:text-foreground',
                  'animate-text transition-all'
                )}
              >
                {colorNames?.[i]}
              </div>
              <div className={cn('flex-[0.6] transition-colors delay-300 duration-1000', colorSixty[key])}></div>
              <div className="flex flex-[0.4] @md/section-secondary:flex-col">
                <div className={cn('flex-[0.75] transition-colors delay-500 duration-1000', colorThirty[key])}></div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default SixtyThirtyTenPalettes
