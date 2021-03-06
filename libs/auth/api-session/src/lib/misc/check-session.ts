// CheckSession returns the session if present in encryptedToken
import { emptySession } from '@auth/core-session';
import { decryptSessionCookie } from '@shared/api-utils';
import { SupabaseAccessToken } from '@shared/supabase';

// Returns emptySession if no accessToken or expired
export const checkSession = async (encryptedToken?: string) => {
  // Return emptySession if no encrypted token
  if (!encryptedToken) {
    return emptySession;
  }

  // Decrypt token into access_token and session
  // If token cannot be decrypted, it automatically throws error
  // catched in handler which then returns as response
  const [accessToken, session] = await decryptSessionCookie(encryptedToken);

  // Parse accessToken
  let token: SupabaseAccessToken;
  try {
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    token = JSON.parse(
      Buffer.from(base64, 'base64').toString('binary'),
    ) as SupabaseAccessToken;
  } catch {
    // Token cannot be parsed -> not logged in
    // return empty id to indicate not logged in
    return emptySession;
  }

  const now = Math.floor(Date.now() / 1000);
  const validExp = now < token.exp; // Only valid is exp is in the future
  const authenticated = token.role === 'authenticated';

  // Only return currentUser if valid token and authenticated
  if (validExp && authenticated) {
    return session;
  }

  return emptySession;
};
