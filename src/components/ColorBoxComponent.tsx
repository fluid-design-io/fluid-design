import chroma from 'chroma-js';
import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import { useColorMode } from '@/lib/AppContext';
import { translateColor } from '@/lib/translateColor';

import CopyButton from './CopyButton';

function ColorBoxComponent({ color, type }) {
  const [colorMode] = useColorMode();
  if (!color) return null;
  const tetrad = tinycolor(color).triad();
  const contrastTetrad = tetrad[1].toHexString();
  const colors = chroma.scale([color, contrastTetrad]).colors(4);

  const convertedColors = colors.map((color) =>
    translateColor({ color: chroma(color), mode: colorMode })
  );

  return (
    <div>
      <div
        className='relative h-24 overflow-hidden rounded-lg lg:aspect-square lg:h-auto'
        style={{
          backgroundColor: colors[1],
        }}
      >
        <CopyButton color={colors[1]}>
          <button
            className='group group flex h-full w-full items-start justify-between p-4 font-mono text-xs'
            style={{
              backgroundColor: convertedColors[1],
              color: tinycolor(colors[1]).isDark() ? '#FFF' : '#000',
            }}
            aria-label={`Click to copy ${tinycolor(color).toHexString()}`}
            title={`Click to copy ${tinycolor(color).toHexString()}`}
          >
            {convertedColors[1]}
            <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100' />
          </button>
        </CopyButton>
        <div className='absolute bottom-0 left-0 right-0 grid h-full w-full grid-cols-3 lg:h-auto lg:grid-cols-2'>
          {convertedColors.map((color, i) => {
            if (i === 0) {
              return null;
            }
            return (
              <CopyButton color={colors[i]} key={`${type}.${i}.${color}`}>
                <button
                  className={`group flex flex-col items-center justify-center transition-colors ${
                    i === 1 ? 'lg:hidden' : ''
                  }`}
                  style={{
                    backgroundColor: colors[i],
                    color: tinycolor(colors[i]).isDark() ? '#fff' : '#000',
                  }}
                  aria-label={`Click to copy ${tinycolor(color).toHexString()}`}
                  title={`Click to copy ${tinycolor(color).toHexString()}`}
                >
                  <div className='relative py-6 font-mono text-xs lowercase'>
                    <span className='break-all px-0.5 transition-opacity group-hover:opacity-0'>
                      {color}
                    </span>
                    <div className='absolute inset-0 flex h-full w-full items-center justify-center'>
                      <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100' />
                    </div>
                  </div>
                </button>
              </CopyButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ColorBoxComponent;
