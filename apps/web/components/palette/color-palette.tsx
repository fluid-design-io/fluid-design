import PaletteHeader from '@/components/palette/palette-header'

import PaletteBody from './palette-body'

function ColorPalette() {
  return (
    <div
      className="mt-6 rounded-3xl border-[0.5px] border-border bg-background p-4 transition-colors sm:p-6 md:mt-8 lg:mt-10 lg:p-8 xl:p-12"
      id="palette"
    >
      <PaletteHeader />
      <PaletteBody />
    </div>
  )
}

export default ColorPalette
