import { URL_API_AUTH_SESSION } from '@auth/core-session/constants';
import { Session } from '@auth/core-session/types';
import { apiFetch } from '@shared/util-common/api-fetch';

export const fetchSession = async () =>
  apiFetch<Session>('GET', URL_API_AUTH_SESSION);
