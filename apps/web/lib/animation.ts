/**
 * A staggered animation for the text with blur and opacity
 * @param shouldReduceMotion
 * @param animationDelay
 * @param options
 * @returns
 */
export const textAnimation = (shouldReduceMotion: boolean, animationDelay: number) => ({
  animate: shouldReduceMotion
    ? { opacity: 1, transition: { delay: 0.2 } }
    : {
        filter: 'blur(0rem)',
        opacity: 1,

        transition: {
          delay: animationDelay,
          duration: 0.44 + animationDelay * 1.2,
        },
      },
  exit: shouldReduceMotion
    ? { opacity: 0 }
    : {
        filter: 'blur(0.35rem)',
        opacity: 0,
        transition: { delay: animationDelay * 0.8 },
      },
  initial: shouldReduceMotion
    ? { opacity: 0 }
    : {
        filter: 'blur(0.35rem)',
        opacity: 0,
      },
  // viewport: { once: true },
})
