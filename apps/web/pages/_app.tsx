import { AppProps } from 'next/app';
import Head from 'next/head';

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Veils App</title>
    </Head>
    <main>
      <Component {...pageProps} />
    </main>
  </>
);

export default CustomApp;
