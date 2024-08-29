'use client';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { FC } from 'react';
import * as React from "react"

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        themes={['light', 'dark', 'ocean', 'forest']}
      >
        {children}

        <Toaster />
      </ThemeProvider>
    </>
  );
};

export default Providers;
