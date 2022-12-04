/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const fontExtraLight = fetch(
  new URL('../../../assets/Inter-ExtraLight.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const fontRegular = fetch(
  new URL('../../../assets/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const fontSemiBold = fetch(
  new URL('../../../assets/Inter-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const fontBold = fetch(
  new URL('../../../assets/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const handle = async (req: NextRequest) => {
  const InterExtraLight = await fontExtraLight;
  const InterRegular = await fontRegular;
  const InterSemiBold = await fontSemiBold;
  const InterBold = await fontBold;
  const { searchParams, host, protocol } = new URL(req.url);
  const title = searchParams.get('title') || 'No post title';
  const baseColorsString = searchParams.get('baseColors') || 'null';
  console.log(`\n\n====\tRecieved baseColors: ${baseColorsString}\t====\n\n`);
  let baseColors;
  try {
    baseColors = JSON.parse(baseColorsString);
  } catch (e) {
    console.log(`\n\n====\tError parsing baseColors: ${e}\t====\n\n`);
    baseColors = null;
  }
  const cover = `${protocol}//${host}/_next/image?url=${encodeURIComponent(
    searchParams.get('cover') || baseColors
      ? '/og/og-base.png'
      : '/og/og-cover.png'
  )}&w=1200&q=75`;
  const logo = `${protocol}//${host}/_next/image?url=${encodeURIComponent(
    '/og/og-logo.png'
  )}&w=128&q=75`;

  if (baseColors && baseColors.primary) {
    return new ImageResponse(
      (
        <div tw='flex w-full h-full bg-white'>
          <img
            src={cover}
            alt=''
            tw='flex-1 w-full h-full opacity-10'
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div tw='flex w-full h-full flex-col justify-end items-stretch absolute inset-0'>
            <div tw='flex-1 flex w-full absolute top-16 justify-center'>
              {Object.keys(baseColors).map((key, i) => (
                <div
                  tw='rounded-2xl flex w-1/4 absolute h-[74vh] overflow-hidden flex-col bg-white p-2'
                  key={key}
                  style={{
                    transform: `rotate(${i * 10 - 10}deg) translateX(${
                      i * 50 - 18
                    }%)`,
                    transformOrigin: 'bottom',
                    boxShadow: `0px 8px 32px 0px rgba(35, 35, 35, 0.15), 0 0 12px -4px rgba(35, 35, 35, 0.3)`,
                  }}
                >
                  <div
                    tw='flex flex-col justify-end flex-1 w-full rounded-t-lg'
                    style={{
                      backgroundColor: baseColors[key],
                    }}
                  />
                  <div tw='flex w-full pt-6 pb-2 px-2 flex-shrink-0 items-end'>
                    <div tw='flex flex-1 flex-col uppercase'>
                      <div tw='text-2xl font-bold tracking-wide text-slate-700 -mb-1'>
                        {baseColors[key].slice(1)}
                      </div>
                      <div tw='font-semibold text-xs tracking-[0.15rem] text-slate-500'>
                        {key}
                      </div>
                    </div>
                    {i === 2 && (
                      <div tw='flex flex-col'>
                        <div tw='flex font-semibold tracking-wide text-lg uppercase -mb-1 text-slate-500'>
                          Fluid
                        </div>
                        <div tw='flex uppercase tracking-widest text-xs font-extralight border-t-4 border-t-slate-300 text-slate-800'>
                          colors
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div tw='flex flex-col p-8 relative'>
              <img
                src={logo}
                alt=''
                tw='w-32 h-32'
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 628,
        fonts: [
          {
            name: 'Inter',
            data: InterExtraLight,
            weight: 200,
          },
          {
            name: 'Inter',
            data: InterRegular,
            weight: 400,
          },
          {
            name: 'Inter',
            data: InterSemiBold,
            weight: 600,
          },
          {
            name: 'Inter',
            data: InterBold,
            weight: 700,
          },
        ],
      }
    );
  } else {
    return new ImageResponse(
      (
        <div tw='flex w-full h-full flex-col justify-end bg-white items-stretch'>
          <img
            src={cover}
            alt=''
            tw='flex-1 w-full h-full'
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
      )
    );
  }
};

export default handle;
