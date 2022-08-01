import { URL_API_AUTH_SESSION } from '@auth/core-session';
import type { Session } from '@auth/core-session';
import { apiFetch } from '@shared/util-common';

export const fetchSession = async () =>
  apiFetch<Session>('GET', URL_API_AUTH_SESSION);
