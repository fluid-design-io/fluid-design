import { Button } from '@fluid-design/fluid-ui';
import { IoIosCopy } from 'react-icons/io';

import { useColorValues } from '@/lib/AppContext';
import Code from '@/lib/Code';

import CopyButton from './CopyButton';

export const TailwindConfigComponent = () => {
  const [colorValues] = useColorValues();
  if (!colorValues.palette || colorValues.palette.primary.length === 0)
    return null;
  const { palette } = colorValues;
  const colorSets = Object.entries(palette).map(([type, colors]) => {
    const colorSet = colors
      .map(({ step, color }) => `\t\t\t${step}: '${color}',`)
      .join('\n');
    return `
\t\t${type}: {
${colorSet}
\t\t},`;
  });
  const content = `
/* 
CSS generated with Color UI Generator
https://color-ui-generator.vercel.app/
*/

/* tailwind.config.js */
  
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
${colorSets.join('\n')}
      },
    },
  },
  // plugins: [],
};
    `;
  return (
    <div className='relative mx-auto max-h-[calc(min(970px,85vh))] flex-1 flex-grow overflow-y-auto rounded-xl bg-stone-800 shadow-2xl shadow-stone-300/30 dark:shadow-black/70'>
      <div className='pointer-events-none sticky top-4 flex w-full justify-end px-4'>
        <CopyButton text={content} copiedText='Copied CSS!'>
          <Button
            iconOnly
            icon={IoIosCopy}
            className='pointer-events-auto btn-primary'
          />
        </CopyButton>
      </div>
      <Code language='js' content={content} className='w-full' />
    </div>
  );
};
