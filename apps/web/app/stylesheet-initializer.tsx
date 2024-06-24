'use client'

import { useColorStore } from '@/context/color-store-provider'
import { areSearchParamColorsValid } from '@/lib/colorHelper'
import { updateCSSVariables } from '@/lib/updateCssVariables'
import { BaseColorTypes } from '@/types/app'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

function StyleSheetInitializer() {
  const { accent, generateColorNames, generateColors, primary, secondary, setBaseColors, setColorNames, setColors } =
    useColorStore((s) => s)
  const searchParams = useSearchParams()
  const primaryParam = searchParams.get('primary')
  const secondaryParam = searchParams.get('secondary')
  const accentParam = searchParams.get('accent')
  const addBodyColorTransition = () => {
    // insert `transition-colors and duration-1000` to all elements with .transition-bg, then remove it after 1s
    const elements = document.querySelectorAll('.transition-bg')
    elements.forEach((element) => {
      element.classList.add('transition-colors', 'duration-1000')
      setTimeout(() => {
        element.classList.remove('transition-colors', 'duration-1000')
      }, 1000)
    })
  }
  useEffect(() => {
    const baseColors = {
      accent,
      primary,
      secondary,
    }
    const colors = generateColors(baseColors)
    const colorNameColors = Object.keys(colors.colorPalettes).map(
      (key) => colors.colorPalettes[key as BaseColorTypes][5]?.color as string
    )
    generateColorNames(colorNameColors).then(setColorNames)
    setColors(colors)
    addBodyColorTransition()
    updateCSSVariables(colors.colorPalettes)
  }, [primary, secondary, accent])
  useEffect(() => {
    if (primaryParam && secondaryParam && accentParam) {
      if (primaryParam !== primary || secondaryParam !== secondary || accentParam !== accent) {
        if (areSearchParamColorsValid(primaryParam, secondaryParam, accentParam)) {
          console.log('setting colors from search params')
          setBaseColors({
            accent: accentParam,
            primary: primaryParam,
            secondary: secondaryParam,
          })
        }
      }
    }
  }, [primary, secondary, accent, setBaseColors])
  return null
}

export default StyleSheetInitializer
