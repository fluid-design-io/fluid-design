import tinycolor from 'tinycolor2';

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
        <p className='p-4 text-left font-mono text-xs'>
          {tetrad[1].toHexString()}
        </p>
        <div className='absolute bottom-0 left-0 right-0 grid h-full w-full grid-cols-3 lg:h-auto lg:grid-cols-2'>
          {tetrad.map((tetra, i) => {
            if (i === 0) {
              return null;
            }
            return (
              <div
                key={`${type}.${i}.${tetra.toRgbString()}`}
                className={`flex flex-col items-center justify-center ${
                  i === 1 ? 'lg:hidden' : ''
                }`}
                style={{
                  backgroundColor: tetra.toHexString(),
                  color: tetra.isDark() ? '#fff' : '#000',
                }}
              >
                <div className='py-6 font-mono text-xs lowercase'>
                  {tetra.toHexString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ColorBoxComponent;
