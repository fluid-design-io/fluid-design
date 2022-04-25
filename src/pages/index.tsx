import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import ColorComponent from '@/components/ColorComponent';
import ColorPicker from '@/components/ColorPicker';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  const [colors, setColors] = useState({
    primary: '#87789B',
    secondary: '#F3F3E8',
    tertiary: '#93B2C4',
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [colorName, setColorName] = useState('Awesome Color');
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(null);
  const componentRef = useRef(null);
  const handleChangeColor = ({ type }) => {
    setType(type);
    setIsPickerOpen(true);
  };
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='min-h-main mx-auto flex max-w-[93.75rem] items-center justify-center px-4'>
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
                  colors={colors}
                  onChange={setColors}
                  onDismiss={() => setIsPickerOpen(false)}
                />
              )}
              <ColorComponent
                ref={componentRef}
                key='color-component'
                colors={colors}
                onChangeColor={handleChangeColor}
                inputs={{
                  ...{ isEditing, colorName, setColorName, setIsEditing },
                }}
              />
            </AnimatePresence>
          </motion.div>
        </section>
        <section className='flex flex-col items-center justify-center pt-8'>
          <button
            disabled={isEditing}
            className='rounded-full border border-stone-800 bg-transparent py-2 px-4 font-semibold text-stone-800 shadow-lg transition hover:bg-stone-800 hover:text-white hover:shadow-none focus:outline-none  disabled:cursor-not-allowed disabled:opacity-20 dark:bg-transparent dark:text-stone-100 dark:hover:bg-stone-50 dark:hover:text-black'
            onClick={async () => {
              const { exportComponentAsPNG } = await import(
                'react-component-export-image'
              );
              exportComponentAsPNG(componentRef, {
                // replace space with dash, and lowercase, and remove special characters
                fileName: `color-picker-${colorName
                  .replace(/\s/g, '-')
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, '')}`,
                html2CanvasOptions: {
                  backgroundColor: 'transparent',
                  scale: 2,
                },
              });
            }}
          >
            Export As PNG
          </button>
        </section>
        <footer className='pt-24 pb-8 text-center text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink href='https://design-by-oliver.vercel.app'>
            Oliver Pan
          </UnderlineLink>
        </footer>
      </main>
    </>
  );
}
