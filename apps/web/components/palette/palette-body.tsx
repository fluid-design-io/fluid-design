import { cn } from '@ui/lib/utils'

import AnalogousMonochromaticPalettes from './analogous-mono-palettes'
import BaseColorPalettes from './base-color-palettes'
import BaseColorPickers from './base-color-pickers'
import SixtyThirtyTenPalettes from './six-thirty-ten-palette'

function PaletteBody() {
  return (
    <main className="grid scroll-mt-8 grid-cols-12 place-content-stretch gap-4 pt-4 sm:pt-8 md:gap-5" id="palette-body">
      <div
        className={cn(
          'col-span-12 flex flex-col gap-4 md:col-span-5 md:gap-5',
          // container feature
          '@container/section-primary'
        )}
      >
        <BaseColorPickers />
        <AnalogousMonochromaticPalettes className="hidden md:grid" />
      </div>
      <div
        className={cn(
          'col-span-12 gap-4 md:col-span-7 md:gap-5',
          // container feature
          '@container/section-secondary',
          'flex flex-col justify-stretch'
        )}
      >
        <BaseColorPalettes />
        <SixtyThirtyTenPalettes />
        <AnalogousMonochromaticPalettes className="md:hidden" />
      </div>
    </main>
  )
}

export default PaletteBody
