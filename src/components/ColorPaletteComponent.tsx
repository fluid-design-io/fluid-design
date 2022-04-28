import chroma from 'chroma-js';
import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import CopyButton from './CopyButton';

function ColorPaletteComponent({ color, type }) {
  // create an array total of 10 colors, based on colorIndex index, and map over it
  const colors = Array.from({ length: 10 }, (_, i) => {
    const colorObj = chroma(color)
      .set('lch.l', (9 - i) * 9 + 10)
      .hex();

    return (
      <ColorPalette
        key={`${type}.${i}.${colorObj}`}
        color={colorObj}
        colorIndex={i === 0 ? 50 : i * 100}
      />
    );
  });

  return (
    <div className='w-full'>
      {/* <h3 className='pb-4 text-left font-semibold capitalize text-stone-700'>
        {type}
      </h3> */}
      <div className='grid min-w-0 flex-1 grid-cols-5 gap-x-1 gap-y-3 sm:gap-x-4 xl:grid-cols-10 xl:gap-x-2'>
        {colors}
      </div>
    </div>
  );
}

const ColorPalette = ({ color, colorIndex }) => {
  return (
    <div className='space-y-1.5'>
      <CopyButton color={color}>
        <button
          className='group flex h-10 w-full items-center justify-center rounded-md shadow-sm shadow-stone-400/10 transition-all duration-200 hover:scale-105 active:scale-100 dark:border dark:border-white/10'
          style={{
            backgroundColor: color,
            color: tinycolor(color).isDark() ? '#FFF' : '#000',
          }}
          aria-label={`Click to copy ${tinycolor(color).toHexString()}`}
          title={`Click to copy ${tinycolor(color).toHexString()}`}
        >
          <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100' />
        </button>
      </CopyButton>
      <div className='px-0.5 text-left text-xs lg:flex lg:justify-between lg:space-x-2 xl:block xl:space-x-0'>
        <div className='w-6 font-medium text-slate-900 dark:text-white xl:w-full'>
          {colorIndex}
        </div>
        <div className='font-mono lowercase text-slate-500 dark:text-slate-400'>
          {color}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteComponent;
