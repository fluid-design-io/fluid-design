import { Button } from '@ui/components/ui/button'
import { cn } from '@ui/lib/utils'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

import FluidColorLogo from '../svg/fluid-color'
import SiteHeaderTabs from './site-header-tabs'

function SiteHeader() {
  return (
    <div className="site-padding relative z-20 mx-auto grid w-full max-w-[120rem] grid-cols-6 items-center justify-between py-2">
      <Link aria-label="Fluid Colors" className="flex items-center" href="/">
        <FluidColorLogo className="h-6 w-6" />
        <span
          className={cn(
            'transition-bg ml-2 hidden font-light tracking-wide md:block',
            'bg-gradient-to-r from-[hsl(var(--primary-500))] to-[hsl(var(--primary-700))] bg-clip-text text-transparent transition-colors dark:from-[hsl(var(--primary-600))] dark:to-[hsl(var(--primary-400))]'
          )}
        >
          Fluid Colors
        </span>
      </Link>
      <div className="col-span-4 flex items-center justify-center">
        <SiteHeaderTabs />
      </div>
      <div className="flex items-center justify-end">
        <Button asChild size="icon" variant="ghost">
          <Link
            aria-label="Github"
            href="https://github.com/fluid-design-io/fluid-design"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Fragment>
              <div className="sr-only">Github</div>
              <GithubIcon className="h-5 w-5 text-muted-foreground" />
            </Fragment>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default SiteHeader
