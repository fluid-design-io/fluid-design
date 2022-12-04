export const SkipNavContent = () => {
  return (
    <div className='skip-main-wrap'>
      <div className='skip-main flex flex-col gap-1'>
        <h2 className='px-2 text-lg font-semibold'>Skip to</h2>
        <a className='skip-btn' href='#main'>
          Color Generator
        </a>
        <a className='skip-btn' href='#analogous'>
          Analogous
        </a>
        <a className='skip-btn' href='#color-palettes'>
          Color Palettes
        </a>
        <a className='skip-btn' href='#monochromatic'>
          Monochromatic
        </a>
        <a className='skip-btn' href='#tabs'>
          Tabs
        </a>
      </div>
    </div>
  );
};
