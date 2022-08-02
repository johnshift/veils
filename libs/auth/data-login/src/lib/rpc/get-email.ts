import { ERR_INCORRECT_LOGIN, RPC_GET_EMAIL } from '@auth/core-login';
import { ApiError, ERR_INTERNAL, REGEX_EMAIL } from '@shared/core-common';
import { adminClient } from '@shared/supabase';

// GetEmail retrieves email from db if user provided username for login
// This function handles strings to lowerCase
export const getEmail = async (principal: string): Promise<string> => {
  // If principal is already email, return immediately
  if (REGEX_EMAIL.test(principal)) {
    return principal.toLowerCase();
  }

  // Execute rpc (needs admin client since user_profile table needs service_role)
  const { data, error } = await adminClient.rpc<string>(RPC_GET_EMAIL, {
    principal: principal.toLowerCase(),
  });

  // This is expected to work, if error meaning on supabase's end -> return 500
  if (error) {
    // Error is postgres error raised exception
    console.error(
      'getEmailByUsername postgres error:',
      `\n\tcode=${error.code}`,
      `\n\tmsg=${error.message}`,
      `\n\thint=${error.hint}`,
      `\n\tdetails=${error.details}`,
    );
    throw new ApiError(500, ERR_INTERNAL);
  }

  // If no email matches principal, incorrect login
  if (!data || data.length === 0) {
    throw new ApiError(401, ERR_INCORRECT_LOGIN);
  }

  // If only 1 row returned, return email
  if (typeof data === 'string') {
    return (data as string).toLowerCase();
  }

  // Data returns an array, we select only first element
  return (data[0] as string).toLowerCase();
};
