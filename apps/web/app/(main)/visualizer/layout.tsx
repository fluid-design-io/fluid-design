import ColorPickerFab from '@/components/core/color-picker-fab'
import GraphicVisualizer from '@/components/graphic-visualizer'
import { Suspense } from 'react'
import { Card } from 'ui/components/ui/card'

import VisualizerNav from './visualizer-nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-padding mx-auto mt-6 flex w-full max-w-[120rem] flex-1 flex-col pb-20 sm:pb-24 md:mt-8 lg:mt-10">
      <section>
        <Card className="relative flex min-h-[max(80vh,960px)] flex-1 flex-col overflow-hidden">
          <Suspense fallback={null}>
            <VisualizerNav />
          </Suspense>

          <div className="flex h-full w-full flex-1 flex-col items-stretch justify-center">{children}</div>
        </Card>
      </section>
      <section>
        <GraphicVisualizer />
      </section>
      <ColorPickerFab />
    </div>
  )
}
