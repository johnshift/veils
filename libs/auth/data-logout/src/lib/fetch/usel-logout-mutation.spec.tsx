import { setupServer } from 'msw/node';

import * as mantineNotifications from '@mantine/notifications';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons';

import {
  ERR_LOGOUT_FAILED,
  MSG_LOGOUT_LOADING,
  MSG_LOGOUT_OK,
} from '@auth/core-logout/constants';
import { mockLogoutResponse } from '@auth/util-test-logout';
import { ERR_INTERNAL, ERR_NETWORK } from '@shared/core-common/constants';
import { TestWrapper, act, renderHook, waitFor } from '@shared/data-testutils';

import { useLogoutMutation } from './use-logout-mutation';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

// Mock mantine notification with actual for spy
jest.mock('@mantine/notifications', () => ({
  __esModule: true,
  ...jest.requireActual('@mantine/notifications'),
}));

describe('useLogoutMutation', () => {
  test('error', async () => {
    // Spy on mantine notifications
    const showNotifSpy = jest.spyOn(mantineNotifications, 'showNotification');
    const updateNotifSpy = jest.spyOn(mantineNotifications, 'updateNotification');

    // Mock error response
    const mockStatus = 500;
    const mockErrorMessage = ERR_INTERNAL;
    const body = {
      message: mockErrorMessage,
    };
    mswServer.use(mockLogoutResponse(mockStatus, body));

    // Render Hook
    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: TestWrapper,
    });

    // Mutate
    await act(async () => {
      result.current.mutate();
    });

    // Assert loading message

    // Assert error message
    await waitFor(() => {
      expect(result.current.error?.message).toBe(mockErrorMessage);
    });

    // Assert notification
    expect(showNotifSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Loading',
        loading: true,
        message: MSG_LOGOUT_LOADING,
        autoClose: false,
        disallowClose: true,
        color: 'blue',
      }),
    );
    expect(updateNotifSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: ERR_LOGOUT_FAILED,
        message: mockErrorMessage,
        color: 'red',
        icon: <IconAlertCircle />,
      }),
    );
  });

  test('network error', async () => {
    // Spy on mantine notifications
    const showNotifSpy = jest.spyOn(mantineNotifications, 'showNotification');
    const updateNotifSpy = jest.spyOn(mantineNotifications, 'updateNotification');

    // Mock network error response
    mswServer.use(mockLogoutResponse(-1, undefined, true));

    // Render Hook
    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: TestWrapper,
    });

    // Mutate
    await act(async () => {
      result.current.mutate();
    });

    // Assert error message
    await waitFor(() => {
      expect(result.current.error?.message).toBe(ERR_NETWORK);
    });

    // Assert notification
    expect(showNotifSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Loading',
        loading: true,
        message: MSG_LOGOUT_LOADING,
        autoClose: false,
        disallowClose: true,
        color: 'blue',
      }),
    );
    expect(updateNotifSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: ERR_LOGOUT_FAILED,
        message: ERR_NETWORK,
        color: 'red',
        icon: <IconAlertCircle />,
      }),
    );
  });

  test('success', async () => {
    // Spy on mantine notifications
    const showNotifSpy = jest.spyOn(mantineNotifications, 'showNotification');
    const updateNotifSpy = jest.spyOn(mantineNotifications, 'updateNotification');

    // Mock success response
    const body = {
      message: 'OK',
    };
    mswServer.use(mockLogoutResponse(200, body));

    // Render Hook
    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: TestWrapper,
    });

    // Mutate
    await act(async () => {
      result.current.mutate();
    });

    // Assert no error message
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(body);
    });
    expect(result.current.error).toBeFalsy();

    // Assert notification

    // Assert notification
    expect(showNotifSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Loading',
        loading: true,
        message: MSG_LOGOUT_LOADING,
        autoClose: false,
        disallowClose: true,
        color: 'blue',
      }),
    );
    expect(updateNotifSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'green',
        title: MSG_LOGOUT_OK,
        message: 'You have been logged out',
        icon: <IconCircleCheck />,
        autoClose: 2000,
      }),
    );
  });
});
