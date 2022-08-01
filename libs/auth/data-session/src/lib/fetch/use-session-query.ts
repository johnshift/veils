import { useQuery } from '@tanstack/react-query';

import type { Session } from '@auth/core-session';
import type { GenericResponse } from '@shared/core-common';

import { fetchSession } from './fetch-session';

export const useSessionQuery = () =>
  useQuery<Session, GenericResponse>(['session'], fetchSession);
