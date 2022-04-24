import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import notify from '@/lib/toast';
function ColorMainComponent({ color, type, onClick }) {
  const colorObj = tinycolor(color);
  return (
    <motion.div
      layoutId={`picker-${type}`}
      className='flex flex-row-reverse overflow-hidden rounded-xl shadow-2xl shadow-stone-400/20 sm:flex-col lg:flex-row-reverse xl:flex-col'
      style={{ backgroundColor: colorObj.toHexString() }}
    >
      <motion.button
        layoutId={`picker-area-${type}`}
        className='group flex w-full items-center justify-center sm:aspect-[2/1] lg:aspect-auto lg:h-full xl:aspect-square'
        onClick={() => onClick({ type })}
        aria-label={`Click to edit ${type} color`}
        title={`Click to edit ${type} color`}
      >
        <HiOutlineColorSwatch
          className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 md:h-8 md:w-8'
          style={{ color: colorObj.isDark() ? '#FFF' : '#000' }}
        />
      </motion.button>
      <div className='min-w-[8.125rem] flex-1 bg-white px-2 py-4 text-left dark:bg-stone-900 sm:w-full sm:px-4 xl:w-full'>
        <p className='text-xs font-semibold capitalize leading-none text-stone-800 dark:text-stone-100'>
          {type}
        </p>
        <CopyToClipboard
          text={colorObj.toHexString()}
          onCopy={() =>
            notify({
              style: {
                backgroundColor: colorObj.toHexString(),
                color: colorObj.isDark() ? '#FFF' : '#000',
              },
            })
          }
        >
          <button
            className='group flex w-full items-center justify-between pt-1 font-mono text-xs text-stone-500 transition-colors hover:text-primary-500 active:text-primary-800 dark:text-stone-400 dark:active:text-primary-200'
            aria-label={`Click to copy ${colorObj.toHexString()}`}
            title={`Click to copy ${colorObj.toHexString()}`}
          >
            {colorObj.toHexString()}
            <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100' />
          </button>
        </CopyToClipboard>
      </div>
    </motion.div>
  );
}
export default ColorMainComponent;
