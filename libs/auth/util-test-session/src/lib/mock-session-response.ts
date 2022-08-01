import { rest } from 'msw';

import { URL_API_AUTH_SESSION } from '@auth/core-session';
import type { Session } from '@auth/core-session';
import type { GenericResponse } from '@shared/core-common';

export const mockSessionResponse = (
  status: number,
  body: Session | GenericResponse | undefined,
  networkError = false,
  delay = 0,
) =>
  rest.get(URL_API_AUTH_SESSION, (_req, res, ctx) => {
    if (networkError) {
      return res.networkError('network error');
    }

    return res(ctx.status(status), ctx.json(body), ctx.delay(delay));
  });
