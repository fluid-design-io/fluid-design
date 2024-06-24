export const colorStepMap = {
  0: 50,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 600,
  7: 700,
  8: 800,
  9: 900,
  10: 950,
}

export type ColorStep = keyof typeof colorStepMap
export type ColorSteps = ColorStep[]
export type ColorValue = (typeof colorStepMap)[ColorStep]

export const COLOR_LENGTH = Object.keys(colorStepMap).length
