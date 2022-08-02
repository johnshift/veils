import { NextApiResponse } from 'next';

import { serialize } from 'cookie';

import { Session } from '@auth/core-session';
import { COOKEY_CSRF, COOKEY_SESSION } from '@shared/core-common';

import { defaultCookieOptions } from './default-cookie-options';
import { encryptSessionCookie } from './session-cipher';

export const setSessionCookie = async (
  res: NextApiResponse,
  session: Session,
  accessToken: string,
) => {
  // Generate session tokens
  const [sessionToken, csrfToken] = await encryptSessionCookie(
    accessToken,
    session,
  );

  // Create auth cookies
  const csrfCookie = serialize(COOKEY_CSRF, csrfToken, defaultCookieOptions);
  const sessionCookie = serialize(
    COOKEY_SESSION,
    sessionToken,
    defaultCookieOptions,
  );

  // Set cookies into response headers
  res.setHeader('Set-Cookie', [csrfCookie, sessionCookie]);
};
