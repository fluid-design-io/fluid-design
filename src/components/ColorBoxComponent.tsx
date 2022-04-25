import { IoIosCopy } from 'react-icons/io';
import tinycolor from 'tinycolor2';

import CopyButton from './CopyButton';

function ColorBoxComponent({ color, type }) {
  const tetrad = tinycolor(color).analogous(4, 10);
  return (
    <div>
      <div
        className='relative h-24 overflow-hidden rounded-lg lg:aspect-square lg:h-auto'
        style={{
          backgroundColor: tetrad[1].toHexString(),
        }}
      >
        <CopyButton color={tetrad[1].toHexString()}>
          <button
            className='group group flex h-full w-full items-start justify-between p-4 font-mono text-xs'
            style={{
              backgroundColor: tetrad[1].toHexString(),
              color: tetrad[1].isDark() ? '#FFF' : '#000',
            }}
            aria-label={`Click to copy ${tinycolor(color).toHexString()}`}
            title={`Click to copy ${tinycolor(color).toHexString()}`}
          >
            {tetrad[1].toHexString()}
            <IoIosCopy className='h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100' />
          </button>
        </CopyButton>
        <div className='absolute bottom-0 left-0 right-0 grid h-full w-full grid-cols-3 lg:h-auto lg:grid-cols-2'>
          {tetrad.map((tetra, i) => {
            if (i === 0) {
              return null;
            }
            return (
              <CopyButton
                color={tetrad[1].toHexString()}
                key={`${type}.${i}.${tetra.toRgbString()}`}
              >
                <button
                  className={`group flex flex-col items-center justify-center ${
                    i === 1 ? 'lg:hidden' : ''
                  }`}
                  style={{
                    backgroundColor: tetra.toHexString(),
                    color: tetra.isDark() ? '#fff' : '#000',
                  }}
                  aria-label={`Click to copy ${tinycolor(color).toHexString()}`}
                  title={`Click to copy ${tinycolor(color).toHexString()}`}
                >
                  <div className='relative py-6 font-mono text-xs lowercase'>
                    <span className='transition-opacity group-hover:opacity-0'>
                      {tetra.toHexString()}
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
