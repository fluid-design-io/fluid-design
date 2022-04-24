import { LayoutGroup } from 'framer-motion';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <LayoutGroup>
      <Toaster />
      {children}
    </LayoutGroup>
  );
}
