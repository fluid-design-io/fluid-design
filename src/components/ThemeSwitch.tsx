import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

import clsxm from '../lib/clsxm';

export const ThemeSwitch = ({
  mode,
  handleModeChange,
}: {
  mode: 'light' | 'dark';
  handleModeChange: (mode: 'light' | 'dark') => void;
}) => {
  const buttonVariants: Variants = {
    initial: {},
    animate: {},
    exit: {},
    tap: {
      scale: 0.9,
    },
  };
  const iconVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.3,
      rotate: -120,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: {
      scale: 0.5,
      rotate: 90,
      opacity: 0,
    },
    tap: {
      rotate: 30,
    },
  };
  return (
    <div className='relative min-h-[30px] min-w-[30px]'>
      <AnimatePresence initial={false}>
        {mode === 'light' && (
          <motion.button
            animate='animate'
            className='focus-visible:borde-stone-400/80 focus-ring rounded border border-transparent p-1.5 focus-visible:border focus-visible:bg-stone-500/10 hocus:border-stone-400/30 hocus:bg-stone-400/10'
            exit='exit'
            initial='initial'
            key='dark-toggle'
            onClick={() => handleModeChange('dark')}
            variants={buttonVariants}
            whileTap='tap'
          >
            <div className='sr-only'>Toggle dark mode</div>
            <motion.div
              variants={iconVariants}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.2,
              }}
            >
              <MdDarkMode
                className={clsxm('h-4 w-4 fill-stone-600 transition-colors')}
              />
            </motion.div>
          </motion.button>
        )}
        {mode === 'dark' && (
          <motion.button
            animate='animate'
            className='focus-visible:borde-stone-400/80 focus-ring absolute inset-0 rounded border border-transparent p-1.5 focus-visible:border focus-visible:bg-stone-500/10 hocus:border-stone-400/30 hocus:bg-stone-400/10'
            exit='exit'
            initial='initial'
            key='light-toggle'
            onClick={() => handleModeChange('light')}
            variants={buttonVariants}
            whileTap='tap'
          >
            <div className='sr-only'>Toggle light mode</div>
            <motion.div
              variants={iconVariants}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.2,
              }}
            >
              <MdOutlineLightMode className={clsxm('h-4 w-4 fill-stone-100')} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
