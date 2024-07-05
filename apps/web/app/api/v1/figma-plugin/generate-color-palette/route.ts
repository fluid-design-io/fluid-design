import { generateColors } from '@/data/generate-colors'
import { ColorOptions } from '@/types/app'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function GET(req: Request) {
  const origin = req.headers.get('origin')

  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const authSecret = process.env.FIGMA_AUTH_SECRET
  // decode the token using the same secret key
  // we should get the base colors
  let baseColors: Partial<ColorOptions>
  try {
    baseColors = await jwt.verify(token, authSecret)
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
        headers,
        status: 400,
      },
    )
  }
  if (
    !baseColors ||
    !baseColors.primary ||
    !baseColors.secondary ||
    !baseColors.accent
  ) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: 'Missing base colors',
        },
      },
      {
        headers,
        status: 400,
      },
    )
  }
  const { accent, primary, secondary } = baseColors
  if (!primary || !secondary || !accent) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: 'Missing primary, secondary or accent color',
        },
      },
      {
        headers,
        status: 400,
      },
    )
  }
  // !TODO: get mode from query params
  const colors = generateColors({
    accent,
    primary,
    secondary,
  })
  return NextResponse.json(
    {
      data: {
        baseColors,
        colorMode: 'hex',
        colorPalettes: colors.colorPalettes,
      },
      error: null,
    },
    {
      status: 200,
      headers,
    },
  )
}
