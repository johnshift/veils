import { NextApiRequest, NextApiResponse } from 'next';

import { v4 } from 'uuid';

import { MSG_LOGOUT_OK } from '@auth/core-logout';
import { emptySession } from '@auth/core-session';
import { decryptSessionCookie, setSessionCookie } from '@shared/api-utils';
import {
  ApiError,
  COOKEY_SESSION,
  ERR_INTERNAL,
  ERR_METHOD_NOT_ALLOWED,
} from '@shared/core-common';
import type { GenericResponse } from '@shared/core-common';

import { logout } from '../rpc/logout';

export const logoutHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GenericResponse>,
) => {
  // Check request method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: ERR_METHOD_NOT_ALLOWED });
  }

  try {
    const [accessToken] = await decryptSessionCookie(
      req.cookies[COOKEY_SESSION],
    );

    // Logout in supabase
    await logout(accessToken);

    // Unset session and access token in session-cookie
    await setSessionCookie(res, emptySession, v4());

    // Return ok status
    return res.status(200).json({ message: MSG_LOGOUT_OK });
  } catch (error) {
    // Throw api error
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.jsonBody());
    }

    // Defaults to internal error
    console.log(
      'sessionHandler default internal error =',
      (error as Error).message,
    );
    return res.status(500).json({ message: ERR_INTERNAL });
  }
};
