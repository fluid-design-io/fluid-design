import chroma from 'chroma-js';
import { useEffect } from 'react';
import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import { BaseColors, useColorMode, useColorValues } from '@/lib/AppContext';
import {
  calculateSaturation,
  getColorLuminescence,
} from '@/lib/colorCalculator';
import { translateColor } from '@/lib/translateColor';

import CopyButton from './CopyButton';

function ColorPaletteComponent({
  color,
  type,
}: {
  color: string;
  type: keyof BaseColors | 'gray';
}) {
  const [colorMode] = useColorMode();
  const [colorValues, setColorValues] = useColorValues();
  // create an array total of 10 colors, based on colorIndex index, and map over it
  const step = (i) => (i === 0 ? 50 : i * 100);

  const colors = (color) =>
    Array.from({ length: 10 }, (_, i) => {
      const rawColor = chroma(color);
      let calculatedColor = rawColor;
      if (type === 'gray') {
        calculatedColor = rawColor.set('lch.l', (9 - i) * 9.85 + 8.5);
      } else {
        let hue = Math.round(rawColor.hsl()[0] * 10) / 10;
        // if hue is Nan, set it to 0
        if (isNaN(hue)) {
          calculatedColor = rawColor;
        } else {
          hue === 0 ? (hue = 359.9) : hue;
          hue === 360 ? (hue = 0.1) : hue;
          const saturation = calculateSaturation(hue, 10 - i);
          const luminescence = getColorLuminescence(hue, 10 - i);
          const colorString = `hsl(${hue}, ${saturation}%, ${luminescence}%)`;
          calculatedColor = chroma(colorString);
        }
      }
      const convertedColor = translateColor({
        color: calculatedColor,
        mode: colorMode,
      });
      const hexColor = calculatedColor.hex();
      return {
        convertedColor,
        hexColor,
      };
    });
  useEffect(() => {
    if (!color) return;
    const valueStepPairs = colors(color).map(({ convertedColor }, i) => ({
      step: step(i),
      color: convertedColor,
    }));
    setColorValues((prev) => ({
      ...prev,
      palette: {
        ...prev.palette,
        [type]: valueStepPairs,
      },
    }));
  }, [color, colorMode]);

  if (!color || !colorMode) return null;

  const colorBoxes = colors(color).map(({ convertedColor, hexColor }, i) => {
    return (
      <ColorPalette
        key={`${type}.${i}.${hexColor}`}
        color={convertedColor}
        hexColor={hexColor}
        colorIndex={step(i)}
      />
    );
  });
  return (
    <div className='w-full'>
      {/* <h3 className='pb-4 text-left font-semibold capitalize text-stone-700'>
        {type}
      </h3> */}
      <div className='grid min-w-0 flex-1 grid-cols-5 gap-x-1 gap-y-3 sm:gap-x-4 xl:grid-cols-10 xl:gap-x-2'>
        {colorBoxes}
      </div>
    </div>
  );
}

const ColorPalette = ({ color, colorIndex, hexColor }) => {
  return (
    <div className='space-y-1.5'>
      <CopyButton color={hexColor}>
        <button
          className='group flex h-10 w-full items-center justify-center rounded-md shadow-sm shadow-stone-400/10 transition-all duration-200 hover:scale-105 active:scale-100 dark:border dark:border-white/10 print:border-none'
          style={{
            backgroundColor: hexColor,
            color: tinycolor(hexColor).isDark() ? '#FFF' : '#000',
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
        <div
          className='truncate font-mono lowercase text-slate-500 dark:text-slate-400'
          title={color}
        >
          {color}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteComponent;
