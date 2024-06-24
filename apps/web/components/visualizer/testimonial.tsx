import { cn } from "@ui/lib/utils";

import PeakVentureLogo from "../svg/peak-venture-logo";

export default function VisTestimonials() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-border/10 bg-muted px-6 py-20 shadow-xl shadow-primary/5 sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0"
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1216&q=80"
          />
          <div className="absolute inset-0 bg-muted/90 mix-blend-screen dark:mix-blend-multiply" />
          <div
            aria-hidden="true"
            className="absolute -left-80 -top-56 transform-gpu blur-3xl"
          >
            <div
              className={cn(
                "aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r opacity-[0.15] dark:opacity-[0.35]",
                "from-[hsl(var(--primary-600))] to-[hsl(var(--accent-800))]",
                "dark:from-[hsl(var(--primary-600))] dark:to-[hsl(var(--accent-400))]",
              )}
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div
            aria-hidden="true"
            className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
          >
            <div
              className={cn(
                "aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r opacity-10 dark:opacity-20",
                "from-[hsl(var(--primary-600))] to-[hsl(var(--accent-800))]",
                "dark:from-[hsl(var(--primary-600))] dark:to-[hsl(var(--accent-400))]",
              )}
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-2xl lg:mx-0">
            <PeakVentureLogo className="h-12 w-auto" />
            <figure>
              <blockquote className="mt-6 text-lg font-semibold text-foreground sm:text-xl sm:leading-8">
                <p>
                  “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  expedita voluptas culpa sapiente alias molestiae. Numquam
                  corrupti in laborum sed rerum et corporis.”
                </p>
              </blockquote>
              <figcaption className="mt-6 text-base text-foreground">
                <div className="font-semibold">John Doe</div>
                <div className="mt-1">CEO of PeakVenture</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
