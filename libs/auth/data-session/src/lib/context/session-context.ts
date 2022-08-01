import { DispatchWithoutAction, createContext, useContext } from 'react';

import { emptySession } from '@auth/core-session/empty-session';
import type { Session } from '@auth/core-session/types';

interface SessionCtx extends Session {
  // global loading state
  isLoading: boolean;
  openedLoginModal: boolean;
  openLoginModal: DispatchWithoutAction;
  closeLoginModal: DispatchWithoutAction;
}

export const SessionContext = createContext<SessionCtx>({
  ...emptySession,
  isLoading: false,
  openedLoginModal: false,
  openLoginModal: () => null,
  closeLoginModal: () => null,
});

export const useSessionContext = () => useContext(SessionContext);
