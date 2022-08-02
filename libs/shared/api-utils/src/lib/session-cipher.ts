import CryptoJS from 'crypto-js';
import { v4 } from 'uuid';

import type { Session } from '@auth/core-session';
import { ApiError, ERR_INTERNAL, ERR_UNAUTHORIZED } from '@shared/core-common';

// EncryptSessionCookie converts accessToken, session object and a csrf token -
// into an encrypted string that will be stored in cookie.
// This way, we only need to decrypt the session cookie (if there's any) -
// and avoid a roundtrip call to db instance.
export const encryptSessionCookie = async (
  accessToken: string,
  session: Session,
): Promise<[string, string]> => {
  // Get aes key from env
  const { AES_KEY } = process.env;
  if (!AES_KEY) {
    console.log('Missing env: AES_KEY');
    throw new ApiError(500, ERR_INTERNAL);
  }

  // Generate csrf token
  const csrfToken = v4();

  // Generate session token by encrypting accessToken, session and csrf token
  const sessionToken = CryptoJS.AES.encrypt(
    // Convert to json string for serialization
    JSON.stringify({ accessToken, session, csrfToken }),
    AES_KEY,
  ).toString();

  // Return sessionToken and csrfToken
  return [sessionToken, csrfToken];
};

// DecryptSessionCookie ...
export const decryptSessionCookie = async (
  encryptedToken?: string,
): Promise<[string, Session, string]> => {
  // Get aes key from env
  const { AES_KEY } = process.env;
  if (!AES_KEY) {
    console.log('Missing env: AES_KEY');
    throw new ApiError(500, ERR_INTERNAL);
  }

  // Throw unauthorized if no encrypted token
  if (!encryptedToken) {
    console.warn('decryptSessionCookie: No encryptedToken provied');
    throw new ApiError(403, ERR_UNAUTHORIZED);
  }

  // Decrypt token
  const decrypted = CryptoJS.AES.decrypt(encryptedToken, AES_KEY).toString(
    CryptoJS.enc.Utf8,
  );

  const { accessToken, session, csrfToken } = JSON.parse(decrypted) as {
    accessToken: string;
    session: Session;
    csrfToken: string;
  };

  // Return accessToken, session and csrfToken
  return [accessToken, session, csrfToken];
};
