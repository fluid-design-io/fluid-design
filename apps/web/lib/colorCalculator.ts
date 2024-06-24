import { BaseColorTypes, ColorMode, ColorValue, RawColor } from '@/types/app'
import { converter, formatHsl } from 'culori'
import tinycolor from 'tinycolor2'

import { colorHelper } from './colorHelper'
import { COLOR_LENGTH } from './colorStepMap'
import { findClosestColors } from './findColosestHues'
import { lightnessFormula } from './lightnessFormula'
import { saturationsFormula } from './saturationsFormula'

const calculateLightness = (
  inputHue: number,
  step: number,
  formulatLeftLightness: (x: number) => number,
  formulatRightLightness: (x: number) => number,
  colorLeftRatio: number,
  colorRightRatio: number,
  inputLightness: number
) => {
  let res =
    (formulatLeftLightness(step) * colorLeftRatio + formulatRightLightness(step) * colorRightRatio) * 0.97 +
    inputLightness * 0.03 * 100
  if (step === 9) {
    // if inputHue is between green and purple, we will limit the lightness * 0.95
    if (inputHue > 70 && inputHue < 300) {
      res *= 0.95
    }
    // if inputHue is between blue and violet, we will limit the lightness * 0.95 again
    if (inputHue > 200 && inputHue < 260) {
      res *= 0.95
    }
  }
  if (step === 10) {
    // if inputHue is between green and purple, we will limit the lightness * 0.9
    if (inputHue > 70 && inputHue < 300) {
      res *= 0.9
    }
    // if inputHue is between blue and violet, we will limit the lightness * 0.9 again
    if (inputHue > 200 && inputHue < 260) {
      res *= 0.9
    }
  }

  return res
}

export const getUnionFormula = (inputHue: number, inputSaturation: number, inputLightness: number) => {
  const [{ color: colorLeftName, ratio: colorLeftRatio }, { color: colorRightName, ratio: colorRightRatio }] =
    findClosestColors(inputHue)
  const formulaLeftSaturation = saturationsFormula[colorLeftName]
  const formulaRightSaturation = saturationsFormula[colorRightName]
  const formulatLeftLightness = lightnessFormula[colorLeftName]
  const formulatRightLightness = lightnessFormula[colorRightName]
  return (step: number) => ({
    // we will take 3% of inputLightness and 97% of the other color lightness
    lightness: calculateLightness(
      inputHue,
      step,
      formulatLeftLightness,
      formulatRightLightness,
      colorLeftRatio,
      colorRightRatio,
      inputLightness
    ),
    // we will take 88% of inputSaturation and 12% of the other color saturation
    saturation:
      (formulaLeftSaturation(step) * colorLeftRatio + formulaRightSaturation(step) * colorRightRatio) * 0.12 +
      inputSaturation * 0.88 * 100,
  })
}

export const colorStep = (i: number) => (i === 0 ? 50 : i === 10 ? 950 : i * 100)

export const generateColorPalette = ({ color, type }: { color: RawColor; type: BaseColorTypes }): ColorValue[] =>
  Array.from({ length: COLOR_LENGTH }, (_, i) => {
    const rawColor = tinycolor(color)
    let calculatedColor = rawColor
    const step = i
    const sat = rawColor.toHsl().s
    const lig = rawColor.toHsl().l
    if (type === 'gray') {
      const oklchConverter = converter('oklch')
      const okhslConverter = converter('okhsl')
      const okhslColor = okhslConverter({ ...color, mode: 'hsl' })
      const oklschColor = oklchConverter({ ...color, mode: 'hsl' })
      let { h, s } = okhslColor
      let { l } = oklschColor
      const lInfluence = lig / 50 // 2% of the lightness based on the input lightness
      l = (COLOR_LENGTH - 1 - i) * (1 / COLOR_LENGTH) + lInfluence + 1 / COLOR_LENGTH / 2
      s = 0.01 + sat * 0.25
      calculatedColor = tinycolor(formatHsl({ h, l, mode: 'okhsl', s }))
    } else {
      let hue = Math.round(rawColor.toHsl().h * 10) / 10
      // if hue is Nan, set it to 0
      if (isNaN(hue)) {
        const lch = (calculatedColor as any).toLch()
        calculatedColor = tinycolor({
          c: lch.c,
          h: lch.h,
          l: (COLOR_LENGTH - 1 - i) * 8.85 + 5,
        } as any)
      } else {
        hue === 360 ? (hue = 0.001) : hue
        hue === 0 ? (hue = 0.001) : hue
        const formula = getUnionFormula(hue, sat, lig)
        const { lightness, saturation } = formula(step)
        const colorString = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        calculatedColor = tinycolor(colorString)
      }
    }
    const convertedColor = colorHelper.toColorMode(calculatedColor, ColorMode.HEX)
    return {
      color: convertedColor,
      raw: tinycolor(convertedColor).toHsl() as RawColor,
      step: colorStep(step),
    }
  })
