import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

import ColorComponent from '@/components/ColorComponent';
import ColorPicker from '@/components/ColorPicker';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  const [colors, setColors] = useState({
    primary: '#87789B',
    secondary: '#F3F3E8',
    tertiary: '#93B2C4',
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [colorName, setColorName] = useState('Rose Pink');
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(null);
  const componentRef = useRef(null);
  const handleChangeColor = ({ type }) => {
    setType(type);
    setIsPickerOpen(true);
  };
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section>
          <div className='mx-auto flex min-h-screen max-w-[93.75rem] flex-col items-center justify-center px-4 text-center'>
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
            <button
              disabled={isEditing}
              className='rounded-full border border-stone-800 bg-transparent py-2 px-4 font-semibold text-stone-800 shadow-lg transition hover:animate-flicker hover:bg-stone-800 hover:text-white hover:shadow-none focus:outline-none disabled:animate-none disabled:cursor-not-allowed disabled:opacity-20 dark:bg-transparent dark:text-stone-100 dark:hover:bg-stone-50 dark:hover:text-black'
              onClick={async () => {
                const { exportComponentAsPNG } = await import(
                  'react-component-export-image'
                );
                exportComponentAsPNG(componentRef, {
                  // replace space colorName with dash
                  fileName: `color-picker-${colorName.replace(/\s/g, '-')}`,
                  html2CanvasOptions: {
                    backgroundColor: 'transparent',
                    scale: 2,
                  },
                });
              }}
            >
              Export As PNG
            </button>
          </div>
        </section>
        <footer className='pt-24 pb-8 text-center text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink href='https://design-by-oliver.vercel.app'>
            Oliver Pan
          </UnderlineLink>
        </footer>
      </main>
    </Layout>
  );
}
