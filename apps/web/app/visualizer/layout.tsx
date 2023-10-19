import { Card } from "ui/components/ui/card";
import VisualizerNav from "./visualizer-nav";
import GraphicVisualizer from "@/components/graphic-visualizer";
import ColorPickerFab from "@/components/core/color-picker-fab";

export default function Layout({ children }) {
  return (
    <div className="site-padding mx-auto mt-6 flex w-full max-w-[120rem] flex-1 flex-col pb-20 sm:pb-24 md:mt-8 lg:mt-10">
      <section>
        <Card className="relative flex min-h-[80vh] flex-1 flex-col overflow-hidden">
          <VisualizerNav />
          <div className="flex h-full w-full flex-1 flex-col items-stretch justify-center">
            {children}
          </div>
        </Card>
      </section>
      <section>
        <GraphicVisualizer />
      </section>
      <ColorPickerFab />
    </div>
  );
}
