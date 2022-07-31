import { ReactNode, useMemo } from 'react';

import { emptySession } from '@auth/core-session/empty-session';

import { SessionContext } from '../context/session-context';
import { useSessionQuery } from '../fetch/use-session-query';

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  // Session
  const { data: session, isLoading } = useSessionQuery();

  const memoizedValue = useMemo(
    () => ({
      isLoading,

      ...(session ?? emptySession),
    }),
    [isLoading, session],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};
