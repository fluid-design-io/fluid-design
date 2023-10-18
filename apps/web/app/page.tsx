import ColorPalette from "../components/palette/color-palette";
import { Metadata, ResolvingMetadata } from "next";
import { BaseColors } from "@/types/app";

import { colorHelper } from "@/lib/colorHelper";

import RootSkipNavContent from "./root-skip-nav-content";
import ExistingColorsOverwritter from "./existingColorsOverwritter";

type Props = {
  searchParams: { colors: string } | undefined;
};
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const colors = searchParams?.colors;
  let paletteColors = "";
  let opengraphImage = "/og-default.jpg";
  if (colors) {
    const [primary, secondary, accent] = colors.split(",");
    if (primary && secondary && accent) {
      paletteColors = `${primary}, ${secondary}, ${accent}`;
    }
    // console.log(primary, secondary, accent);
    paletteColors = `${colorHelper.toHex(primary)}, ${colorHelper.toHex(
      secondary,
    )}, ${colorHelper.toHex(accent)}`;
    // fetch dynamic og
    const colorsUrl = encodeURIComponent(paletteColors);
    opengraphImage = `${process.env.NEXT_PUBLIC_URL}/api/og?colors=${colorsUrl}`;
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: colors ? "Check out this palette" : "Color Palette Generator",
    description: colors
      ? `Generated with Fluid Colors: ${paletteColors}`
      : "Unleash the Power of Dynamic, Variable-Based Color Palettes",
    openGraph: {
      images: [opengraphImage, ...previousImages],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  return (
    <div className="site-padding mx-auto flex w-full max-w-[120rem] flex-1 flex-col pb-20 sm:pb-24">
      <RootSkipNavContent />
      <ColorPalette />
      <ExistingColorsOverwritter searchParams={searchParams} />
    </div>
  );
}
