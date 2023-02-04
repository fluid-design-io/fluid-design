import { Button, Form, Select } from '@fluid-design/fluid-ui';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill,
} from 'react-icons/bs';

import {
  BaseColors,
  ColorModes,
  useBaseColors,
  useColorMode,
} from '@/lib/AppContext';
import { throwDice } from '@/lib/dice';

const diceIcons = [
  <BsDice1Fill key='dice-1' />,
  <BsDice2Fill key='dice-2' />,
  <BsDice3Fill key='dice-3' />,
  <BsDice4Fill key='dice-4' />,
  <BsDice5Fill key='dice-5' />,
  <BsDice6Fill key='dice-6' />,
];

export const Toolbar = ({
  initColors,
  initDice,
}: {
  initColors: BaseColors;
  initDice: number;
}) => {
  const [colorMode, setColorMode] = useColorMode();
  const [baseColors, setBaseColors, randomize] = useBaseColors({
    initialColors: initColors,
  });
  const [dice, setDice] = useState(initDice);
  const colorModeList = Object.keys(ColorModes).map((mode) => ({
    name: mode,
  }));

  const animation = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 30, scale: 1 },
    tap: { rotate: 60, scale: 0.85 },
  };
  const reThrowDice = () => {
    setDice(throwDice());
  };
  return (
    <div className='sticky top-0 z-20 mb-2 w-full bg-gray-50 pb-2 pt-2 transition-colors duration-[1.5s] ease-in-out dark:bg-gray-900'>
      <div className='relative mx-auto flex w-full max-w-[93.75rem] items-center justify-between px-4'>
        <Button
          sr='Generate random colors'
          onClick={() => {
            randomize();
            reThrowDice();
          }}
          as={motion.button}
          initial='initial'
          whileHover='hover'
          whileTap='tap'
          iconOnly
          className='border-primary-400 btn-outline-primary hocus:!border-primary-700 dark:hocus:!border-primary-200'
        >
          <AnimatePresence mode='popLayout'>
            {diceIcons[dice] && (
              <motion.span
                key={`dice-span-${dice}`}
                variants={animation}
                initial={{
                  rotate: -30,
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  rotate: 0,
                  opacity: 0,
                  scale: 0.85,
                }}
              >
                {diceIcons[dice]}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        {colorMode && (
          <Form
            onSubmit={() => null}
            initialValues={{
              colorMode: colorMode,
            }}
          >
            <Select
              name='colorMode'
              label='Color Mode'
              className='uppercase'
              buttonClassName='uppercase'
              labelClassName='sr-only'
              list={colorModeList}
              onChange={(value) => setColorMode(value.name)}
              itemKey='name'
              listOptionSelectedClassName='!text-primary-900 dark:!text-primary-100'
              listOptionActiveClassName='!text-primary-900 dark:!text-primary-100'
            />
          </Form>
        )}
      </div>
    </div>
  );
};
