import { useQuery } from '@tanstack/react-query';

import { Session } from '@auth/core-session/types';
import { GenericResponse } from '@shared/core-common/dto/generic-response';

import { fetchSession } from './fetch-session';

export const useSessionQuery = () =>
  useQuery<Session, GenericResponse>(['session'], fetchSession);
