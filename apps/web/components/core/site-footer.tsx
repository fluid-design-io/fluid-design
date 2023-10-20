import { Github, Youtube } from "lucide-react";
import app from "../../../../package.json";

const navigation = [
  {
    name: "GitHub",
    href: "https://github.com/fluid-design-io/fluid-design",
    icon: Github,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@fluiddesign",
    icon: Youtube,
  },
];

function SiteFooter() {
  return (
    <footer className="border-t border-border/30 bg-background-accent">
      <div className="mx-auto max-w-[120rem] px-6 py-4 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/50 hover:text-primary/80"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
          <a
            href="https://github.com/fluid-design-io/fluid-design/releases"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="text-[0.7rem] text-foreground/50 hover:underline"
            aria-label="Release Notes"
            title="Release Notes"
          >
            V {app.version}
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            Built by{" "}
            <a
              href="https://oliverpan.vercel.app"
              target="_blank"
              className="underline"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              title="Visit Oliver's portfolio"
            >
              Oliver Pan
            </a>
            {". "}
            The source code is on{" "}
            <a
              href="https://github.com/fluid-design-io/fluid-design"
              target="_blank"
              className="underline"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
