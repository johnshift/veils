import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoginModalProps } from '@auth/feature-login-modal';
import { MantineWrapper } from '@shared/util-wrappers';
import { ReactQueryWrapper } from '@shared/util-wrappers';

const LoginModal = dynamic<LoginModalProps>(() =>
  import('@auth/feature-login-modal').then((m) => m.LoginModal),
);

const Appbar = dynamic(() =>
  import('@shared/feature-appbar').then((m) => m.Appbar),
);

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
        <Appbar />
        <Component {...pageProps} />
        <LoginModal fakeLoadingMs={1000} />
      </ReactQueryWrapper>
    </MantineWrapper>
  </>
);

export default App;
