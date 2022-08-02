import { NextApiRequest, NextApiResponse } from 'next';

import { Session, emptySession } from '@auth/core-session';
import { COOKEY_SESSION } from '@shared/core-common';
import { ERR_METHOD_NOT_ALLOWED, GenericResponse } from '@shared/core-common';

import { checkSession } from '../misc/check-session';

export const sessionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Session | GenericResponse>,
) => {
  // Check request method
  if (req.method !== 'GET') {
    return res.status(405).json({ message: ERR_METHOD_NOT_ALLOWED });
  }

  try {
    // Retrieve session from cookie (throws errors if any)
    const session = await checkSession(req.cookies[COOKEY_SESSION]);

    return res.status(200).json({ ...session });
  } catch {
    // We return 200 with empty session by default
    return res.status(200).json({ ...emptySession });
  }
};
