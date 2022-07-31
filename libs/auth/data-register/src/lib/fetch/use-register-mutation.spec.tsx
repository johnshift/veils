import { setupServer } from 'msw/node';

import * as mantineNotifications from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import {
  ERR_REGISTER_FAILED,
  MSG_REGISTER_OK,
} from '@auth/core-register/constants';
import { emptySession } from '@auth/core-session/empty-session';
import {
  fakeRegisterPayload,
  mockRegisterResponse,
} from '@auth/util-test-register';
import { fakeSession } from '@auth/util-test-session';
import { ERR_NETWORK } from '@shared/core-common/constants';
import { TestWrapper, act, renderHook, waitFor } from '@shared/data-testutils';

import { useRegisterMutation } from './use-register-mutation';

// Mock mantine notification with actual for spy
jest.mock('@mantine/notifications', () => ({
  __esModule: true,
  ...jest.requireActual('@mantine/notifications'),
}));

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

describe('useRegisterMutation', () => {
  // Spy on mantin notifications
  const notifSpy = jest.spyOn(mantineNotifications, 'showNotification');
  // Mock payload
  const mockPayload = fakeRegisterPayload();

  test('error', async () => {
    // Mock error response
    const mockErrorMessage = ERR_REGISTER_FAILED;
    const body = {
      session: emptySession,
      message: mockErrorMessage,
    };
    mswServer.use(mockRegisterResponse(401, body));

    // Render Hook
    const closeModal = jest.fn();
    const { result } = renderHook(() => useRegisterMutation(closeModal), {
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
      title: ERR_REGISTER_FAILED,
      message: body.message,
      color: 'red',
      icon: <IconAlertCircle />,
    });
  });

  test('network error', async () => {
    // Spy on mantin notifications
    const notifSpy = jest.spyOn(mantineNotifications, 'showNotification');
    // Mock network error response
    mswServer.use(mockRegisterResponse(-1, undefined, true));

    // Mock payload
    const mockPayload = fakeRegisterPayload();

    // Render Hook
    const closeModal = jest.fn();
    const { result } = renderHook(() => useRegisterMutation(closeModal), {
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
      title: ERR_REGISTER_FAILED,
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
      message: MSG_REGISTER_OK,
      session: mockSession,
    };
    mswServer.use(mockRegisterResponse(200, body));

    // Render Hook
    const closeModal = jest.fn();
    const { result } = renderHook(() => useRegisterMutation(closeModal), {
      wrapper: TestWrapper,
    });

    // Mutate
    await act(async () => {
      result.current.mutate(mockPayload);
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
      title: MSG_REGISTER_OK,
      message: body.message,
      color: 'green',
      icon: <IconCircleCheck />,
    });
  });
});
