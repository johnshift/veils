import { rest } from 'msw';

import { URL_API_AUTH_REGISTER } from '@auth/core-register';
import type {
  RegisterErrorResponse,
  RegisterResponse,
} from '@auth/core-register';

export const mockRegisterResponse = (
  status: number,
  body: RegisterResponse | RegisterErrorResponse | undefined,
  networkError = false,
  delay = 0,
) =>
  rest.post(URL_API_AUTH_REGISTER, (_req, res, ctx) => {
    if (networkError) {
      return res.networkError('network error');
    }

    return res(ctx.status(status), ctx.json(body), ctx.delay(delay));
  });
