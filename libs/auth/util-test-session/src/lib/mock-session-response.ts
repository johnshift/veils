import { rest } from 'msw';

import { URL_API_AUTH_SESSION } from '@auth/core-session/constants';
import { Session } from '@auth/core-session/types';
import { GenericResponse } from '@shared/core-common/dto/generic-response';

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
