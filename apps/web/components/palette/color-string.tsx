'use client'

import { useColorStore } from '@/context/color-store-provider'
import { colorHelper } from '@/lib/colorHelper'
import { useToolStore } from '@/store/toolStore'
import { BaseColorTypes, RawColor } from '@/types/app'

function ColorString({ step, type }: { step: number; type: BaseColorTypes }) {
  const colorPalettes = useColorStore((s) => s.colors.colorPalettes)
  const { colorMode } = useToolStore()
  const color = colorPalettes?.[type]?.[step]?.raw || ({ h: 0, l: 0, s: 0 } as RawColor)
  const colorString = colorHelper.toColorMode(color, colorMode)
  return (
    <code className="animate-text" title={colorString}>
      {colorString}
    </code>
  )
}

export default ColorString
