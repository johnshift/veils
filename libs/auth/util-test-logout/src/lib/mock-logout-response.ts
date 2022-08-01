import { rest } from 'msw';

import { URL_API_AUTH_LOGOUT } from '@auth/core-logout';
import type { GenericResponse } from '@shared/core-common';

export const mockLogoutResponse = (
  status: number,
  body: GenericResponse | undefined,
  networkError = false,
  delay = 0,
) =>
  rest.post(URL_API_AUTH_LOGOUT, (_req, res, ctx) => {
    if (networkError) {
      return res.networkError('network error');
    }

    return res(ctx.status(status), ctx.json(body), ctx.delay(delay));
  });
