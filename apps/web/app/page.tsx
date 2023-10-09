import Toolbar from "@/components/toobar";
import ColorPalette from "../components/palette/color-palette";
import { Metadata, ResolvingMetadata } from "next";
import { BaseColors } from "@/types/app";

import dynamic from "next/dynamic";
import PaletteInitializer from "@/components/palette/palette-initializer";

const PerformanceChecker = dynamic(
  () => import("../components/performance-checker"),
  { ssr: false },
);

const PaletteVisualizer = dynamic(
  () => import("../components/palette/palette-visualizer"),
  { ssr: false },
);

type Props = {
  searchParams: { colors: string } | undefined;
};
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const colors = searchParams?.colors;
  if (colors) {
    const parsedColors: { state: { baseColors: BaseColors } } =
      JSON.parse(colors);
    const { primary, secondary, accent } = parsedColors.state.baseColors;
    console.log(primary, secondary, accent);
  }
  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Fluid Colors",
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default function Page({ searchParams }: Props) {
  return (
    <div className="site-padding mx-auto flex w-full max-w-[120rem] flex-1 flex-col pb-20 sm:pb-24">
      <Toolbar />
      <ColorPalette />
      <PaletteInitializer />
      <PerformanceChecker />
      <div className="mt-24" />
      <PaletteVisualizer />
    </div>
  );
}
