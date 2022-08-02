import { RPC_GET_SESSION_INFO, Session } from '@auth/core-session';
import { ApiError, ERR_INTERNAL } from '@shared/core-common';
import { adminClient } from '@shared/supabase';

// GetSessionInfo retrieves session data to be stored in session cookie
export const getSessionInfo = async (email: string) => {
  // Execute rpc (needs admin client since user_profile table needs service_role)
  const { data, error } = await adminClient.rpc<Session>(RPC_GET_SESSION_INFO, {
    emailinput: email,
  });

  // This is expected to work, if error meaning on supabase's end -> return 500
  if (error) {
    // Error is postgres error raised exception
    console.error(
      'getSessionInfo postgres error:',
      `\n\tcode=${error.code}`,
      `\n\tmsg=${error.message}`,
      `\n\thint=${error.hint}`,
      `\n\tdetails=${error.details}`,
    );
    throw new ApiError(500, ERR_INTERNAL);
  }

  if (!data || data.length === 0) {
    console.error('getSessionInfo did not return any data');
    throw new ApiError(500, ERR_INTERNAL);
  }

  // Return session
  return data[0];
};
