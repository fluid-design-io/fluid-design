'use server'

import colorNameList from '@/lib/converted_colors.json'
import { ColorNames } from '@/types/app'
import { differenceEuclidean, nearest } from 'culori'

interface ColorNameListWithIndex {
  [key: string]: string
}

const indexedColorNameList: ColorNameListWithIndex = colorNameList

export const getColorNames = async (colors: ColorNames) => {
  const colorKeys = Object.keys(indexedColorNameList)
  const nearestNamedColors = nearest(colorKeys, differenceEuclidean(), (name) => indexedColorNameList[name])
  let names = colors.map((color) => {
    const name = nearestNamedColors(color, 1)
    return name?.[0]
  })
  return names
}
