import { rest } from 'msw';

import { URL_API_AUTH_LOGIN } from '@auth/core-login';
import type { LoginResponse } from '@auth/core-login';
import type { GenericResponse } from '@shared/core-common';

export const mockLoginResponse = (
  status: number,
  body: LoginResponse | GenericResponse | undefined,
  networkError = false,
  delay = 0,
) =>
  rest.post(URL_API_AUTH_LOGIN, (_req, res, ctx) => {
    if (networkError) {
      return res.networkError('network error');
    }

    return res(ctx.status(status), ctx.json(body), ctx.delay(delay));
  });
