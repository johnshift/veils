import { AppProps } from 'next/app';
import Head from 'next/head';

import { MantineWrapper, ReactQueryWrapper } from '@shared/util-common';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Veils App</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <MantineWrapper>
      <ReactQueryWrapper>
        <Component {...pageProps} />
      </ReactQueryWrapper>
    </MantineWrapper>
  </>
);

export default App;
