import { Button } from '@fluid-design/fluid-ui';
import { IoIosCopy } from 'react-icons/io';

import { BaseColors, ColorValue, useColorValues } from '@/lib/AppContext';
import Code from '@/lib/Code';

import CopyButton from './CopyButton';

export const ColorAsTextComponent = ({ colorName }: { colorName }) => {
  const [colorValues] = useColorValues();
  if (!colorValues.palette || colorValues.palette.primary.length === 0)
    return null;
  const baseName = colorName
    .toLowerCase()
    // replace special characters with ''
    .replace(/[^\w\s]/gi, '')
    // replace spaces with '-'
    .replace(/ /g, '-');
  const generateColorSet = (
    type: keyof BaseColors | 'gray',
    colors: ColorValue[]
  ) => {
    const colorSet = colors
      .map(({ step, color }) => `  --${baseName}-${type}-${step}: ${color};\n`)
      .join('');
    return colorSet;
  };

  const colorSets = Object.entries(colorValues.palette)
    .map(
      ([type, colors]) =>
        '\n' + generateColorSet(type as keyof BaseColors | 'gray', colors)
    )
    .join('');

  const content = `
/* 
CSS generated with Color UI Generator
https://color-ui-generator.vercel.app/
*/

:root {
${colorSets}
}
  `;

  return (
    <div className='relative mx-auto max-h-[calc(min(970px,85vh))] flex-1 flex-grow overflow-y-auto rounded-xl bg-gray-800 shadow-2xl shadow-gray-300/30 dark:shadow-black/70'>
      <div className='pointer-events-none sticky top-4 flex w-full justify-end px-4'>
        <CopyButton text={content} copiedText='Copied CSS!'>
          <Button
            iconOnly
            icon={IoIosCopy}
            className='pointer-events-auto'
            weight='bold'
            color='stone'
          />
        </CopyButton>
      </div>
      <Code language='css' content={content} className='w-full' />
    </div>
  );
};
