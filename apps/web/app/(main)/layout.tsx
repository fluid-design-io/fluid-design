import SiteHeader from '@/components/core/site-header'
import Toolbar from '@/components/core/toolbar'
import { ColorStoreProvider } from '@/context/color-store-provider'
import { generateColors } from '@/data/generate-colors'
import { colorHelper } from '@/lib/colorHelper'
import { generateBaseColors } from '@/lib/generateBaseColors'
import { BaseColorTypes } from '@/types/app'
import '@ui/styles/globals.css'
import { Suspense } from 'react'

import { getColorNames } from '../actions'
import StyleSheetInitializer from '../stylesheet-initializer'

async function MainLayout({ children }: { children: React.ReactNode }) {
  const baseColorsRaw = generateBaseColors()
  const baseColors = {
    accent: colorHelper.toHex(baseColorsRaw.accent),
    primary: colorHelper.toHex(baseColorsRaw.primary),
    secondary: colorHelper.toHex(baseColorsRaw.secondary),
  }
  const colors = generateColors(baseColors)
  const colorNames = await getColorNames(
    // get the [5] color for each base color
    Object.keys(colors.colorPalettes).map((key) => colors.colorPalettes[key as BaseColorTypes][5]?.color as string)
  )
  return (
    <ColorStoreProvider {...{ ...baseColors, colorNames, colors }}>
      <Suspense fallback={null}>
        <StyleSheetInitializer />
      </Suspense>
      <SiteHeader />
      <Toolbar />
      {children}
    </ColorStoreProvider>
  )
}

export default MainLayout
