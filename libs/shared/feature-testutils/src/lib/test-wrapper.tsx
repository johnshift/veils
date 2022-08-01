import { QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { SessionProvider } from '@auth/data-session';
import { MantineWrapper, ReactQueryWrapper } from '@shared/util-wrappers';

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
      <SessionProvider>{children}</SessionProvider>
    </ReactQueryWrapper>
  </MantineWrapper>
);
