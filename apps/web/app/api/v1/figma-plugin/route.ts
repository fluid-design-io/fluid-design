import { RawColor } from '@/types/app'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import tinycolor from 'tinycolor2'

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
export async function POST(request: Request) {
  const { baseColors } = await request.json()
  const authSecret = process.env.FIGMA_AUTH_SECRET
  // generate a bearer token using jwt.io
  const token = jwt.sign(
    {
      // this is the data we want to encode
      // we can encode anything, but we want to encode the base colors
      // so we can use it in the figma plugin
      ...baseColors,
    },
    authSecret,
    {
      // this is the secret key
      // we can use the same secret key in the figma plugin to decode the token
      // and get the base colors
      expiresIn: '30d',
    },
  )

  return NextResponse.json({
    data: {
      token,
    },
    error: null,
  })
}

export async function GET(req: Request) {
  const origin = req.headers.get('origin')
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const authSecret = process.env.FIGMA_AUTH_SECRET
  // decode the token using the same secret key
  // we should get the base colors
  /*
  https://colors.fluid-design.io/?primary=fb46d6&secondary=e82c21&accent=9b2c97&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmltYXJ5Ijp7ImEiOjEsImgiOjMxMi4yNjUxOTMzNzAxNjU4LCJsIjowLjYyOTQxMTc2NDcwNTg4MjMsInMiOjAuOTU3NjcxOTU3NjcxOTU3N30sInNlY29uZGFyeSI6eyJhIjoxLCJoIjozLjMxNjU4MjkxNDU3Mjg2MywibCI6MC41MTk2MDc4NDMxMzcyNTQ5LCJzIjowLjgxMjI0NDg5Nzk1OTE4MzV9LCJhY2NlbnQiOnsiYSI6MSwiaCI6MzAyLjE2MjE2MjE2MjE2MjEzLCJsIjowLjM5MDE5NjA3ODQzMTM3MjUsInMiOjAuNTU3Nzg4OTQ0NzIzNjE4MX0sImlhdCI6MTcxOTI1MTEzMiwiZXhwIjoxNzIxODQzMTMyfQ.H2gg_nCxbEC4NbZ1NLci8PRU0hPMe1_iGnxkCJZ42JQ
  */
  try {
    jwt.verify(token, authSecret)
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
      },
    )
  }
  const primary = searchParams.get('primary')
  const secondary = searchParams.get('secondary')
  const accent = searchParams.get('accent')
  if (!primary || !secondary || !accent) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: 'Primary, secondary or accent color is missing',
        },
      },
      {
        headers: headers(origin),
        status: 400,
      },
    )
  }
  const v = (color: RawColor | string) => tinycolor(color).isValid()
  if (!v(primary) || !v(secondary) || !v(accent)) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: 'Invalid primary, secondary or accent color',
        },
      },
      {
        headers: headers(origin),
        status: 400,
      },
    )
  }
  return NextResponse.json(
    {
      data: {
        accent,
        primary,
        secondary,
      },
      error: null,
    },
    {
      headers: headers(origin),
    },
  )
}
