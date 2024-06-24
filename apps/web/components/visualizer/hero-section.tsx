import { cn } from '@ui/lib/utils'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0W13RkH
 */
export default function VisHeroSection() {
  return (
    <section className="relative isolate w-full bg-background py-12 transition-colors md:py-24 lg:py-32 xl:py-40">
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute bg-gradient-to-b opacity-10 mix-blend-normal blur-[120px] dark:opacity-[0.15]',
          'left-1/2 top-[10svh] -translate-x-1/2 sm:top-1/2 sm:-translate-y-2/3',
          'h-[145svh] w-[75vw]',
          'sm:h-[50vw] sm:w-[50vw]',
          'sm:w-[33vw] lg:h-[33vw]',
          'from-[hsl(var(--primary-600))] to-[hsl(var(--accent-800))]',
          'dark:from-[hsl(var(--primary-600))] dark:to-[hsl(var(--accent-400))]',
          'transition-all'
        )}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="mb-12 space-y-3">
              <h1 className="bg-gradient-to-r from-[hsl(var(--primary-500))] to-[hsl(var(--primary-800))] bg-clip-text text-3xl font-bold tracking-tighter text-transparent transition-colors dark:from-[hsl(var(--primary-700))] dark:to-[hsl(var(--primary-300))] sm:text-5xl xl:text-6xl/none">
                Discover Our Unique Features
              </h1>
              <p className="mx-auto max-w-[600px] text-[hsl(var(--primary-700))] transition-colors dark:text-[hsl(var(--primary-200))] md:text-xl">
                Our features are designed to enhance your productivity and streamline your workflow.
              </p>
            </div>
            <div className="mx-auto w-full max-w-full space-y-4">
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow">
                  <div className="rounded-full border border-border/50 bg-background bg-opacity-50 p-2">
                    <svg
                      className="h-6 w-6 p-1 text-foreground opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground/80">Smart Inbox</h2>
                  <p className="w-4/5 text-muted-foreground sm:w-3/4">
                    Our Smart Inbox feature helps you manage your emails efficiently by prioritizing important emails.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow">
                  <div className="rounded-full border border-border/50 p-2">
                    <svg
                      className="h-6 w-6 p-1 text-foreground opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m8 6 4-4 4 4" />
                      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                      <path d="m20 22-5-5" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground/80">Seamless Integration</h2>
                  <p className="w-4/5 text-muted-foreground sm:w-3/4">
                    Seamless Integration allows you to connect with your favorite apps and services without leaving your
                    inbox.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow">
                  <div className="rounded-full border border-border/50 p-2">
                    <svg
                      className="h-6 w-6 p-1 text-foreground opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground/80">Advanced Customization</h2>
                  <p className="w-4/5 text-muted-foreground sm:w-3/4">
                    With Advanced Customization, you can personalize your email client to suit your preferences and work
                    style.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow">
                  <div className="rounded-full border border-border/50 bg-background bg-opacity-50 p-2">
                    <svg
                      className="h-6 w-6 p-1 text-foreground opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground/80">Powerful Search</h2>
                  <p className="w-4/5 text-muted-foreground sm:w-3/4">
                    Our Powerful Search feature allows you to find any email, contact, or file in seconds.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow">
                  <div className="rounded-full border border-border/50 p-2">
                    <svg
                      className="h-6 w-6 p-1 text-foreground opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground/80">Reliable Security</h2>
                  <p className="w-4/5 text-muted-foreground sm:w-3/4">
                    With Reliable Security, your data is always safe and protected.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow">
                  <div className="rounded-full border border-border/50 p-2">
                    <svg
                      className="h-6 w-6 p-1 text-foreground opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m8 6 4-4 4 4" />
                      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                      <path d="m20 22-5-5" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground/80">Easy Collaboration</h2>
                  <p className="w-4/5 text-muted-foreground sm:w-3/4">
                    Easy Collaboration allows you to share and edit documents with your team in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
