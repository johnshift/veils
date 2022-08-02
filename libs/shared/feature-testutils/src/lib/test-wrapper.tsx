import { QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { SessionProvider } from '@auth/data-session';
import { LoginModal } from '@auth/feature-login-modal';
import { MantineWrapper, ReactQueryWrapper } from '@shared/util-wrappers';

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

interface Props {
  children: ReactNode;
}

export const TestWrapper = ({ children }: Props) => (
  <MantineWrapper>
    <ReactQueryWrapper client={queryClient}>
      <SessionProvider>
        {children} <LoginModal fakeLoadingMs={50} />
      </SessionProvider>
    </ReactQueryWrapper>
  </MantineWrapper>
);
