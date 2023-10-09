/**
 * A staggered animation for the text with blur and opacity
 * @param shouldReduceMotion
 * @param animationDelay
 * @param options
 * @returns
 */
export const textAnimation = (
  shouldReduceMotion: boolean,
  animationDelay: number,
  options: {
    performance: "low" | "medium" | "high";
  } = { performance: "high" },
) => ({
  initial: shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        ...(options.performance === "high" && {
          filter: "blur(0.35rem)",
        }),
      },
  animate: shouldReduceMotion
    ? { opacity: 1, transition: { delay: 0.2 } }
    : {
        opacity: 1,
        ...(options.performance === "high" && {
          filter: "blur(0rem)",
        }),
        transition: {
          delay: animationDelay,
          duration: 0.44 + animationDelay * 1.2,
        },
      },
  exit: shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        ...(options.performance === "high" && {
          filter: "blur(0.35rem)",
        }),
        transition: { delay: animationDelay * 0.8 },
      },
  // viewport: { once: true },
});
