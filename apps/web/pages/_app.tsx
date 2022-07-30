import { AppProps } from 'next/app';
import Head from 'next/head';

import { MantineProvider } from '@mantine/core';

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Veils App</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  </>
);

export default CustomApp;
