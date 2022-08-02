import { createResponse } from 'node-mocks-http';
import { v4 } from 'uuid';

import { fakeSession } from '@auth/util-test-session';
import { COOKEY_CSRF, COOKEY_SESSION } from '@shared/core-common';
import type { MockApiResponse } from '@shared/core-common';

import { setSessionCookie } from './set-session-cookie';

describe('setSessionCookie', () => {
  test('ok', async () => {
    // Mock args
    const res = createResponse<MockApiResponse>();
    const session = fakeSession();
    const accessToken = v4();

    await setSessionCookie(res, session, accessToken);

    // Assert cookies present
    const cookies = res._getHeaders()['set-cookie'] as string[];
    expect(cookies[0].includes(COOKEY_CSRF)).toBeTruthy();
    expect(cookies[1].includes(COOKEY_SESSION)).toBeTruthy();
  });
});
