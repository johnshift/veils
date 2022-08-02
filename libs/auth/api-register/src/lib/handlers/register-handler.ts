import { NextApiRequest, NextApiResponse } from 'next';

import {
  RegisterErrorResponse,
  RegisterPayload,
  RegisterResponse,
} from '@auth/core-register';
import { parsePayload, setSessionCookie } from '@shared/api-utils';
import {
  ApiError,
  ERR_INTERNAL,
  ERR_METHOD_NOT_ALLOWED,
} from '@shared/core-common';
import type { GenericResponse } from '@shared/core-common';

import { register } from '../rpc/register';
import { registerPreflight } from '../rpc/register-preflight';

export const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    RegisterResponse | RegisterErrorResponse | GenericResponse
  >,
) => {
  // Check request method
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: ERR_METHOD_NOT_ALLOWED, field: undefined });
  }

  try {
    // Parse payload as RegisterPayload
    const payload = await parsePayload<RegisterPayload>(req.body);

    // Register preflight (check if username, email, veil is available)
    await registerPreflight(payload);

    // Register in db
    const { session, accessToken } = await register(payload);

    // Set session cookie
    await setSessionCookie(res, session, accessToken);

    // Ok response
    return res.status(201).json({
      message: `Welcome ${session.firstName}`,
      session,
    });
  } catch (error) {
    // Throw api error
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.jsonBody());
    }

    // Defaults to internal error
    return res.status(500).json({ message: ERR_INTERNAL });
  }
};
