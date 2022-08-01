import { setupServer } from 'msw/node';

import * as mantineNotifications from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons';
import { IconCircleCheck } from '@tabler/icons';

import {
  ERR_INCORRECT_LOGIN,
  ERR_LOGIN_FAILED,
  MSG_LOGIN_OK,
} from '@auth/core-login';
import { fakeLoginPayload, mockLoginResponse } from '@auth/util-test-login';
import { fakeSession } from '@auth/util-test-session';
import { ERR_NETWORK } from '@shared/core-common';
import { TestWrapper, act, renderHook, waitFor } from '@shared/data-testutils';

import { useLoginMutation } from './use-login-mutation';

// Mock mantine notification with actual for spy
jest.mock('@mantine/notifications', () => ({
  __esModule: true,
  ...jest.requireActual('@mantine/notifications'),
}));

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => {
  mswServer.resetHandlers();
});

describe('useLoginMutation', () => {
  // Mock payload
  const mockPayload = fakeLoginPayload();

  test('error', async () => {
    // Spy on mantin notifications
    const notifSpy = jest.spyOn(mantineNotifications, 'showNotification');

    // Mock error response
    const mockErrorMessage = ERR_INCORRECT_LOGIN;
    const body = {
      message: mockErrorMessage,
    };
    mswServer.use(mockLoginResponse(401, body));

    // Render Hook
    const closeModal = jest.fn();
    const { result } = renderHook(() => useLoginMutation(closeModal), {
      wrapper: TestWrapper,
    });

    // Mutate
    await act(async () => {
      result.current.mutate(mockPayload);
    });

    // Assert error message
    await waitFor(() => {
      expect(result.current.error?.message).toBe(mockErrorMessage);
    });

    // Assert closeModal was not called
    expect(closeModal).toHaveBeenCalledTimes(0);

    // Assert notification
    expect(notifSpy).toHaveBeenCalledWith({
      title: ERR_LOGIN_FAILED,
      message: ERR_INCORRECT_LOGIN,
      color: 'red',
      icon: <IconAlertCircle />,
    });
  });

  test('network error', async () => {
    // Spy on mantin notifications
    const notifSpy = jest.spyOn(mantineNotifications, 'showNotification');

    // Mock network error response
    mswServer.use(mockLoginResponse(-1, undefined, true));

    // Mock payload
    const mockPayload = fakeLoginPayload();

    // Render Hook
    const closeModal = jest.fn();
    const { result } = renderHook(() => useLoginMutation(closeModal), {
      wrapper: TestWrapper,
    });

    // Mutate
    await act(async () => {
      result.current.mutate(mockPayload);
    });

    // Assert error message
    await waitFor(() => {
      expect(result.current.error?.message).toBe(ERR_NETWORK);
    });

    // Assert closeModal was not called
    expect(closeModal).toHaveBeenCalledTimes(0);

    // Assert notification
    expect(notifSpy).toHaveBeenCalledWith({
      title: ERR_LOGIN_FAILED,
      message: ERR_NETWORK,
      color: 'red',
      icon: <IconAlertCircle />,
    });
  });

  test('success', async () => {
    // Spy on mantin notifications
    const notifSpy = jest.spyOn(mantineNotifications, 'showNotification');

    // Mock success response
    const mockSession = fakeSession();
    const body = {
      message: MSG_LOGIN_OK,
      session: mockSession,
    };
    mswServer.use(mockLoginResponse(200, body));

    // Render Hook
    const closeModal = jest.fn();
    const { result } = renderHook(() => useLoginMutation(closeModal), {
      wrapper: TestWrapper,
    });

    // Mutate
    await act(async () => {
      result.current.mutate(mockPayload);
    });

    // Wait for response
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert no error message
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(body);
    });
    expect(result.current.error).toBeFalsy();

    // Assert closeModal was called
    expect(closeModal).toHaveBeenCalledTimes(1);

    // Assert notification
    expect(notifSpy).toHaveBeenCalledWith({
      title: MSG_LOGIN_OK,
      message: body.message,
      color: 'green',
      icon: <IconCircleCheck />,
    });
  });
});
