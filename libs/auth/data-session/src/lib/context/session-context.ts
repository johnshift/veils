import { createContext, useContext } from 'react';

import { emptySession } from '@auth/core-session/empty-session';
import type { Session } from '@auth/core-session/types';

interface SessionCtx extends Session {
  // global loading state
  isLoading: boolean;
}

export const SessionContext = createContext<SessionCtx>({
  ...emptySession,
  isLoading: false,
});

export const useSessionContext = () => useContext(SessionContext);
