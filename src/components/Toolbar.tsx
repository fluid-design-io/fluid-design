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
    <div className='mb-4 flex w-full items-center justify-between'>
      <Button
        sr='Generate random colors'
        weight='outline'
        color='neutral'
        onClick={() => {
          randomize();
          reThrowDice();
        }}
        as={motion.button}
        initial='initial'
        whileHover='hover'
        whileTap='tap'
        iconOnly
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
            onChange={(value) => setColorMode(value)}
            itemKey='name'
          />
        </Form>
      )}
    </div>
  );
};
