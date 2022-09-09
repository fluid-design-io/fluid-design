import { Button } from '@fluid-design/fluid-ui';
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { IoIosCheckmarkCircle, IoIosHeart, IoIosShare } from 'react-icons/io';
import { MdCalendarToday, MdPerson, MdPinDrop } from 'react-icons/md';

import { useColorValues } from '@/lib/AppContext';
import clsxm from '@/lib/clsxm';

interface CardProps {
  className?: string;
}

export const PreviewComponent = () => {
  const [colorValues] = useColorValues();
  if (!colorValues.palette || colorValues.palette.primary.length === 0)
    return null;
  return (
    <div className='flex flex-wrap items-stretch justify-center gap-4 md:gap-8'>
      <Card />
      <StorageCard />
      <ListCard />
      <FeatureCard />
    </div>
  );
};

const Card = ({ className }: CardProps) => {
  const contrastRing = `contrast-more:border contrast-more:border-primary-800 dark:contrast-more:border-primary-200`;
  return (
    <div
      className={clsxm(
        `relative flex flex-grow translate-x-0 transform flex-col overflow-hidden rounded-xl bg-white shadow-xl shadow-gray-200/20 dark:bg-gray-900/20 dark:shadow-gray-800/20 sm:max-w-xs`,
        contrastRing,
        className
      )}
    >
      <div className='relative z-10 h-48 sm:h-full'>
        <div className='pointer-events-none relative h-full w-full select-none overflow-hidden'>
          <Image
            alt='Sunrise in the national park Gantrisch in Bern, Switzerland. By Alain from Unsplash.'
            src='https://images.unsplash.com/photo-1612993239130-c5e816a63d8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80'
            objectFit='cover'
            layout='fill'
          />
        </div>
      </div>
      <div className='relative z-10 flex flex-col px-4 pt-4 pb-2'>
        <div className='flex-grow'>
          <h2 className='text-xs text-primary-500 dark:text-primary-400'>
            France
          </h2>
          <h1 className='font-base font-semibold text-gray-800 contrast-more:font-bold dark:text-gray-100'>
            Chamonix Centre-ville
          </h1>
          <p className='pt-1.5 pb-14 text-sm leading-tight text-gray-600 dark:text-gray-200'>
            A photo shot by Guillaume Marques on Unsplash.
          </p>
        </div>
        <div className='flex items-center justify-between pt-1'>
          <Button
            size='xs'
            className='!text-primary-800 btn-light-primary dark:!text-primary-100'
          >
            Card Button
          </Button>
          <div className='-mr-2 flex'>
            <Button
              className='btn-clear-secondary'
              color='sky'
              shape='pill'
              iconOnly
            >
              <span className='sr-only'>Share this post</span>
              <IoIosShare className='h-5 w-5' />
            </Button>
            <Button weight='clear' color='rose' shape='pill' iconOnly>
              <span className='sr-only'>Fav this post</span>
              <IoIosHeart className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StorageCard = ({ className }: CardProps) => {
  return (
    <div className='relative z-[1] flex flex-shrink-0 flex-grow flex-col items-stretch justify-center gap-4 md:gap-8'>
      <div
        className={clsxm(
          `relative w-full overflow-hidden rounded-xl border border-gray-200/60 bg-white p-4 shadow-xl shadow-gray-200/20 dark:border-gray-800 dark:bg-gray-900/20 dark:shadow-gray-800/20`,
          className
        )}
      >
        <div className='relative z-10'>
          <p className='pb-2.5 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300'>
            Basic
          </p>
          <div className='pr-16'>
            <span className='text-3xl font-bold dark:text-gray-50'>1 </span>
            <span className='text-xl font-bold dark:text-gray-50'>GB </span>
            <span className='font-semibold text-gray-500 dark:text-gray-300'>
              uploads
            </span>
          </div>
          <div className='text-gray-500 dark:text-gray-300'>
            <span>$</span>
            <span className='font-semibold text-gray-700 dark:text-gray-50'>
              5{' '}
            </span>
            <span>/mo</span>
          </div>
        </div>
      </div>
      <div
        className={clsxm(
          `relative w-full overflow-hidden rounded-lg border-[3px] border-primary-400 bg-primary-50 p-4 shadow-xl shadow-gray-100/30 dark:bg-primary-800/20 dark:shadow-gray-800/40`,
          className
        )}
      >
        <div className='absolute top-3 right-3 z-10'>
          <IoIosCheckmarkCircle className='h-7 w-7 text-primary-400' />
        </div>
        <div className='relative z-10'>
          <p className='pb-2.5 font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-200'>
            Essential
          </p>
          <div className='pr-16'>
            <span className='text-3xl font-bold dark:text-gray-50'>5 </span>
            <span className='text-xl font-bold dark:text-gray-50'>GB </span>
            <span className='font-semibold text-primary-700 dark:text-primary-200'>
              uploads
            </span>
          </div>
          <div className='text-primary-700 dark:text-primary-200'>
            <span>$</span>
            <span className='font-semibold text-gray-700 dark:text-gray-50'>
              10{' '}
            </span>
            <span>/mo</span>
          </div>
        </div>
      </div>
      <div
        className={clsxm(
          `relative w-full overflow-hidden rounded-xl border border-gray-200/60 bg-white p-4 shadow-xl shadow-gray-200/20 dark:border-gray-800 dark:bg-gray-900/20 dark:shadow-gray-800/20`,
          className
        )}
      >
        <div className='relative z-10'>
          <p className='pb-2.5 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300'>
            Pro
          </p>
          <div className='pr-16'>
            <span className='text-3xl font-bold dark:text-gray-50'>10 </span>
            <span className='text-xl font-bold dark:text-gray-50'>GB </span>
            <span className='font-semibold text-gray-500 dark:text-gray-300'>
              uploads
            </span>
          </div>
          <div className='text-gray-500 dark:text-gray-300'>
            <span>$</span>
            <span className='font-semibold text-gray-700 dark:text-gray-50'>
              20{' '}
            </span>
            <span>/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListCard = ({ className }: CardProps) => {
  const navigation = [
    { name: 'Solutions', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '#' },
  ];
  const positions = [
    {
      id: 1,
      title: 'Back End Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 2,
      title: 'Front End Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 3,
      title: 'User Interface Designer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Design',
      closeDate: '2020-01-14',
      closeDateFull: 'January 14, 2020',
    },
  ];
  return (
    <div
      className={clsxm(
        `relative z-[1] flex-grow overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-xl shadow-gray-200/20 dark:border-gray-800 dark:bg-gray-900/20 dark:shadow-gray-800/20`,
        className
      )}
    >
      <header className='bg-primary-600'>
        <nav
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
          aria-label='Top'
        >
          <div className='flex w-full items-center justify-between border-b border-primary-500 py-6 lg:border-none'>
            <div className='flex items-center'>
              <a href='#' onClick={(e) => e.preventDefault()}>
                <span className='sr-only'>Your Company</span>
                <div className='h-8 w-8 rounded-full bg-white/30 dark:bg-black/40' />{' '}
              </a>
              <div className='ml-10 hidden space-x-8 lg:block'>
                {navigation.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className='text-base font-medium text-white hover:text-primary-50'
                    onClick={(e) => e.preventDefault()}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div className='ml-10 space-x-4'>
              <a
                href='#'
                className='inline-block rounded-md border border-transparent bg-primary-500 py-2 px-4 text-base font-medium text-gray-50 hover:bg-opacity-75'
                onClick={(e) => e.preventDefault()}
              >
                Sign in
              </a>
              <a
                href='#'
                className='inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-50 dark:bg-gray-800/40 dark:text-gray-50'
                onClick={(e) => e.preventDefault()}
              >
                Sign up
              </a>
            </div>
          </div>
          <div className='flex flex-wrap justify-center space-x-6 py-4 lg:hidden'>
            {navigation.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className='text-base font-medium text-white hover:text-primary-50'
                onClick={(e) => e.preventDefault()}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <div className='flex h-full max-h-[calc(100%-90px)] w-full flex-shrink overflow-y-auto'>
        <ul
          role='list'
          className='w-full divide-y divide-gray-100 dark:divide-gray-700/40'
        >
          {positions.map((position) => (
            <li key={position.id}>
              <a
                href='#'
                className='block hover:bg-gray-50 dark:hover:bg-gray-700/40'
                onClick={(e) => e.preventDefault()}
              >
                <div className='px-4 py-4 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <p className='truncate text-sm font-medium text-primary-600 dark:text-primary-400'>
                      {position.title}
                    </p>
                    <div className='ml-2 flex flex-shrink-0'>
                      <p className='inline-flex rounded-full bg-tertiary-100 px-2 text-xs font-semibold leading-5 text-tertiary-800 dark:bg-tertiary-800 dark:text-tertiary-200'>
                        {position.type}
                      </p>
                    </div>
                  </div>
                  <div className='mt-2 sm:flex sm:justify-between'>
                    <div className='sm:flex'>
                      <p className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                        <MdPerson
                          className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-300'
                          aria-hidden='true'
                        />
                        {position.department}
                      </p>
                      <p className='mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:ml-6'>
                        <MdPinDrop
                          className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-300'
                          aria-hidden='true'
                        />
                        {position.location}
                      </p>
                    </div>
                    <div className='mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0'>
                      <MdCalendarToday
                        className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-300'
                        aria-hidden='true'
                      />
                      <p>
                        Closing on{' '}
                        <time dateTime={position.closeDate}>
                          {position.closeDateFull}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const features = [
  {
    name: 'World-class Support',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Simple and Intuitive',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: HandThumbUpIcon,
  },
  {
    name: 'Fast to deploy',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: BoltIcon,
  },
  {
    name: '7 days a week support',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
];

const FeatureCard = () => {
  return (
    <div className='relative z-[1] flex-grow overflow-hidden rounded-xl border border-gray-200/60 bg-white py-12 shadow-xl shadow-gray-200/20 dark:border-gray-800 dark:bg-gray-900/20 dark:shadow-gray-800/20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-lg font-semibold text-primary-600 dark:text-primary-400'>
            Components
          </h2>
          <p className='mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl'>
            A faster way to build better websites.
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto'>
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0'>
            {features.map((feature) => (
              <div key={feature.name} className='relative'>
                <dt>
                  <div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-500 text-gray-50 dark:bg-primary-600'>
                    <feature.icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
                    {feature.name}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500 dark:text-gray-400'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
