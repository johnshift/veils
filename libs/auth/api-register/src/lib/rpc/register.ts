import { RegisterError } from '@auth/core-register';
import type { RegisterPayload } from '@auth/core-register';
import type { Session } from '@auth/core-session';
import { ERR_INTERNAL } from '@shared/core-common';
import { adminClient } from '@shared/supabase';

export const register = async (
  payload: RegisterPayload,
): Promise<{ session: Session; accessToken: string }> => {
  const { email, password, username, firstName, lastName, veil } = payload;

  // Need to use adminClient since we use triggers for tables requiring service_role
  const { session, error } = await adminClient.auth.signUp(
    { email: email.toLowerCase(), password },
    {
      data: {
        username: username.toLowerCase(),
        veil,
        firstName,
        lastName,
      },
    },
  );

  if (error) {
    throw new RegisterError(401, error.message, undefined);
  }

  if (!session) {
    console.error('register 500: No session returned after signup');
    throw new RegisterError(500, ERR_INTERNAL, undefined);
  }

  return {
    session: {
      id: session.user?.id as string,
      username,
      veil,
      firstName,
      lastName,
      avatar: '',
      veilAvatar: '',
    },
    accessToken: session.access_token,
  };
};
