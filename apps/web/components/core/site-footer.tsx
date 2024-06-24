import Link from 'next/link'
import { cn } from 'ui/lib/utils'

import app from '../../../../package.json'

function SiteFooter() {
  return (
    <footer
      className={cn(
        'transition-bg border-t border-border/30 text-foreground/60 contrast-more:text-foreground/85',
        'pb-[calc(8rem+env(safe-area-inset-bottom))] lg:pb-0'
      )}
    >
      <div className="mx-auto max-w-[120rem] px-6 py-4 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link className="text-xs underline" href="/how">
            How it works
          </Link>

          <a
            aria-label="Release Notes"
            className="text-[0.7rem] hover:underline"
            href="https://github.com/fluid-design-io/fluid-design/releases"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            target="_blank"
            title="Release Notes"
          >
            V {app.version}
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5">
            Built by{' '}
            <a
              className="underline"
              href="https://oliverpan.vercel.app"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              target="_blank"
              title="Visit Oliver's portfolio"
            >
              Oliver
            </a>
            {'. '}
            The source code is on{' '}
            <a
              className="underline"
              href="https://github.com/fluid-design-io/fluid-design"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
