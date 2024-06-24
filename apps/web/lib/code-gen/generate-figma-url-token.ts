import { ColorOptions } from '@/types/app'

async function generateFigmaUrlToken(baseColors: ColorOptions) {
  const { data, error } = await fetch('/api/v1/figma-plugin', {
    body: JSON.stringify({
      baseColors,
    }),
    method: 'POST',
  }).then((res) => res.json())
  const hexColors = [
    baseColors.primary,
    baseColors.secondary,
    baseColors.accent,
  ]
  console.log(`====> hexColors:`, hexColors)
  return `${process.env.NEXT_PUBLIC_URL}/?token=${
    data.token
  }&colors=${encodeURIComponent(hexColors.join(','))}`
}

export default generateFigmaUrlToken
