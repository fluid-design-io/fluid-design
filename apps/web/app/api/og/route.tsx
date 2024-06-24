import { generateColors } from '@/data/generate-colors'
import { BaseColorTypes } from '@/types/app'
import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

//! DOSE IT MAKE A DIFFERENCE? edge vs node?
// export const runtime = "edge";
export const alt = 'Fluid Colors'
export const size = {
  height: 630,
  width: 1200,
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const primary = searchParams.get('primary')
    const secondary = searchParams.get('secondary')
    const accent = searchParams.get('accent')

    const baseColors = {
      primary: primary ?? '#FF0000',
      secondary: secondary ?? '#00FF00',
      accent: accent ?? '#0000FF',
    }

    const colors = generateColors(baseColors)

    const { colorPalettes } = colors

    // throw if object is empty

    if (Object.keys(colorPalettes).length === 0) {
      throw new Error('Failed to generate color palettes')
    }

    const backgroundGradientFrom = colorPalettes.gray[8].color
    const backgroundGradientTo = colorPalettes.gray[9].color
    const backgroundLinearGradient = `linear-gradient(135deg, ${backgroundGradientFrom} 0%, ${backgroundGradientTo} 100%)`
    const paletteBackgroundColor = colorPalettes.gray[0].color
    const accentColor = colorPalettes.accent[7].color
    const shadowLayer_1 = colorPalettes.primary[9].color
    const shadowLayer_2 = colorPalettes.secondary[10].color
    const colorPaletteNames: Array<BaseColorTypes> = ['primary', 'secondary', 'accent', 'gray']
    return new ImageResponse(
      (
        <div
          style={{
            alignItems: 'center',
            backgroundColor: backgroundGradientFrom,
            backgroundImage: backgroundLinearGradient,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, ${accentColor} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${accentColor} 2%, transparent 0%)`,
              backgroundSize: '100px 100px',
              display: 'flex',
              height: '100%',
              position: 'absolute',
              width: '100%',
            }}
          />
          <div
            style={{
              alignItems: 'center',
              background: paletteBackgroundColor,
              borderRadius: 24,
              boxShadow: `-10px 30px 0px ${shadowLayer_1}, -20px 55px 0px ${shadowLayer_2}`,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              height: '55%',
              justifyContent: 'center',
              padding: 24,
              textAlign: 'center',
              // transformOrigin: "bottom left",
              transform: 'rotate(-5deg) translate(0px, -15px)',
              // rotate the palette from bottom left
              width: '80%',
            }}
          >
            {
              // generate a rectangle for each color, for each palette
              colorPaletteNames.map((paletteName) => {
                const palette = colorPalettes[paletteName as BaseColorTypes]
                return (
                  <div
                    key={paletteName}
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      height: '25%',
                      justifyContent: 'center',
                      margin: 4,
                      width: `${size.width / 11 - 32}px`,
                    }}
                  >
                    {palette.map((color) => {
                      return (
                        <div
                          key={color.step}
                          style={{
                            backgroundColor: color.color,
                            borderColor: colorPalettes.gray[2].color,
                            borderRadius: 12,
                            borderStyle: 'solid',
                            borderWidth: 2,
                            height: '100%',
                            margin: 4,
                            width: '100%',
                          }}
                        />
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
