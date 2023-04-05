import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import { BaseColors, useColorMode, useColorValues } from '@/lib/AppContext';
import clsxm from '@/lib/clsxm';
import { getUnionFormula } from '@/lib/colorCalculator';
import { COLOR_LENGTH } from '@/lib/colorStepMap';
import { translateColor } from '@/lib/translateColor';
import { useTheme } from '@/lib/useTheme';

import CopyButton from './CopyButton';

function ColorPaletteComponent({
  color,
  type,
}: {
  color: string;
  type: keyof BaseColors | 'gray';
}) {
  const [colorMode] = useColorMode();
  const { mode } = useTheme();
  const [colorValues, setColorValues] = useColorValues();
  // create an array total of 10 colors, based on colorIndex index, and map over it
  const step = (i) => (i === 0 ? 50 : i === 10 ? 950 : i * 100);

  const colors = (color) =>
    Array.from({ length: COLOR_LENGTH }, (_, i) => {
      const rawColor = chroma(color);
      let calculatedColor = rawColor;
      const step = i;
      const sat = rawColor.hsl()[1];
      const lig = rawColor.hsl()[2];
      if (type === 'gray') {
        calculatedColor = rawColor
          .set('lch.l', (COLOR_LENGTH - 1 - i) * 8.85 + 5)
          .set('hsl.s', 0.02 + sat * 0.25);
      } else {
        let hue = Math.round(rawColor.hsl()[0] * 10) / 10;
        // if hue is Nan, set it to 0
        if (isNaN(hue)) {
          calculatedColor = rawColor.set(
            'lch.l',
            (COLOR_LENGTH - 1 - i) * 8.85 + 5
          );
        } else {
          hue === 360 ? (hue = 0.001) : hue;
          hue === 0 ? (hue = 0.001) : hue;
          // const saturation = calculateSaturation(hue, sat, COLOR_LENGTH - i);
          // const luminescence = getColorLuminescence(hue, lum, COLOR_LENGTH - i);
          const formula = getUnionFormula(hue, sat, lig);
          const { saturation, lightness } = formula(step);
          const colorString = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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
      raw: tinycolor(convertedColor).toRgb(),
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

  const colorBoxes = colors(color).map(({ convertedColor, hexColor }, i) => (
    <ColorPalette
      mode={mode}
      key={`${type}.${i}.${hexColor}`}
      color={convertedColor}
      hexColor={hexColor}
      colorIndex={step(i)}
    />
  ));
  return (
    <div className='w-full'>
      {/* <h3 className='pb-4 text-start font-semibold capitalize text-stone-700'>
        {type}
      </h3> */}
      <div className='grid min-w-0 flex-1 grid-cols-1 gap-x-1 gap-y-3 sm:gap-x-4 lg:grid-cols-11 lg:gap-x-2'>
        {colorBoxes}
      </div>
    </div>
  );
}

const ColorPalette = ({ mode, color, colorIndex, hexColor }) => {
  const [isHocus, setIsHocus] = useState(false);
  const { h, s } = tinycolor(color).toHsl();
  const shadowSmall = `${h},${s * 100}%,${mode === 'dark' ? 17 : 73}%, ${
    mode === 'dark' ? 0.8 : 0.3
  }`;
  const shadowLarge = `${h},${s * 100}%,${mode === 'dark' ? 10 : 80}%, ${
    mode === 'dark' ? 0.8 : 0.3
  }`;
  const activeShaodw = `0 4px 14px -2px hsl(${shadowSmall}), 0 12px 24px -2px hsl(${shadowLarge})`;
  return (
    <div className='space-y-1.5 flex gap-1.5 justify-between items-center lg:block'>
      <div className='relative flex-1'>
        <CopyButton color={color}>
          <motion.button
            className={clsxm(
              'group flex h-10 w-full items-center justify-center rounded-md shadow-sm shadow-stone-400/10 dark:border dark:border-white/10',
              'focus-within:outline-none focus:outline-none print:border-none',
              'transition-shadow duration-300'
            )}
            style={{
              backgroundColor: hexColor,
              color: tinycolor(hexColor).isDark() ? '#FFF' : '#000',
              boxShadow: isHocus ? activeShaodw : 'none',
            }}
            aria-label={`Click to copy ${tinycolor(color).toHexString()}`}
            title={`Click to copy ${tinycolor(color).toHexString()}`}
            onHoverStart={() => setIsHocus(true)}
            onHoverEnd={() => setIsHocus(false)}
            onBlur={() => setIsHocus(false)}
            onFocus={() => setIsHocus(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              mass: 0.2,
            }}
          >
            <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100' />
            <div
              className={clsxm(
                'pointer-events-none absolute inset-0 z-[2] rounded-md transition',
                'group-focus-visible:app-focus-ring'
              )}
            />
          </motion.button>
        </CopyButton>
      </div>
      <div className='px-0.5 flex-shrink-0 text-start text-xs'>
        <div className='w-6 font-medium text-gray-900 transition-colors duration-1000 ease-in-out dark:text-gray-50 lg:w-full'>
          {colorIndex}
        </div>
        <div
          className='truncate font-mono lowercase text-[0.7rem] text-slate-500 transition-colors duration-1000 ease-in-out dark:text-slate-400'
          title={color}
        >
          {color}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteComponent;
