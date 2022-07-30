import { AppProps } from 'next/app';
import Head from 'next/head';

import { MantineWrapper } from '@shared/util-common';

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
      <Component {...pageProps} />
    </MantineWrapper>
  </>
);

export default App;
