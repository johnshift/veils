import React from 'react';

import { QueryClient } from '@tanstack/react-query';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { useDarkMode } from 'storybook-dark-mode';

import { Center } from '@mantine/core';

import { SessionProvider } from '@auth/data-session/providers/session-provider';
import { MantineWrapper } from '@shared/util-wrappers/mantine';
import { ReactQueryWrapper } from '@shared/util-wrappers/react-query';

// React query client
const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env['NODE_ENV'] === 'test' ? () => ({}) : console.error,
  },
  defaultOptions: {
    queries: {
      // All request become stale immediately
      staleTime: 0,
      // Turn retries off
      retry: false,
      // Do not cache result
      cacheTime: 0,
    },
    mutations: {
      // Turn retries off
      retry: false,
    },
  },
});

// Initialize msw
initialize();

// Mantine - Storybook theme
const ThemeWrapper = (props: { children: React.ReactNode }) => (
  <MantineWrapper colorScheme={useDarkMode() ? 'dark' : 'light'}>
    <ReactQueryWrapper client={queryClient}>
      <SessionProvider>
        <Center style={{ width: '100vw', height: '100vh' }}>{props.children}</Center>
      </SessionProvider>
    </ReactQueryWrapper>
  </MantineWrapper>
);

// Global exports
export const parameters = { layout: 'fullscreen' };
export const decorators = [
  // eslint-disable-next-line @typescript-eslint/ban-types
  (renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
  mswDecorator,
];
