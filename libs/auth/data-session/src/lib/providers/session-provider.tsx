import { ReactNode, useMemo } from 'react';

import { useDisclosure } from '@mantine/hooks';

import { emptySession } from '@auth/core-session';

import { SessionContext } from '../context/session-context';
import { useSessionQuery } from '../fetch/use-session-query';

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  // Session
  const { data: session, isLoading } = useSessionQuery();

  // Login modal controls
  const [openedLoginModal, loginModalHandlers] = useDisclosure(false);

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      openedLoginModal,
      openLoginModal: loginModalHandlers.open,
      closeLoginModal: loginModalHandlers.close,

      ...(session ?? emptySession),
    }),
    [
      isLoading,
      loginModalHandlers.close,
      loginModalHandlers.open,
      openedLoginModal,
      session,
    ],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};
