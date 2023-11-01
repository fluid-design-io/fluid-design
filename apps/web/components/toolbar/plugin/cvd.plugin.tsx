import { useColorStore } from "@/store/store";
import { Label } from "@ui/components/ui/label";
import { useEffect, useState } from "react";
import {
  filterDeficiencyProt,
  filterDeficiencyDeuter,
  filterDeficiencyTrit,
  parse,
  formatHex,
  hsl,
} from "culori";
import { Slider } from "@ui/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
import { ScrollArea } from "@ui/components/ui/scroll-area";

import { create } from "zustand";
import { produce } from "immer";

import { devtools, persist } from "zustand/middleware";

export type PluginCvdState = {
  isOn: () => boolean;
  protanopia: [number];
  deuteranopia: [number];
  tritanopia: [number];
  setProtanopia: (value: [number]) => void;
  setDeuteranopia: (value: [number]) => void;
  setTritanopia: (value: [number]) => void;
};

export const usePluginCvdStore = create<PluginCvdState>()(
  devtools((set, get) => ({
    isOn: () => {
      const { protanopia, deuteranopia, tritanopia } = get();
      return (
        protanopia[0] !== 0 || deuteranopia[0] !== 0 || tritanopia[0] !== 0
      );
    },
    protanopia: [0],
    deuteranopia: [0],
    tritanopia: [0],
    setProtanopia: (value) =>
      set(
        produce((state) => {
          state.protanopia = value;
        }),
      ),
    setDeuteranopia: (value) =>
      set(
        produce((state) => {
          state.deuteranopia = value;
        }),
      ),
    setTritanopia: (value) =>
      set(
        produce((state) => {
          state.tritanopia = value;
        }),
      ),
  })),
);

function CVDPlugin() {
  const { colorPalettes, generatePalette, baseColors } = useColorStore();
  const {
    protanopia,
    deuteranopia,
    tritanopia,
    setProtanopia,
    setDeuteranopia,
    setTritanopia,
  } = usePluginCvdStore();
  const [isMounted, setIsMounted] = useState(false);
  // make a copy of the colorPalettes object
  const colorPalettesCopy = { ...colorPalettes };

  const handleCalculateCvd = () => {
    console.log(`ran handleCalculateCvd`);
    if (protanopia[0] === 0 && deuteranopia[0] === 0 && tritanopia[0] === 0) {
      if (isMounted) generatePalette(true);
    } else {
      const newColorPalettes = Object.keys(colorPalettesCopy).reduce(
        (acc, key) => {
          const newColorPalette = colorPalettesCopy[key].map(
            ({ color }, index) => {
              const rgb = parse(color);
              let newColor = filterDeficiencyProt(protanopia[0])(rgb);
              newColor = filterDeficiencyDeuter(deuteranopia[0])(newColor);
              newColor = filterDeficiencyTrit(tritanopia[0])(newColor);
              const hslColor = hsl(newColor);
              const hex = formatHex(newColor);
              return {
                ...colorPalettesCopy[key][index],
                raw: {
                  h: hslColor.h,
                  s: hslColor.s,
                  l: hslColor.l,
                  a: hslColor?.alpha ?? 1,
                },
                color: hex,
              };
            },
          );
          acc[key] = newColorPalette;
          return acc;
        },
        {} as any,
      );
      useColorStore.setState({ colorPalettes: newColorPalettes });
    }
  };
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    handleCalculateCvd();
  }, [protanopia, deuteranopia, tritanopia, baseColors]);
  return (
    <div className="w-full">
      {/* Added fixed faded gradient */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-[1px] z-10 h-6 w-full rounded-t bg-gradient-to-t from-transparent to-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[1px] z-10 h-6 w-full rounded-b bg-gradient-to-b from-transparent to-background" />
        <ScrollArea className="relative max-h-[min(20rem,70vh)] w-full overflow-y-auto rounded border">
          <div className="prose prose-sm p-4 dark:prose-invert">
            <h2>CVD (Color Vision Deficiency)</h2>
            <h3>Protanopia and Protanomaly</h3>
            <ul>
              <li>
                <strong>Protanopia</strong>: This is a form of red-green color
                blindness where the red cones in the eye are absent. As a
                result, red appears as black, and certain shades of orange,
                yellow, and green may appear as yellow.
              </li>
              <li>
                <strong>Protanomaly</strong>: This is a milder form of red-green
                color blindness compared to Protanopia. In this condition, red
                cones are present but do not function properly. Red, orange, and
                yellow may appear greener than they actually are.
              </li>
            </ul>
            <h3>Deuteranopia and Deuteranomaly</h3>
            <ul>
              <li>
                <strong>Deuteranopia</strong>: This is another form of red-green
                color blindness where the green cones in the eye are absent. As
                a result, green appears as beige, and red may appear as brown.
              </li>
              <li>
                <strong>Deuteranomaly</strong>: This is the most common form of
                red-green color blindness. Green cones are present but are
                dysfunctional. Yellow and green appear redder than they actually
                are, and it is difficult to distinguish violet from blue.
              </li>
            </ul>
            <h3>Tritanopia and Tritanomaly</h3>
            <ul>
              <li>
                <strong>Tritanopia</strong>: This is a blue-yellow color
                blindness where the blue cones in the eye are missing or
                non-functional. As a result, blue appears as green, and yellow
                appears as violet or light gray.
              </li>
              <li>
                <strong>Tritanomaly</strong>: This is a milder form of
                blue-yellow color blindness where blue cones are present but
                dysfunctional. Blue appears greener, and it can be difficult to
                distinguish yellow and red from pink.
              </li>
            </ul>
            <p>
              This feature is made available via{" "}
              <a
                href="https://culorijs.org/"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
              >
                Culori
              </a>
            </p>
            <Accordion type="single" className="mt-0 border-b-0" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-1.5 text-sm">
                  References
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs">
                    Based on the work of Machado, Oliveira and Fernandes (2009),
                    using&nbsp;
                    <a href="https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html">
                      precomputed matrices
                    </a>
                    &nbsp;provided by the authors. References thanks to
                    the&nbsp;
                    <a href="http://colorspace.r-forge.r-project.org/reference/simulate_cvd.html">
                      <code>colorspace</code>&nbsp;package for R
                    </a>
                    .
                  </p>
                  <p className="text-xs">
                    G. M. Machado, M. M. Oliveira and L. A. F. Fernandes,&nbsp;
                    <em>
                      "A Physiologically-based Model for Simulation of Color
                      Vision Deficiency,"
                    </em>
                    &nbsp;in IEEE Transactions on Visualization and Computer
                    Graphics, vol. 15, no. 6, pp. 1291-1298, Nov.-Dec.
                    2009,&nbsp;
                    <a href="https://doi.ieeecomputersociety.org/10.1109/TVCG.2009.113">
                      doi: 10.1109/TVCG.2009.113
                    </a>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </div>
      <div className="mt-2 flex w-full items-center justify-between gap-4">
        <Label
          htmlFor="protanopia-slider"
          className="flex min-w-[7.5rem] items-center justify-start text-foreground/80"
        >
          <div className="mr-2 h-4 w-4 rounded-full bg-red-400 dark:bg-red-600" />
          Protanopia
        </Label>
        <Slider
          defaultValue={protanopia}
          max={0.8}
          step={0.1}
          min={0}
          id="protanopia-slider"
          onValueChange={setProtanopia}
        />
      </div>
      <div className="mt-2 flex w-full items-center justify-between gap-4">
        <Label
          htmlFor="protanomaly-slider"
          className="flex min-w-[7.5rem] items-center justify-start text-foreground/80"
        >
          <div className="mr-2 h-4 w-4 rounded-full bg-green-400 dark:bg-green-600" />
          Protanomaly
        </Label>
        <Slider
          defaultValue={deuteranopia}
          max={0.8}
          step={0.1}
          min={0}
          id="protanomaly-slider"
          onValueChange={setDeuteranopia}
        />
      </div>
      <div className="mt-2 flex w-full items-center justify-between gap-4">
        <Label
          htmlFor="deuteranopia-slider"
          className="flex min-w-[7.5rem] items-center justify-start text-foreground/80"
        >
          <div className="mr-2 h-4 w-4 rounded-full bg-blue-400 dark:bg-blue-600" />
          Deuteranopia
        </Label>
        <Slider
          defaultValue={tritanopia}
          max={0.8}
          step={0.1}
          min={0}
          id="deuteranopia-slider"
          onValueChange={setTritanopia}
        />
      </div>
    </div>
  );
}

export default CVDPlugin;
