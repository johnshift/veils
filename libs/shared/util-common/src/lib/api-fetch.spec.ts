import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { ERR_INTERNAL, ERR_NETWORK } from '@shared/core-common/constants';

import { apiFetch } from './api-fetch';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

describe('apiFetch', () => {
  // Mock url
  const testUrl = 'test-url';
  const testPayload = { testField: 'test-value' };

  test('get success', async () => {
    // Mock success response
    const response = { message: 'OK' };
    mswServer.use(
      rest.get(testUrl, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    );

    const res = await apiFetch<typeof response>('GET', testUrl);

    expect(res).toStrictEqual(response);
  });

  test('get api error', async () => {
    // Mock api error
    const response = { message: ERR_INTERNAL };
    mswServer.use(
      rest.get(testUrl, (_req, res, ctx) =>
        res(ctx.status(500), ctx.json(response)),
      ),
    );

    await apiFetch<typeof response>('GET', testUrl).catch((error) => {
      expect(error).toStrictEqual(response);
    });
  });

  test('get non-generic error', async () => {
    // Mock non-generic error (error response with no 'message' field)
    const response = { messageX: ERR_INTERNAL };
    mswServer.use(
      rest.get(testUrl, (_req, res, ctx) =>
        res(ctx.status(500), ctx.json(response)),
      ),
    );

    await apiFetch<typeof response>('GET', testUrl).catch((error) => {
      expect(error.message).toBe(ERR_INTERNAL);
    });
  });

  test('get network error', async () => {
    // Mock a non GenerucResponse type
    mswServer.use(
      rest.get(testUrl, (_req, res, _ctx) => res.networkError('network error')),
    );

    await apiFetch('GET', testUrl).catch((error) => {
      expect(error.message).toBe(ERR_NETWORK);
    });
  });

  test('get unparseable json', async () => {
    // Mock unparseable json (missing bracket)
    const unparseable = '{ message: "OK"';
    mswServer.use(
      rest.get(testUrl, (_req, res, ctx) =>
        res(ctx.status(200), ctx.body(unparseable)),
      ),
    );

    await apiFetch('GET', testUrl).catch((error) => {
      expect(error.message).toBe(ERR_INTERNAL);
    });
  });

  test('post success', async () => {
    // Mock success response
    const response = { message: 'OK' };
    mswServer.use(
      rest.post(testUrl, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    );

    const res = await apiFetch<typeof response, typeof testPayload>(
      'POST',
      testUrl,
      testPayload,
    );

    expect(res).toStrictEqual(response);
  });

  test('post api error', async () => {
    // Mock api error
    const response = { message: ERR_INTERNAL };
    mswServer.use(
      rest.post(testUrl, (_req, res, ctx) =>
        res(ctx.status(500), ctx.json(response)),
      ),
    );

    await apiFetch<typeof response, typeof testPayload>(
      'POST',
      testUrl,
      testPayload,
    ).catch((error) => {
      expect(error).toStrictEqual(response);
    });
  });

  test('post non-generic error', async () => {
    // Mock non-generic error (error response with no 'message' field)
    const response = { messageX: ERR_INTERNAL };
    mswServer.use(
      rest.post(testUrl, (_req, res, ctx) =>
        res(ctx.status(500), ctx.json(response)),
      ),
    );

    await apiFetch<typeof response, typeof testPayload>(
      'POST',
      testUrl,
      testPayload,
    ).catch((error) => {
      expect(error.message).toBe(ERR_INTERNAL);
    });
  });

  test('post network error', async () => {
    // Mock a non GenerucResponse type
    mswServer.use(
      rest.post(testUrl, (_req, res, _ctx) =>
        res.networkError('network error'),
      ),
    );

    await apiFetch('POST', testUrl, testPayload).catch((error) => {
      expect(error.message).toBe(ERR_NETWORK);
    });
  });

  test('post unparseable json', async () => {
    // Mock unparseable json (missing bracket)
    const unparseable = '{ message: "OK"';
    mswServer.use(
      rest.post(testUrl, (_req, res, ctx) =>
        res(ctx.status(200), ctx.body(unparseable)),
      ),
    );

    await apiFetch('POST', testUrl, testPayload).catch((error) => {
      expect(error.message).toBe(ERR_INTERNAL);
    });
  });
});
