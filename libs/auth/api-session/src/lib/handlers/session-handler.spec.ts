import { createMocks } from 'node-mocks-http';

import { emptySession } from '@auth/core-session';
import { fakeSession } from '@auth/util-test-session';
import { encryptSessionCookie } from '@shared/api-utils';
import { COOKEY_SESSION, ERR_METHOD_NOT_ALLOWED } from '@shared/core-common';
import type { MockApiRequest, MockApiResponse } from '@shared/core-common';

import { sessionHandler } from './session-handler';

describe('sessionHandler', () => {
  test('checkMethod error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
    });

    // Handler
    await sessionHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_METHOD_NOT_ALLOWED,
    });
  });

  test('no session cookie', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'GET',
    });

    // Handler
    await sessionHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(emptySession);
  });

  test('invalid session cookie', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'GET',
      cookies: {
        [COOKEY_SESSION]: 'some-invalid-cookie',
      },
    });

    // Handler
    await sessionHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(emptySession);
  });

  test('checkSession error', async () => {
    // Mock encrypted session
    const session = fakeSession();
    const accessToken = ''; // Empty access token
    const [sessionToken] = await encryptSessionCookie(accessToken, session);

    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'GET',
      cookies: {
        [COOKEY_SESSION]: sessionToken,
      },
    });

    // Handler
    await sessionHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(emptySession);
  });

  test('ok', async () => {
    // Mock encrypted session
    const session = fakeSession();
    const accessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInByb3BZIjoic3Y0bTlpMnJ5dmgya2t0M3FuN2VzZiJ9.eyJpc3MiOiIiLCJzdWIiOiIiLCJhdWQiOiIiLCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTY1NjQ3NDQzNSwiZXhwIjoxNjY2NDc0NDM1fQ.oflnVEaVnllM3VuZfFh4I3ARlEmywcLkQgWAbLU9pU4YeoxaTTOv8wGLfhUjpbXXAn9lATeSDergF1XN-TIdNOiYUnYFgNbAi3fqDBzhwf6hnx4jaCXLngMj0Sk8I5zI4wrWIN61V1wqczW5pRXgMvGbqWFeP-DvusiEek3-HKvcV4v9bViXZ3XeMGgjMaY_rxRjfQ-veu1HuLfArEbYr2g2KgwFm7kSO5hqUqt4miL6B5Vl8P1YSk92nJ39FqG4Ei_CZyNEuc6iadEMUrql3Xz6_9mgx8eWzhtD_SkoMFOKIEAteytc8n8QsdANCzPNlh5CSdHA4uEEy6tAwqlpOQ';
    const [sessionToken] = await encryptSessionCookie(accessToken, session);

    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'GET',
      cookies: {
        [COOKEY_SESSION]: sessionToken,
      },
    });

    // Handler
    await sessionHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(session);
  });
});
