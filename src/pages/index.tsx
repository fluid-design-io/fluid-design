import { Button, Tab } from '@fluid-design/fluid-ui';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import tinycolor from 'tinycolor2';

import { BaseColors, useBaseColors } from '@/lib/AppContext';
import { throwDice } from '@/lib/dice';
import { generateBaseColors } from '@/lib/generateBaseColors';

import { AboutComponent } from '@/components/AboutComponent';
import { ColorAsTextComponent } from '@/components/ColorAsTextComponent';
import ColorComponent from '@/components/ColorComponent';
import ColorPicker from '@/components/ColorPicker';
import UnderlineLink from '@/components/links/UnderlineLink';
import { PreviewComponent } from '@/components/PreviewComponent';
import Seo from '@/components/Seo';
import { TailwindConfigComponent } from '@/components/TailwindConfigComponent';
import { Toolbar } from '@/components/Toolbar';

export default function HomePage({
  initColors,
  hasInvalidUrlColors,
  dice: initDice,
}: {
  initColors: BaseColors;
  hasInvalidUrlColors: boolean;
  dice: number;
}) {
  const [baseColors, setBaseColors] = useBaseColors({
    initialColors: initColors,
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [colorName, setColorName] = useState('Awesome Color');
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(null);
  const componentRef = useRef(null);
  const errorRef = useRef(null);
  const handleChangeColor = ({ type }) => {
    setType(type);
    setIsPickerOpen(true);
  };
  // parse the baseColors into query params
  return (
    <>
      <Seo templateTitle={colorName} baseColors={baseColors} />

      <Toolbar initColors={initColors} initDice={initDice} />
      <main id='main'>
        {hasInvalidUrlColors && (
          <div className='mx-auto w-full max-w-[93.75rem] px-4' ref={errorRef}>
            <div className='my-8 flex w-full max-w-[93.75rem] items-center justify-between gap-4 rounded-lg border border-rose-300 bg-rose-100 p-4 dark:border-rose-600/70 dark:bg-rose-700/30'>
              <p className='text-rose-800 dark:text-rose-200'>
                The colors in the URL are invalid.
              </p>
              <Button
                icon={XMarkIcon}
                shape='pill'
                weight='clear'
                size='sm'
                color='rose'
                iconOnly
                onClick={() => {
                  errorRef.current.remove();
                }}
              />
            </div>
          </div>
        )}
        <section
          id='color-generator'
          className='min-h-main mx-auto flex max-w-[93.75rem] items-center justify-center px-4 pb-8'
        >
          <div className='flex-grow'>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 20 }}
              className='mb-12 flex flex-1 flex-col items-center justify-center rounded-3xl text-center shadow-2xl shadow-stone-300/30 dark:shadow-black/70 lg:mb-16'
            >
              <AnimatePresence>
                {isPickerOpen && (
                  <ColorPicker
                    type={type}
                    colors={baseColors || initColors}
                    onChange={setBaseColors}
                    onDismiss={() => setIsPickerOpen(false)}
                  />
                )}
                <ColorComponent
                  ref={componentRef}
                  key='color-component'
                  colors={baseColors || initColors}
                  onChangeColor={handleChangeColor}
                  inputs={{
                    ...{ isEditing, colorName, setColorName, setIsEditing },
                  }}
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
        <section className='mx-auto w-full max-w-[93.75rem]' id='tabs'>
          <div className='flex w-full max-w-full flex-col items-center justify-center px-4'>
            <Tab>
              <Tab.List className='overscroll-x-auto sm:self-start'>
                <Tab.ListItem>Preview</Tab.ListItem>
                <Tab.ListItem>Tailwind</Tab.ListItem>
                <Tab.ListItem>CSS</Tab.ListItem>
                <Tab.ListItem>About</Tab.ListItem>
              </Tab.List>
              <Tab.Panels className='my-8'>
                <Tab.Panel tabPanelClassName=''>
                  <PreviewComponent />
                </Tab.Panel>
                <Tab.Panel tabPanelClassName=''>
                  <TailwindConfigComponent />
                </Tab.Panel>
                <Tab.Panel tabPanelClassName=''>
                  <ColorAsTextComponent colorName={colorName} />
                </Tab.Panel>
                <Tab.Panel tabPanelClassName=''>
                  <AboutComponent />
                </Tab.Panel>
              </Tab.Panels>
            </Tab>
          </div>
        </section>
        <footer className='pt-24 pb-8 text-center text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink href='https://designed-by-oliver.vercel.app/'>
            Oliver Pan
          </UnderlineLink>
        </footer>
      </main>
    </>
  );
}

// a next.js static function
export async function getServerSideProps({ query }) {
  // get the baseColors from the query params if they exist
  const hasColorQuries =
    Object.keys(query).length > 0 &&
    query.primary &&
    query.secondary &&
    query.tertiary;
  const baseColors: BaseColors = hasColorQuries
    ? {
        primary: query.primary,
        secondary: query.secondary,
        tertiary: query.tertiary,
      }
    : null;
  // isValidBaseColors means that there're at least primary, secondary, and tertiary colors
  // and they're all valid hex colors
  const isValidBaseColors = () => {
    if (!baseColors) return false;
    const keys = Object.keys(baseColors);
    const hasValidColors = keys.every((key) => {
      const color = baseColors[key];
      return tinycolor(color).isValid();
    });
    return hasValidColors;
  };
  // generate a boolean based on if number is less than or equal to 0.5
  const initColors = isValidBaseColors() ? baseColors : generateBaseColors();
  const dice = throwDice();
  return {
    props: {
      initColors,
      hasInvalidUrlColors: hasColorQuries && !isValidBaseColors(),
      dice,
    },
  };
}
