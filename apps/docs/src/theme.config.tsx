// @ts-nocheck

import { DocsThemeConfig, useConfig as configHook } from "nextra-theme-docs";
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 128 128"
        width={24}
        height={24}
      >
        <path
          className="fill-primary stroke-border"
          strokeWidth={4}
          d="M61.203 49.317c-.446-.595-.706-1.35-.843-2.188l-.008-.052c-.044-.331.035-1.04.286-2.05.233-.937.565-1.945.87-2.777.145-.332.277-.672.395-1.018l.001-.002.015-.045c.456-1.348.702-2.79.702-4.287 0-7.4-5.999-13.398-13.398-13.398-7.4 0-13.398 5.998-13.398 13.398 0 5.7 3.561 10.567 8.575 12.502l.088.034.002.001c.63.238 1.282.43 1.953.571 1.455.49 2.874 1.116 3.595 1.711.144.154.283.31.413.466.657.787 1.018 1.484 1.065 2.125.042.56-.135 1.37-1.233 2.469-.363.363-1.19.671-2.691.642-1.432-.027-3.16-.357-4.92-.868a33.466 33.466 0 0 1-4.848-1.828c-1.401-.664-2.285-1.233-2.602-1.536a8.19 8.19 0 0 0-.087-.1l-.002-.004-.048-.053a7.21 7.21 0 1 0-5.374 12.018h.19l.01-.002c1-.028 1.95-.26 2.811-.655 2.941-.614 6.583-1.169 9.788-1.23 1.637-.03 3.1.07 4.275.328 1.205.266 1.915.658 2.269 1.056.71.799.866 1.482.82 2.053-.05.624-.36 1.31-.92 2.01-.553.692-1.283 1.311-2 1.779-.662.43-1.206.665-1.502.748a7.21 7.21 0 1 0 6.385 10.884c.33-.4.631-.819.893-1.18l.185-.256c.345-.474.616-.816.884-1.067.252-.236.448-.337.627-.38.176-.041.474-.058.985.112a.728.728 0 0 1 .506.504c.113.329.157.915-.08 1.806-.472 1.763-1.935 4.268-4.798 7.108a9.15 9.15 0 0 0-1.483 1.337l-.005.004-.082.094a9.087 9.087 0 0 0-2.222 5.964 9.115 9.115 0 0 0 18.229 0c0-2.105-.39-3.452-1.014-4.463l-.002-.004-.002-.002-.01-.016c-.13-.212-.344-.592-.539-1.015-.203-.441-.339-.83-.383-1.088-.125-.753-.233-1.393-.328-1.947-.468-2.761-.578-3.404-.577-5.421 0-.969.379-1.562.896-1.917.561-.386 1.454-.6 2.592-.411.157.026.457.164.854.722.39.546.75 1.328 1.064 2.263.612 1.818.953 3.906 1.112 5.153a7.21 7.21 0 1 0 10.317-6.608 22.571 22.571 0 0 0-1.385-.777l-.065-.035a33.404 33.404 0 0 1-1.708-.953c-.556-.34-1.02-.67-1.357-.988-.351-.331-.448-.542-.468-.62l-.04-.16-.073-.148c-.488-.974-.126-3.773 3.267-4.527 1.73-.385 2.91.002 3.742.521.774.484 1.287 1.102 1.692 1.601 1.488 4.323 5.59 7.432 10.421 7.432 6.085 0 11.018-4.933 11.018-11.018 0-6.086-4.933-11.018-11.018-11.018-1.564 0-3.056.326-4.408.917l-.065.028-.002.002c-.308.137-.61.288-.902.451a54.022 54.022 0 0 1-3.285 1.352c-2.106.146-3.887-.363-4.975-1.342-1.036-.933-1.72-2.544-1.083-5.279.443-1.901 1.684-3.8 3.191-5.443 1.44-1.568 3.014-2.784 4.071-3.425a9.118 9.118 0 0 0 6.103-8.605 9.114 9.114 0 1 0-17.967 2.178c.318 2.672-.022 5.6-1.472 7.501-1.329 1.743-3.946 3.054-9.3 1.715-1.105-.276-1.76-.785-2.185-1.354Z"
        />
      </svg>
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>
        Fluid Colors Docs
      </span>
    </>
  ),
  project: {
    link: "https://colors.fluid-design.io",
  },
  color: {
    hue: 191,
    saturation: 70,
  },
  head: (): any => {
    const { frontMatter } = configHook() as any;
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content={frontMatter.title || "Fluid Colors"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://colors.fluid-design.io" />
        <meta property="og:image" content="/og.png" />
        <meta
          property="og:description"
          content={frontMatter.description || "Fluid Colors Docs"}
        />
        <link rel="icon" href="/favicon.ico" />
      </>
    );
  },
  components: {
    // h1: ({ children }) => <h1 style={{ color: "tomato" }}>{children}</h1>,
    Image: ({
      srcLight,
      srcDark,
      alt,
      ...props
    }: {
      srcLight: string;
      srcDark: string;
      alt: string;
    }) => (
      <figure className="_relative _mt-6 first:_mt-0">
        <Image
          src={srcLight}
          alt={alt}
          className="block _rounded-md border _border-gray-300 dark:_border-neutral-700 dark:hidden"
          quality={90}
          {...props}
        />
        <Image
          src={srcDark}
          alt={alt}
          className="_rounded-md border _border-gray-300 dark:_border-neutral-700 hidden dark:block"
          quality={90}
          {...props}
        />
      </figure>
    ),
  },
  docsRepositoryBase:
    "https://github.com/fluid-design-io/fluid-design/tree/main/apps/docs",
  footer: {
    content: (
      <span>
        {new Date().getFullYear()} ©{" "}
        <a
          href="https://colors.fluid-design.io"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
        >
          Fluid Colors
        </a>
        .
      </span>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Fluid Colors Docs",
    };
  },
};

export default config;
