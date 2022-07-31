import { AppProps } from 'next/app';
import Head from 'next/head';



import { NotificationsProvider } from '@mantine/notifications';



import { MantineWrapper } from '@shared/util-wrappers/mantine';
import { ReactQueryWrapper } from '@shared/util-wrappers/react-query';


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
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </ReactQueryWrapper>
    </MantineWrapper>
  </>
);

export default App;