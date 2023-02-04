import { Button } from '@fluid-design/fluid-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

import clsxm from '@/lib/clsxm';
import { useTheme } from '@/lib/useTheme';

export const ThemeSwitch = (props) => {
  const { mode, toggleMode } = useTheme();
  const buttonVariants = {
    initial: {},
    animate: {},
    exit: {},
    tap: {
      scale: 0.9,
    },
  };
  const iconVariants = {
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
    <div
      className={clsxm('relative min-h-[30px] min-w-[30px]', props?.className)}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        <Button
          as={motion.button}
          animate='animate'
          exit='exit'
          initial='initial'
          key='light-toggle'
          onClick={toggleMode}
          variants={buttonVariants}
          aria-label='Toggle dark mode'
          whileTap='tap'
          color='gray'
          weight='clear'
          iconOnly
        >
          {mode === 'dark' && (
            <motion.div
              variants={iconVariants}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.2,
              }}
            >
              <MdOutlineLightMode className={clsxm('h-4 w-4 fill-gray-100')} />
            </motion.div>
          )}
          {mode === 'light' && (
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
                className={clsxm(
                  'h-4 w-4 fill-gray-600 transition-colors dark:fill-gray-100'
                )}
              />
            </motion.div>
          )}
        </Button>
      </AnimatePresence>
    </div>
  );
};
