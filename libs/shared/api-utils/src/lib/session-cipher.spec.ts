import { fakeSession } from '@auth/util-test-session';
import { ERR_INTERNAL, ERR_UNAUTHORIZED } from '@shared/core-common';

import { decryptSessionCookie, encryptSessionCookie } from './session-cipher';

describe('sessionCookieCipher', () => {
  // Reference env
  const PREV_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...PREV_ENV }; // Make a copy
  });

  afterEach(() => {
    process.env = PREV_ENV; // Restore
  });

  test('encrypt no aesKey throws 500', async () => {
    // Unset env
    process.env['AES_KEY'] = undefined;

    // Provide dummy data
    const accessToken = 'test-token';
    const session = fakeSession();

    // Assert throws error
    expect(encryptSessionCookie(accessToken, session)).rejects.toThrow(
      ERR_INTERNAL,
    );
  });

  test('decrypt no aesKey throws 500', async () => {
    // Provide dummy data
    const accessToken = 'test-token';
    const session = fakeSession();

    // Encrypt
    const encryptedToken = await encryptSessionCookie(accessToken, session);
    if (!encryptedToken) {
      throw new Error('No encrypted token generated');
    }

    // Destructure encryptedToken
    const [sessionToken] = encryptedToken;

    // Unset env
    process.env['AES_KEY'] = undefined;

    // Assert throws error
    expect(decryptSessionCookie(sessionToken)).rejects.toThrow(ERR_INTERNAL);
  });

  test('decrypt no encryptedToken throws unauthorized', async () => {
    // Assert throws error
    expect(decryptSessionCookie()).rejects.toThrow(ERR_UNAUTHORIZED);
  });

  test('ok', async () => {
    const accessToken = 'test-token';
    const session = fakeSession();

    // Encrypt session cookie
    const [sessionToken, csrfToken] = await encryptSessionCookie(
      accessToken,
      session,
    );

    // Decrypt session cookie
    const decryptedToken = await decryptSessionCookie(sessionToken);
    if (!decryptedToken) {
      throw new Error('No decrypted token generated');
    }

    // Destructure contents of decryptedToken
    const [accessToken2, session2, csrfToken2] = decryptedToken;

    // Assert equal values
    expect(accessToken).toEqual(accessToken2);
    expect(session).toEqual(session2);
    expect(csrfToken).toEqual(csrfToken2);
  });
});
