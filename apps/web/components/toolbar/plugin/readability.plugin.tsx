import { useToolStore } from '@/store/toolStore'
import { Label } from '@ui/components/ui/label'
import { ScrollArea } from '@ui/components/ui/scroll-area'
import { Switch } from '@ui/components/ui/switch'
import { Contrast } from 'lucide-react'
import { Fragment } from 'react'

function ReadabilityPlugin() {
  const { setShowReadability, showReadability } = useToolStore()
  return (
    <Fragment>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 w-full bg-gradient-to-t from-transparent to-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 w-full bg-gradient-to-b from-transparent to-background" />
        <ScrollArea className="h-[40svh] w-full rounded lg:h-[max(calc(80vh-6rem),10rem)]">
          <div className="prose prose-sm p-4 dark:prose-invert">
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="rounded-2xl bg-muted p-4">
                <Contrast className="size-12 text-muted-foreground" />
              </div>
              <h2>Contrast Ratio Guide</h2>
              <p>
                The border styles around the color values indicate their contrast ratios, as defined by the{' '}
                <a
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  W3C Web Content Accessibility Guidelines
                </a>
              </p>
            </div>
            <ul className="not-prose divide-y divide-border/30 overflow-hidden rounded-md">
              <li className="list-none bg-white/50 px-4 py-4 dark:bg-muted/50">
                <div className="mb-1.5">
                  <div className="-my-0.5 rounded border-border px-1 py-0.5 ring-1 ring-inset ring-primary ring-offset-2 ring-offset-border">
                    Double Border
                  </div>
                </div>
                <p>
                  <strong>Complies with Level AAA</strong>
                </p>
                <p>(contrast ratio of 7:1 or higher)</p>
              </li>
              <li className="list-none bg-white/50 px-4 py-4 dark:bg-muted/50">
                <div className="mb-1.5">
                  <div className="-my-0.5 rounded border border-accent-foreground px-1 py-0.5">Single Border</div>
                </div>
                <p>
                  <strong>Complies with Level AA</strong>
                </p>
                <p>(contrast ratio between 4.5:1 and 6.9:1)</p>
              </li>
              <li className="list-none bg-white/50 px-4 py-4 dark:bg-muted/50">
                <div className="mb-1.5">
                  <div className="-my-0.5 rounded border border-dashed px-1 py-0.5">Dashed Border</div>
                </div>
                <p>
                  <strong>Suitable for large text</strong>
                </p>
                <p>(contrast ratio between 3:1 and 4.4:1).</p>
              </li>
              <li className="list-none bg-white/50 px-4 py-4 dark:bg-muted/50">
                <div>No Border</div>
                <p>
                  <strong>Not recommended</strong>
                </p>
                <p>(contrast ratio below 3:1).</p>
              </li>
            </ul>
            <p>
              Note: The left number represents the contrast ratio of <strong>current color</strong> to{' '}
              <strong>foreground</strong> color, and the right number represents the contrast ratio of{' '}
              <strong>current color</strong> to <strong>background</strong> color.
            </p>
          </div>
        </ScrollArea>
      </div>
      <div className="mt-2 flex w-full items-center justify-between space-x-1.5 px-4">
        <Label className="text-foreground/80" htmlFor="toggle-readability">
          Toggle Readability
        </Label>
        <Switch
          aria-label="Toggle Readability"
          checked={showReadability}
          id="toggle-readability"
          onCheckedChange={setShowReadability}
        />
      </div>
    </Fragment>
  )
}

export default ReadabilityPlugin
