import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { defaultQueryClientOptions } from './default-query-client-options';

const defaultQueryClient = new QueryClient({
  defaultOptions: defaultQueryClientOptions,
});

type Props = {
  children: ReactNode;
  client?: QueryClient;
};

export const ReactQueryWrapper = ({
  children,
  client = defaultQueryClient,
}: Props) => (
  <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
