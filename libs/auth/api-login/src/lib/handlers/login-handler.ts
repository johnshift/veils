import { NextApiRequest, NextApiResponse } from 'next';

import { getSessionInfo } from '@auth/api-session';
import { LoginPayload, LoginResponse } from '@auth/core-login';
import { setSessionCookie } from '@shared/api-utils';
import { parsePayload } from '@shared/api-utils';
import {
  ApiError,
  ERR_INTERNAL,
  ERR_METHOD_NOT_ALLOWED,
} from '@shared/core-common';
import type { GenericResponse } from '@shared/core-common';

import { getEmail } from '../rpc/get-email';
import { login } from '../rpc/login';

export const loginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | GenericResponse>,
) => {
  // Check request method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: ERR_METHOD_NOT_ALLOWED });
  }

  try {
    // Parse payload as Loginpayload
    const { principal, password } = await parsePayload<LoginPayload>(req.body);

    // Retrieve email
    const email = await getEmail(principal);

    // Login user and retrieve access_token
    const accessToken = await login(email, password);

    // After login, retrieve session info using email
    const session = await getSessionInfo(email);

    // Set session cookie
    await setSessionCookie(res, session, accessToken);

    // Successful login
    return res
      .status(200)
      .json({ message: `Welcome ${session.firstName}`, session });
  } catch (error) {
    // Throw api error
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.jsonBody());
    }

    // Defaults to internal error
    return res.status(500).json({ message: ERR_INTERNAL });
  }
};
