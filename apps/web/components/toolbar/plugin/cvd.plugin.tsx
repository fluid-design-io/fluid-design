import EyeCVD from '@/components/svg/eye-cvd'
import { useColorStore } from '@/context/color-store-provider'
import { BaseColorTypes } from '@/types/app'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/components/ui/accordion'
import { Label } from '@ui/components/ui/label'
import { ScrollArea } from '@ui/components/ui/scroll-area'
import { Slider } from '@ui/components/ui/slider'
import { filterDeficiencyDeuter, filterDeficiencyProt, filterDeficiencyTrit, formatHex, hsl, parse } from 'culori'
import { produce } from 'immer'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type PluginCvdState = {
  deuteranopia: [number]
  isOn: () => boolean
  protanopia: [number]
  setDeuteranopia: (value: [number]) => void
  setProtanopia: (value: [number]) => void
  setTritanopia: (value: [number]) => void
  tritanopia: [number]
}

export const usePluginCvdStore = create<PluginCvdState>()(
  devtools((set, get) => ({
    deuteranopia: [0],
    isOn: () => get().deuteranopia[0] > 0 || get().protanopia[0] > 0 || get().tritanopia[0] > 0,
    protanopia: [0],
    setDeuteranopia: (value) =>
      set(
        produce((state) => {
          state.deuteranopia = value
        })
      ),
    setProtanopia: (value) =>
      set(
        produce((state) => {
          state.protanopia = value
        })
      ),
    setTritanopia: (value) =>
      set(
        produce((state) => {
          state.tritanopia = value
        })
      ),
    tritanopia: [0],
  }))
)

function CVDPlugin() {
  const {
    colors: { baseColors, colorPalettes },
    setColors,
  } = useColorStore((s) => s)
  const { deuteranopia, protanopia, setDeuteranopia, setProtanopia, setTritanopia, tritanopia } = usePluginCvdStore()
  const [isMounted, setIsMounted] = useState(false)
  // make a copy of the colorPalettes object
  const [colorPalettesCopy] = useState({ ...colorPalettes })

  const handleCalculateCvd = () => {
    const newColorPalettes = Object.keys(colorPalettesCopy).reduce((acc, key) => {
      const newColorPalette = colorPalettesCopy[key as BaseColorTypes].map((palette, index) => {
        const color = palette!.color
        const rgb = parse(color)
        if (!rgb) return
        let newColor = filterDeficiencyProt(protanopia[0])(rgb)
        newColor = filterDeficiencyDeuter(deuteranopia[0])(newColor)
        newColor = filterDeficiencyTrit(tritanopia[0])(newColor)
        const hslColor = hsl(newColor)
        const hex = formatHex(newColor)
        return {
          ...colorPalettesCopy[key as BaseColorTypes][index],
          color: hex,
          raw: {
            a: hslColor?.alpha ?? 1,
            h: hslColor.h,
            l: hslColor.l,
            s: hslColor.s,
          },
        }
      })
      acc[key] = newColorPalette
      return acc
    }, {} as any)

    // TODO: Apply to baseColors?
    /* const newBaseColors = Object.keys(baseColors).reduce((acc, key: any) => {
      const color = baseColors[key as keyof ColorOptions]
      const rgb = parse(colorHelper.toHex(color))
      if (!rgb) return
      let newColor = filterDeficiencyProt(protanopia[0])(rgb)
      newColor = filterDeficiencyDeuter(deuteranopia[0])(newColor)
      newColor = filterDeficiencyTrit(tritanopia[0])(newColor)
      const hslColor = hsl(newColor)
      acc[key] = {
        a: hslColor?.alpha ?? 1,
        h: hslColor.h,
        l: hslColor.l,
        s: hslColor.s,
      }
      return acc
    }, {} as any) */
    setColors({ baseColors, colorPalettes: newColorPalettes })
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!isMounted) {
        setIsMounted(true)
        return
      }
      handleCalculateCvd()
    }, 300) // Adjust the debounce delay as needed (in milliseconds)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [protanopia, deuteranopia, tritanopia])

  return (
    <div className="w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 w-full bg-gradient-to-t from-transparent to-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 w-full bg-gradient-to-b from-transparent to-background" />
        <ScrollArea className="relative h-[40svh] w-full overflow-y-auto rounded lg:h-[max(calc(80vh-8rem),10rem)]">
          <div className="prose prose-sm p-4 dark:prose-invert">
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="rounded-2xl bg-muted p-4">
                <EyeCVD className="size-12 text-muted-foreground" />
              </div>
              <h2>CVD (Color Vision Deficiency)</h2>
              <p>
                Adjust the sliders to simulate color vision deficiencies. This feature is useful for designing websites
                and applications that are accessible to users with color vision deficiencies.
              </p>
            </div>
            <h3>Protanopia and Protanomaly</h3>
            <ul>
              <li>
                <strong>Protanopia</strong>: This is a form of red-green color blindness where the red cones in the eye
                are absent. As a result, red appears as black, and certain shades of orange, yellow, and green may
                appear as yellow.
              </li>
              <li>
                <strong>Protanomaly</strong>: This is a milder form of red-green color blindness compared to Protanopia.
                In this condition, red cones are present but do not function properly. Red, orange, and yellow may
                appear greener than they actually are.
              </li>
            </ul>
            <h3>Deuteranopia and Deuteranomaly</h3>
            <ul>
              <li>
                <strong>Deuteranopia</strong>: This is another form of red-green color blindness where the green cones
                in the eye are absent. As a result, green appears as beige, and red may appear as brown.
              </li>
              <li>
                <strong>Deuteranomaly</strong>: This is the most common form of red-green color blindness. Green cones
                are present but are dysfunctional. Yellow and green appear redder than they actually are, and it is
                difficult to distinguish violet from blue.
              </li>
            </ul>
            <h3>Tritanopia and Tritanomaly</h3>
            <ul>
              <li>
                <strong>Tritanopia</strong>: This is a blue-yellow color blindness where the blue cones in the eye are
                missing or non-functional. As a result, blue appears as green, and yellow appears as violet or light
                gray.
              </li>
              <li>
                <strong>Tritanomaly</strong>: This is a milder form of blue-yellow color blindness where blue cones are
                present but dysfunctional. Blue appears greener, and it can be difficult to distinguish yellow and red
                from pink.
              </li>
            </ul>
            <p>
              This feature is made available via{' '}
              <a href="https://culorijs.org/" referrerPolicy="no-referrer" rel="noopener noreferrer" target="_blank">
                Culori
              </a>
            </p>
            <Accordion className="mt-0 border-b-0" collapsible type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-1.5 text-sm">References</AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs">
                    Based on the work of Machado, Oliveira and Fernandes (2009), using&nbsp;
                    <a href="https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html">
                      precomputed matrices
                    </a>
                    &nbsp;provided by the authors. References thanks to the&nbsp;
                    <a href="http://colorspace.r-forge.r-project.org/reference/simulate_cvd.html">
                      <code>colorspace</code>&nbsp;package for R
                    </a>
                    .
                  </p>
                  <p className="text-xs">
                    G. M. Machado, M. M. Oliveira and L. A. F. Fernandes,&nbsp;
                    <em>&quot;A Physiologically-based Model for Simulation of Color Vision Deficiency,&quot;</em>
                    &nbsp;in IEEE Transactions on Visualization and Computer Graphics, vol. 15, no. 6, pp. 1291-1298,
                    Nov.-Dec. 2009,&nbsp;
                    <a href="https://doi.ieeecomputersociety.org/10.1109/TVCG.2009.113">doi: 10.1109/TVCG.2009.113</a>.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </div>
      <div className="mt-2 flex w-full items-center justify-between gap-4 px-4">
        <Label
          className="flex min-w-[7.5rem] items-center justify-start text-foreground/80"
          htmlFor="protanopia-slider"
        >
          <div className="mr-2 h-4 w-4 rounded-full bg-red-400 dark:bg-red-600" />
          Protanopia
        </Label>
        <Slider
          defaultValue={protanopia}
          id="protanopia-slider"
          max={0.8}
          min={0}
          onValueChange={setProtanopia}
          step={0.1}
        />
      </div>
      <div className="mt-2 flex w-full items-center justify-between gap-4 px-4">
        <Label
          className="flex min-w-[7.5rem] items-center justify-start text-foreground/80"
          htmlFor="protanomaly-slider"
        >
          <div className="mr-2 h-4 w-4 rounded-full bg-green-400 dark:bg-green-600" />
          Protanomaly
        </Label>
        <Slider
          defaultValue={deuteranopia}
          id="protanomaly-slider"
          max={0.8}
          min={0}
          onValueChange={setDeuteranopia}
          step={0.1}
        />
      </div>
      <div className="mt-2 flex w-full items-center justify-between gap-4 px-4">
        <Label
          className="flex min-w-[7.5rem] items-center justify-start text-foreground/80"
          htmlFor="deuteranopia-slider"
        >
          <div className="mr-2 h-4 w-4 rounded-full bg-blue-400 dark:bg-blue-600" />
          Deuteranopia
        </Label>
        <Slider
          defaultValue={tritanopia}
          id="deuteranopia-slider"
          max={0.8}
          min={0}
          onValueChange={setTritanopia}
          step={0.1}
        />
      </div>
    </div>
  )
}

export default CVDPlugin
