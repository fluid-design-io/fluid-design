import { SwatchIcon } from '@heroicons/react/24/solid';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import { useColorMode } from '@/lib/AppContext';
import clsxm from '@/lib/clsxm';
import { useThemeMode } from '@/lib/ThemeContext';
import { translateColor } from '@/lib/translateColor';

import CopyButton from './CopyButton';
function ColorMainComponent({ color, type, onClick }) {
  const [mode] = useThemeMode(true);
  const [colorMode] = useColorMode();
  if (!color) return null;
  const colorObj = chroma(color);
  const { h, s, l } = tinycolor(color).toHsl();
  const convertedColor = translateColor({
    color: colorObj,
    mode: colorMode,
  });
  return (
    <motion.div
      layoutId={`picker-${type}`}
      className='flex flex-row-reverse overflow-hidden rounded-xl transition-colors sm:flex-col lg:flex-row-reverse xl:flex-col'
      style={{
        backgroundColor: convertedColor,
        boxShadow: `0 8px 28px -8px hsl(${h},${s * 100}%,${
          mode === 'dark' ? 17 : 73
        }%, ${mode === 'dark' ? 0.8 : 0.3}), 0 36px 64px -8px hsl(${h},${
          s * 100
        }%,${mode === 'dark' ? 10 : 80}%, ${mode === 'dark' ? 0.8 : 0.3})`,
      }}
    >
      <motion.button
        layoutId={`picker-area-${type}`}
        className={clsxm(
          'group flex w-full items-center justify-center rounded-t-xl transition sm:aspect-[2/1] lg:aspect-auto lg:h-full xl:aspect-square',
          'focus-visible:outline-none focus-visible:ring focus-visible:ring-inset focus-visible:ring-white focus-visible:ring-offset-2',
          type === 'primary' && 'focus-visible:ring-offset-primary-500',
          type === 'secondary' && 'focus-visible:ring-offset-secondary-500',
          type === 'tertiary' && 'focus-visible:ring-offset-tertiary-500'
        )}
        onClick={() => onClick({ type })}
        aria-label={`Click to edit ${type} color`}
        title={`Click to edit ${type} color`}
      >
        <SwatchIcon
          className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 md:h-8 md:w-8'
          style={{ color: tinycolor(color).isDark() ? '#FFF' : '#000' }}
        />
      </motion.button>
      <div className='ease-in-outtext-start min-w-[8.125rem] flex-shrink-0 bg-white px-2  py-10 ring ring-inset ring-white ring-offset-1 ring-offset-white transition-all duration-1000 dark:bg-stone-900 dark:ring-stone-900 dark:ring-offset-stone-900 sm:w-full sm:flex-1 sm:py-4 sm:px-4 xl:w-full'>
        <p className='text-start text-xs font-semibold capitalize leading-none text-stone-800 transition-colors duration-1000 ease-in-out dark:text-stone-100'>
          {type}
        </p>
        <CopyButton color={convertedColor}>
          <button
            className='focus-visible:app-focus-ring group mt-1 flex w-full items-center justify-between break-all rounded-full text-start font-mono text-xs text-stone-500 transition duration-1000 ease-in-out hover:text-primary-500 active:text-primary-800 dark:text-stone-400 dark:active:text-primary-200'
            aria-label={`Click to copy ${convertedColor}`}
            title={`Click to copy ${convertedColor}`}
          >
            {convertedColor}
            <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100' />
          </button>
        </CopyButton>
      </div>
    </motion.div>
  );
}
export default ColorMainComponent;
