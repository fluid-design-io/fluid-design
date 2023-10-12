import Toolbar from "@/components/toobar";
import ColorPalette from "../components/palette/color-palette";
import { Metadata, ResolvingMetadata } from "next";
import { BaseColorTypes, BaseColors, ColorMode } from "@/types/app";

import dynamic from "next/dynamic";
import { colorHelper } from "@/lib/colorHelper";
import { useColorStore } from "@/store/store";
import { generateBaseColors } from "@/lib/generateBaseColors";
import { generateColorPalette } from "@/lib/colorCalculator";
import ColorStoreInitializer from "./color-store-initializer";
import PaletteVisualizer from "@/components/palette/palette-visualizer";

const PerformanceChecker = dynamic(
  () => import("../components/performance-checker"),
);

type Props = {
  searchParams: { colors: string } | undefined;
};
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const colors = searchParams?.colors;
  let paletteColors = "";
  if (colors) {
    const parsedColors: { state: { baseColors: BaseColors } } =
      JSON.parse(colors);
    const { primary, secondary, accent } = parsedColors.state.baseColors;
    // console.log(primary, secondary, accent);
    paletteColors = `${colorHelper.toHex(primary)}, ${colorHelper.toHex(
      secondary,
    )}, ${colorHelper.toHex(accent)}`;
  }
  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${paletteColors}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

const getServerColors = async () => {
  const newBaseColors = generateBaseColors();
  // short-hand
  const [primaryPalette, secondaryPalette, accentPalette, grayPalette] = [
    "primary",
    "secondary",
    "accent",
    "gray",
  ].map((color) =>
    generateColorPalette({
      color: color === "gray" ? newBaseColors.primary : newBaseColors[color],
      type: color as BaseColorTypes,
      colorMode: ColorMode.HEX,
    }),
  );
  return {
    baseColors: newBaseColors,
    colorPalettes: {
      primary: primaryPalette,
      secondary: secondaryPalette,
      accent: accentPalette,
      gray: grayPalette,
    },
  };
};

export default async function Page({ searchParams }: Props) {
  const { baseColors, colorPalettes } = await getServerColors();
  useColorStore.setState({
    baseColors,
    colorPalettes,
  });
  return (
    <div className="site-padding mx-auto flex w-full max-w-[120rem] flex-1 flex-col pb-20 sm:pb-24">
      <ColorStoreInitializer {...{ baseColors, colorPalettes }} />
      <Toolbar />
      <ColorPalette />
      <div className="mt-24" />
      <PaletteVisualizer />
      <PerformanceChecker />
    </div>
  );
}
