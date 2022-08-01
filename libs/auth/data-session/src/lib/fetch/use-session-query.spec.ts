import { setupServer } from 'msw/node';

import { fakeSession, mockSessionResponse } from '@auth/util-test-session';
import { ERR_INTERNAL, ERR_NETWORK } from '@shared/core-common';
import { TestWrapper, renderHook, waitFor } from '@shared/data-testutils';

import { useSessionQuery } from './use-session-query';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

describe('useSessionQuery', () => {
  test('internal server error', async () => {
    // Mock internal error response
    const body = {
      message: ERR_INTERNAL,
    };
    mswServer.use(mockSessionResponse(500, body));

    // Render Hook
    const { result } = renderHook(() => useSessionQuery(), {
      wrapper: TestWrapper,
    });

    // Wait for response
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assertions
    expect(result.current.error?.message).toStrictEqual(body.message);
  });

  test('network error', async () => {
    // Mock network error response
    mswServer.use(mockSessionResponse(-1, undefined, true));

    // Render Hook
    const { result } = renderHook(() => useSessionQuery(), {
      wrapper: TestWrapper,
    });

    // Wait for response
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assertions
    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe(ERR_NETWORK);
  });

  test('error defaults to not loggedIn', async () => {
    // Mock error response
    const body = {
      message: 'Test Error',
    };
    mswServer.use(mockSessionResponse(400, body));

    // Render Hook
    const { result } = renderHook(() => useSessionQuery(), {
      wrapper: TestWrapper,
    });

    // Wait for response
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assertions
    expect(result.current.error?.message).toStrictEqual(body.message);
    expect(result.current.data?.id).toBeUndefined();
  });

  test('loggedIn', async () => {
    // Mock error response
    const body = fakeSession();
    mswServer.use(mockSessionResponse(200, body));

    // Render Hook
    const { result } = renderHook(() => useSessionQuery(), {
      wrapper: TestWrapper,
    });

    // Wait for response
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assertions
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toStrictEqual(body);
  });
});
