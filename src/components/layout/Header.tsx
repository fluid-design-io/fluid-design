import * as React from 'react';
import { AiFillGithub } from 'react-icons/ai';

import UnstyledLink from '@/components/links/UnstyledLink';

import { ThemeSwitch } from '../buttons/ThemeSwitch';

const links = [
  {
    href: 'https://github.com/fluid-design-io/color-ui-generator',
    label: <AiFillGithub className='h-5 w-5' />,
  },
  // { href: '/', label: 'Route 2' },
];

export default function Header() {
  return (
    <header>
      <div className='mx-auto flex h-14 w-full max-w-[93.75rem] items-center justify-between px-4'>
        <UnstyledLink
          href='/'
          className='bg-gradient-to-tr from-stone-800 to-stone-400 bg-clip-text font-medium text-stone-700 text-transparent hover:text-gray-500 dark:from-stone-50 dark:to-stone-500'
        >
          Color UI Generator
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            <ThemeSwitch />
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className='text-stone-700 hover:text-gray-500 dark:text-stone-200 dark:hover:text-gray-300'
                >
                  {label}
                </UnstyledLink>
              </li>
            ))}
            <li className='-mb-[1px] rounded px-1.5 py-0.5 font-mono text-xs text-stone-400 ring-1 ring-stone-400 dark:text-stone-500 dark:ring-stone-500'>
              <span>V3.0.0</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
