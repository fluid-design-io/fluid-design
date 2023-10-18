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

    /* 
    {"data":{"baseColors":{"primary":{"h":144.3850267379679,"s":0.7824267782426778,"l":0.5313725490196078,"a":1},"secondary":{"h":278.4,"s":0.6329113924050632,"l":0.30980392156862746,"a":1},"accent":{"h":215.7142857142857,"s":0.37499999999999994,"l":0.2196078431372549,"a":1}},"colorPalettes":{"primary":[{"step":50,"color":"#ebfdf2","raw":{"h":143.33333333333331,"s":0.8181818181818189,"l":0.9568627450980391,"a":1}},{"step":100,"color":"#c2f8d8","raw":{"h":144.44444444444446,"s":0.7941176470588238,"l":0.8666666666666667,"a":1}},{"step":200,"color":"#95f3bb","raw":{"h":144.25531914893617,"s":0.7966101694915252,"l":0.7686274509803921,"a":1}},{"step":300,"color":"#66ed9d","raw":{"h":144.44444444444446,"s":0.7894736842105264,"l":0.6647058823529413,"a":1}},{"step":400,"color":"#37e77f","raw":{"h":144.54545454545456,"s":0.7857142857142856,"l":0.5607843137254902,"a":1}},{"step":500,"color":"#1ad265","raw":{"h":144.45652173913044,"s":0.7796610169491526,"l":0.46274509803921565,"a":1}},{"step":600,"color":"#15a851","raw":{"h":144.48979591836735,"s":0.7777777777777777,"l":0.37058823529411766,"a":1}},{"step":700,"color":"#10823f","raw":{"h":144.73684210526318,"s":0.7808219178082192,"l":0.28627450980392155,"a":1}},{"step":800,"color":"#0d6430","raw":{"h":144.13793103448276,"s":0.7699115044247788,"l":0.22156862745098038,"a":1}},{"step":900,"color":"#094923","raw":{"h":144.375,"s":0.7804878048780488,"l":0.16078431372549018,"a":1}},{"step":950,"color":"#073a1c","raw":{"h":144.70588235294116,"s":0.7846153846153847,"l":0.12745098039215685,"a":1}}],"secondary":[{"step":50,"color":"#f8f0fc","raw":{"h":279.99999999999994,"s":0.6666666666666677,"l":0.9647058823529412,"a":1}},{"step":100,"color":"#f1e3f9","raw":{"h":278.1818181818182,"s":0.6470588235294121,"l":0.9333333333333333,"a":1}},{"step":200,"color":"#e7cff5","raw":{"h":277.89473684210526,"s":0.655172413793104,"l":0.8862745098039215,"a":1}},{"step":300,"color":"#dab4f0","raw":{"h":278,"s":0.6666666666666665,"l":0.8235294117647058,"a":1}},{"step":400,"color":"#cb94e9","raw":{"h":278.8235294117647,"s":0.6589147286821703,"l":0.7470588235294118,"a":1}},{"step":500,"color":"#b972e1","raw":{"h":278.3783783783784,"s":0.6491228070175438,"l":0.6647058823529411,"a":1}},{"step":600,"color":"#a74dd9","raw":{"h":278.57142857142856,"s":0.6481481481481483,"l":0.5764705882352941,"a":1}},{"step":700,"color":"#932ccc","raw":{"h":278.625,"s":0.6451612903225805,"l":0.4862745098039216,"a":1}},{"step":800,"color":"#7825a7","raw":{"h":278.30769230769226,"s":0.6372549019607843,"l":0.4,"a":1}},{"step":900,"color":"#5b1c7e","raw":{"h":278.57142857142856,"s":0.6363636363636364,"l":0.3019607843137255,"a":1}},{"step":950,"color":"#42145c","raw":{"h":278.33333333333337,"s":0.6428571428571429,"l":0.2196078431372549,"a":1}}],"accent":[{"step":50,"color":"#f4f6fb","raw":{"h":222.85714285714286,"s":0.4666666666666658,"l":0.9705882352941176,"a":1}},{"step":100,"color":"#dae3f1","raw":{"h":216.52173913043478,"s":0.45098039215686264,"l":0.8999999999999999,"a":1}},{"step":200,"color":"#bccce4","raw":{"h":216,"s":0.42553191489361697,"l":0.8156862745098039,"a":1}},{"step":300,"color":"#99b2d6","raw":{"h":215.40983606557376,"s":0.42657342657342673,"l":0.7196078431372549,"a":1}},{"step":400,"color":"#7596c8","raw":{"h":216.14457831325302,"s":0.4300518134715025,"l":0.6215686274509804,"a":1}},{"step":500,"color":"#507bb9","raw":{"h":215.42857142857142,"s":0.4285714285714286,"l":0.5196078431372548,"a":1}},{"step":600,"color":"#3e649b","raw":{"h":215.48387096774192,"s":0.4285714285714285,"l":0.42549019607843136,"a":1}},{"step":700,"color":"#32507c","raw":{"h":215.67567567567568,"s":0.425287356321839,"l":0.3411764705882353,"a":1}},{"step":800,"color":"#284062","raw":{"h":215.17241379310346,"s":0.42028985507246375,"l":0.2705882352941177,"a":1}},{"step":900,"color":"#1e2f48","raw":{"h":215.7142857142857,"s":0.4117647058823529,"l":0.2,"a":1}},{"step":950,"color":"#18263a","raw":{"h":215.2941176470588,"s":0.41463414634146345,"l":0.16078431372549018,"a":1}}],"gray":[{"step":50,"color":"#dee8e0","raw":{"h":131.99999999999994,"s":0.17857142857142835,"l":0.8901960784313725,"a":1}},{"step":100,"color":"#c1d3c4","raw":{"h":130.00000000000009,"s":0.1698113207547169,"l":0.792156862745098,"a":1}},{"step":200,"color":"#a6bcaa","raw":{"h":130.90909090909088,"s":0.14102564102564108,"l":0.6941176470588235,"a":1}},{"step":300,"color":"#8da592","raw":{"h":132.49999999999994,"s":0.11764705882352941,"l":0.6000000000000001,"a":1}},{"step":400,"color":"#778e7b","raw":{"h":130.43478260869566,"s":0.0923694779116466,"l":0.5117647058823529,"a":1}},{"step":500,"color":"#627866","raw":{"h":130.9090909090909,"s":0.10091743119266051,"l":0.4274509803921569,"a":1}},{"step":600,"color":"#4f6152","raw":{"h":130.00000000000003,"s":0.10227272727272724,"l":0.34509803921568627,"a":1}},{"step":700,"color":"#3c4b3f","raw":{"h":132,"s":0.11111111111111113,"l":0.2647058823529412,"a":1}},{"step":800,"color":"#2a362c","raw":{"h":130,"s":0.125,"l":0.18823529411764706,"a":1}},{"step":900,"color":"#18211a","raw":{"h":133.33333333333334,"s":0.1578947368421053,"l":0.11176470588235295,"a":1}},{"step":950,"color":"#050806","raw":{"h":140,"s":0.23076923076923078,"l":0.025490196078431372,"a":1}}]},"colorMode":"hex"},"error":null}
    */
    const { colorPalettes } = data;
    const primaryColor = colorPalettes.primary[5].raw;
    const backgroundColor = colorPalettes.gray[9].color;
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
            backgroundColor: backgroundColor,
            backgroundImage: `radial-gradient(circle at 25px 25px, ${accentColor} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${accentColor} 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
          }}
        >
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
