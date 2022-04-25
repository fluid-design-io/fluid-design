import { LayoutGroup } from 'framer-motion';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <LayoutGroup>
      <Header />
      <Toaster />
      {children}
    </LayoutGroup>
  );
}
