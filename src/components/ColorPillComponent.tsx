import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import CopyButton from './CopyButton';

function ColorPillComponent({ color, type }) {
  const monos =
    type === 'mono'
      ? tinycolor(color).monochromatic()
      : tinycolor(color).analogous();
  // sort monos by brightness
  monos.sort((a, b) => {
    return tinycolor(b).getBrightness() - tinycolor(a).getBrightness();
  });
  return (
    <div className='flex flex-col gap-3'>
      {monos.map((mono, i) => {
        return (
          <div key={`${type}.${i}.${mono.toRgbString()}`} className='relative'>
            <CopyButton color={mono.toRgbString()}>
              <button
                className='group flex h-10 w-full items-center justify-between rounded-full px-4 dark:border dark:border-white/10'
                style={{ backgroundColor: mono.toHexString() }}
                aria-label={`Click to copy ${mono.toHexString()}`}
                title={`Click to copy ${mono.toHexString()}`}
              >
                <div
                  className='flex w-full flex-wrap justify-between px-0.5 text-left text-xs opacity-30 transition-opacity group-hover:opacity-100 pointer-touch:opacity-90'
                  style={{ color: mono.isDark() ? '#fff' : '#000' }}
                >
                  {/* <div className='font-mono lowercase'>{mono.toRgbString()}</div> */}

                  <div className='dark:grou-active:text-primary-200 flex w-full items-center justify-between font-mono lowercase'>
                    {mono.toHexString()}
                    <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100' />
                  </div>
                </div>
              </button>
            </CopyButton>
          </div>
        );
      })}
    </div>
  );
}
export default ColorPillComponent;
