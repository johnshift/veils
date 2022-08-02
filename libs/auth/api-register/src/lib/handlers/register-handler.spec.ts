/* eslint-disable camelcase */
import { createMocks } from 'node-mocks-http';
import { v4 } from 'uuid';

import {
  ERR_USERNAME_TAKEN,
  RegisterError,
  RegisterFieldError,
} from '@auth/core-register';
import { fakeRegisterPayload } from '@auth/util-test-register';
import * as apiUtils from '@shared/api-utils';
import type { MockApiRequest, MockApiResponse } from '@shared/core-common';
import {
  ERR_INTERNAL,
  ERR_INVALID_REQUEST,
  ERR_METHOD_NOT_ALLOWED,
} from '@shared/core-common';
import * as supabase from '@shared/supabase';

import * as apiRegisterPreflight from '../rpc/register-preflight';
import { registerHandler } from './register-handler';

jest.mock('@shared/api-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@shared/api-utils'),
}));

jest.mock('../rpc/register-preflight', () => ({
  __esModule: true,
  ...jest.requireActual('../rpc/register-preflight'),
}));

jest.mock('@shared/supabase', () => ({
  __esModule: true,
  ...jest.requireActual('@shared/supabase'),
}));

describe('registerHandler', () => {
  test('checkMethod error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'GET',
    });

    // Handler
    await registerHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toStrictEqual({
      message: ERR_METHOD_NOT_ALLOWED,
    });
  });

  test('parsePayload error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: '{"message":"test-message"' as unknown as Record<string, unknown>,
    });

    // Handler
    await registerHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toStrictEqual({
      message: ERR_INVALID_REQUEST,
    });
  });

  test('default internal error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeRegisterPayload(),
    });

    // Mock registerPreflight to throw non-ApiError
    jest.spyOn(apiUtils, 'parsePayload').mockImplementationOnce(() => {
      throw new Error('some error only visible to server');
    });

    // Handler
    await registerHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      message: ERR_INTERNAL,
    });
  });

  test('registerPreflight error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeRegisterPayload(),
    });

    // Mock registerPreflight rpc username taken
    jest
      .spyOn(apiRegisterPreflight, 'registerPreflight')
      .mockImplementationOnce(() => {
        throw new RegisterError(
          400,
          ERR_USERNAME_TAKEN,
          RegisterFieldError.Username,
        );
      });

    // Handler
    await registerHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toStrictEqual({
      message: ERR_USERNAME_TAKEN,
      field: RegisterFieldError.Username,
    });
  });

  test('register error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: fakeRegisterPayload(),
    });

    // Mock registerPreflight success
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [
        {
          usernameTaken: false,
          emailTaken: false,
          veilTaken: false,
        },
      ],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Mock dbRegister error
    const testError = 'test-error';
    jest.spyOn(supabase.adminClient.auth, 'signUp').mockResolvedValue({
      session: null,
      user: null,
      error: {
        status: 400,
        message: testError,
      },
    });

    // Handler
    await registerHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toStrictEqual({
      message: testError,
    });
  });

  test('success', async () => {
    // Mock request
    const payload = fakeRegisterPayload();
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      body: payload,
    });

    // Mock registerPreflight success
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [
        {
          usernameTaken: false,
          emailTaken: false,
          veilTaken: false,
        },
      ],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Mock dbRegister success
    const testId = v4();
    const testAccessToken = 'test-access-token';
    jest.spyOn(supabase.adminClient.auth, 'signUp').mockResolvedValue({
      session: {
        access_token: testAccessToken,
        token_type: 'test-token-type',
        user: {
          id: testId,
          app_metadata: {
            provider: 'test-provider',
          },
          user_metadata: {},
          aud: 'test-aud',
          created_at: 'test-created-at',
        },
      },
      user: {
        id: testId,
        app_metadata: {
          provider: 'test-provider',
        },
        user_metadata: {},
        aud: 'test-aud',
        created_at: 'test-created-at',
      },
      error: null,
    });

    // Handler
    await registerHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toStrictEqual({
      message: `Welcome ${payload.firstName}`,
      session: {
        id: testId,
        username: payload.username,
        veil: payload.veil,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar: '',
        veilAvatar: '',
      },
    });
  });
});
