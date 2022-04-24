import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { MdColorLens } from 'react-icons/md';
import tinycolor from 'tinycolor2';

import ColorBoxComponent from './ColorBoxComponent';
import ColorMainComponent from './ColorMainComponent';
import ColorPaletteComponent from './ColorPaletteComponent';
import ColorPillComponent from './ColorPillComponent';

interface ColorPickerProps {
  colors: any;
  onChangeColor: (e) => void;
  inputs: {
    isEditing: boolean;
    colorName: string;
    setColorName: (e) => void;
    setIsEditing: (e) => void;
  };
}

const ColorComponent = React.forwardRef(
  ({ colors, onChangeColor, inputs }: ColorPickerProps, ref) => {
    const { isEditing, colorName, setColorName, setIsEditing } = inputs;
    return (
      <div
        className='my-8 flex h-full w-full items-center justify-center'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref={ref}
      >
        <div className='min-h-[24rem] w-full rounded-3xl bg-white p-6 dark:bg-black sm:p-8 lg:p-10'>
          <div className='flex flex-wrap items-end justify-start gap-4 lg:gap-8'>
            <div>
              <AnimatePresence exitBeforeEnter>
                {isEditing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key='color-name-input'
                    className='-my-1.5 -mx-4 overflow-hidden rounded-xl'
                  >
                    <motion.input
                      layout
                      className={`w-full bg-transparent px-4 py-2 text-3xl font-semibold text-stone-800 outline-none selection:bg-cyan-600  dark:text-stone-50 sm:py-0 md:text-4xl lg:text-6xl ${
                        tinycolor(colors.primary).isDark()
                          ? 'text-stone-100 caret-stone-50'
                          : 'text-stone-800 caret-stone-900'
                      }`}
                      placeholder='Awesome Color'
                      value={colorName}
                      autoFocus
                      onBlur={() => {
                        setIsEditing(false);
                        colorName.length === 0
                          ? setColorName('Awesome Color')
                          : null;
                      }}
                      onChange={(e) => setColorName(e.target.value)}
                      style={{
                        background: `${colors.primary}`,
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key='color-name-text'
                    className='-mx-4 -my-2 overflow-hidden rounded-xl px-4 py-2  transition-colors hover:bg-stone-400/30'
                  >
                    <motion.h1
                      layout
                      className='text-3xl font-semibold text-stone-800 dark:text-stone-50 md:text-4xl lg:text-6xl'
                      onClick={() => setIsEditing(true)}
                    >
                      {colorName}
                    </motion.h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p>
              <span className='flex select-none items-center gap-1 font-mono text-sm text-stone-400 dark:text-stone-500'>
                <MdColorLens />
                Color UI Generator
              </span>
            </p>
          </div>
          <div className='grid grid-cols-12 gap-4 pt-6 sm:gap-8 sm:pt-8 lg:pt-10 xl:gap-12'>
            <div className='col-span-12 flex flex-1 flex-col justify-between gap-4 sm:gap-6 md:col-span-4 xl:col-span-5'>
              <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <h3 className='text-left font-semibold text-stone-700 dark:text-stone-200'>
                  Base Colors
                </h3>
                <div className='grid h-full place-content-stretch gap-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-1 xl:grid-cols-3'>
                  <ColorMainComponent
                    color={colors.primary}
                    type='primary'
                    onClick={onChangeColor}
                  />
                  <ColorMainComponent
                    color={colors.secondary}
                    type='secondary'
                    onClick={onChangeColor}
                  />
                  <ColorMainComponent
                    color={colors.tertiary}
                    type='tertiary'
                    onClick={onChangeColor}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-4 sm:gap-6'>
                <h3 className='pt-4 text-left font-semibold text-stone-700 dark:text-stone-200 lg:pt-8'>
                  Analogous &amp; monochromatic
                </h3>
                <div className='grid gap-3 sm:grid-cols-2 sm:gap-6 '>
                  <ColorPillComponent color={colors.primary} type='anal' />
                  <ColorPillComponent color={colors.primary} type='mono' />
                </div>
              </div>
            </div>
            <div className='col-span-12 flex flex-col items-start justify-start gap-4 sm:gap-6 md:col-span-8 xl:col-span-7'>
              <h3 className='text-left font-semibold text-stone-700 dark:text-stone-200'>
                Color Palettes
              </h3>
              <ColorPaletteComponent color={colors.primary} type='primary' />
              <ColorPaletteComponent
                color={colors.secondary}
                type='secondary'
              />
              <ColorPaletteComponent color={colors.tertiary} type='tertiary' />
              <ColorPaletteComponent
                color={tinycolor
                  .mix(
                    tinycolor(colors.primary).greyscale().toRgbString(),
                    colors.primary,
                    10
                  )
                  .toRgbString()}
                type='gray'
              />
              <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
                <ColorBoxComponent color={colors.primary} type='primary' />
                <ColorBoxComponent color={colors.secondary} type='secondary' />
                <ColorBoxComponent color={colors.tertiary} type='tertiary' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default ColorComponent;
