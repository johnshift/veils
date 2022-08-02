/* eslint-disable camelcase */
import { createMocks } from 'node-mocks-http';

import { ERR_INCORRECT_LOGIN } from '@auth/core-login';
import { fakeLoginPayload } from '@auth/util-test-login';
import { fakeSession } from '@auth/util-test-session';
import * as apiUtils from '@shared/api-utils';
import type { MockApiRequest, MockApiResponse } from '@shared/core-common';
import {
  ERR_INTERNAL,
  ERR_INVALID_REQUEST,
  ERR_METHOD_NOT_ALLOWED,
} from '@shared/core-common';
import * as supabase from '@shared/supabase';

import { loginHandler } from './login-handler';

jest.mock('@shared/api-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@shared/api-utils'),
}));

describe('loginHandler', () => {
  test('checkMethod error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'GET',
    });

    // Handler
    await loginHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData().message).toBe(ERR_METHOD_NOT_ALLOWED);
  });

  test('parsePayload error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: '{"message":"test-message"' as unknown as Record<string, unknown>,
    });

    // Handler
    await loginHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_INVALID_REQUEST,
    });
  });

  test('getEmail error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeLoginPayload(false), // Use username
    });

    // Mock getEmail rpc no error but no email matched ( data = [])
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Handler
    await loginHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_INCORRECT_LOGIN,
    });
  });

  test('login error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeLoginPayload(), // Using email (bypass getEmail)
    });

    // Mock db signIn value
    jest.spyOn(supabase.anonClient.auth, 'signIn').mockResolvedValue({
      session: null,
      user: null,
      error: {
        status: 401,
        message: ERR_INCORRECT_LOGIN,
      },
    });

    // Handler
    await loginHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_INCORRECT_LOGIN,
    });
  });

  test('getSessionInfo error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeLoginPayload(), // Using email (bypass getEmail)
    });

    // Mock db signIn success
    const testAccessToken = 'test-access-token';
    jest.spyOn(supabase.anonClient.auth, 'signIn').mockResolvedValue({
      session: {
        access_token: testAccessToken,
        token_type: 'test-token-type',
        user: null,
      },
      user: null,
      error: null,
    });

    // Mock getSessionInfo error (no data returned)
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [],
      body: [],
      count: null,
      error: null,
      status: 200,
      statusText: 'test-status-text',
    });

    // Handler
    await loginHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_INTERNAL,
    });
  });

  test('internal error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeLoginPayload(), // Using email (bypass getEmail)
    });

    // Mock to throw non-ApiError for default error response
    jest.spyOn(apiUtils, 'parsePayload').mockImplementationOnce(() => {
      throw new Error('pakyu');
    });

    // Handler
    await loginHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData().message).toBe(ERR_INTERNAL);
  });

  test('success', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeLoginPayload(), // Using email (bypass getEmail)
    });

    // Mock db signIn success
    const testAccessToken = 'test-access-token';
    jest.spyOn(supabase.anonClient.auth, 'signIn').mockResolvedValue({
      session: {
        access_token: testAccessToken,
        token_type: 'test-token-type',
        user: null,
      },
      user: null,
      error: null,
    });

    // Mock getSessionInfo success
    const session = fakeSession();
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [session],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Handler
    await loginHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: `Welcome ${session.firstName}`,
      session,
    });
  });
});
