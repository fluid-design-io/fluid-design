import { colorHelper } from "@/lib/colorHelper";
import { ImageResponse } from "next/server";
// App router includes @vercel/og.
// No need to install it.

//! DOSE IT MAKE A DIFFERENCE? edge vs node?
// export const runtime = "edge";
export const alt = "Fluid Colors";
export const size = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?colors=<colors>
    const hasColors = searchParams.has("colors");
    const colors = hasColors ? searchParams.get("colors") : "My default colors";

    const { data, error } = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL
      }/api/generate-color-palette/?colors=${encodeURIComponent(colors)}`,
    ).then((res) => res.json());

    if (error) {
      throw new Error(error);
    }

    const { colorPalettes } = data;
    const backgroundGradientFrom = colorPalettes.gray[8].color;
    const backgroundGradientTo = colorPalettes.gray[9].color;
    const backgroundLinearGradient = `linear-gradient(135deg, ${backgroundGradientFrom} 0%, ${backgroundGradientTo} 100%)`;
    const paletteBackgroundColor = colorPalettes.gray[0].color;
    const accentColor = colorPalettes.accent[7].color;
    const shadowLayer_1 = colorPalettes.primary[9].color;
    const shadowLayer_2 = colorPalettes.secondary[10].color;
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: backgroundGradientFrom,
            backgroundImage: backgroundLinearGradient,
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `radial-gradient(circle at 25px 25px, ${accentColor} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${accentColor} 2%, transparent 0%)`,
              backgroundSize: "100px 100px",
            }}
          />
          <div
            style={{
              width: "80%",
              height: "55%",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              flexWrap: "nowrap",
              background: paletteBackgroundColor,
              borderRadius: 24,
              padding: 24,
              boxShadow: `-10px 30px 0px ${shadowLayer_1}, -20px 55px 0px ${shadowLayer_2}`,
              // rotate the palette from bottom left
              // transformOrigin: "bottom left",
              transform: "rotate(-5deg) translate(0px, -15px)",
            }}
          >
            {
              // generate a rectangle for each color, for each palette
              Object.keys(colorPalettes).map((paletteName) => {
                const palette = colorPalettes[paletteName];
                return (
                  <div
                    key={paletteName}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      justifyContent: "center",
                      alignItems: "center",
                      width: `${size.width / 11 - 32}px`,
                      height: "25%",
                      margin: 4,
                    }}
                  >
                    {palette.map((color) => {
                      return (
                        <div
                          key={color.step}
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: color.color,
                            margin: 4,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: colorPalettes.gray[2].color,
                            borderStyle: "solid",
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })
            }
          </div>
        </div>
      ),
      {
        ...size,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
