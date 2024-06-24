import { generateColorPalette } from '@/lib/colorCalculator'
import { BaseColorTypes, BaseColors, ColorMode } from '@/types/app'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const headers = (origin: string) => ({
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Origin': origin || '*',
})

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin')

  return new Response(null, {
    headers: headers(origin),
    status: 200,
  })
}

export async function GET(req: Request) {
  const origin = req.headers.get('origin')

  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const authSecret = process.env.FIGMA_AUTH_SECRET
  // decode the token using the same secret key
  // we should get the base colors
  let baseColors: Partial<BaseColors>
  try {
    baseColors = jwt.verify(token, authSecret)
  } catch (error) {
    console.log(`====> Error:`, error)
    return NextResponse.json(
      {
        data: null,
        error: {
          message: 'Invalid token',
        },
      },
      {
        headers: headers(origin),
        status: 400,
      }
    )
  }
  const { accent, primary, secondary } = baseColors as BaseColors
  if (!primary || !secondary || !accent) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: 'Missing primary, secondary or accent color',
        },
      },
      {
        headers: headers(origin),
        status: 400,
      }
    )
  }
  // !TODO: get mode from query params
  const mode = ColorMode.HEX
  const [primaryPalette, secondaryPalette, accentPalette, grayPalette] = ['primary', 'secondary', 'accent', 'gray'].map(
    (color) =>
      generateColorPalette({
        color: color === 'gray' ? baseColors.primary : baseColors[color],
        type: color as BaseColorTypes,
      })
  )
  return NextResponse.json(
    {
      data: {
        baseColors,
        colorMode: mode,
        colorPalettes: {
          accent: accentPalette,
          gray: grayPalette,
          primary: primaryPalette,
          secondary: secondaryPalette,
        },
      },
      error: null,
    },
    {
      headers: headers(origin),
    }
  )
}
