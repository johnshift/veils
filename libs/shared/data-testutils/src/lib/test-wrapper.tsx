import { ReactNode } from 'react';

import { QueryClient } from '@tanstack/react-query';

import { NotificationsProvider } from '@mantine/notifications';

import { MantineWrapper } from '@shared/util-wrappers/mantine';
import { ReactQueryWrapper } from '@shared/util-wrappers/react-query';

interface Props {
  children: ReactNode;
}

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

export const TestWrapper = ({ children }: Props) => (
  <MantineWrapper>
    <ReactQueryWrapper client={queryClient}>
      <NotificationsProvider>{children}</NotificationsProvider>
    </ReactQueryWrapper>
  </MantineWrapper>
);
