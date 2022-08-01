import * as mantineNotifications from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import { act, renderHook, waitFor } from '@testing-library/react';

import { useNotify } from './use-notify';

// Mock mantine notification with actual for spy
jest.mock('@mantine/notifications', () => ({
  __esModule: true,
  ...jest.requireActual('@mantine/notifications'),
}));

describe('useNotify', () => {
  test('ok', async () => {
    // Render hook
    const { result } = renderHook(() => useNotify(), {
      wrapper: mantineNotifications.NotificationsProvider,
    });

    // Exec fn
    const { id, notifySuccess, notifyError } = result.current;

    // Assert returned values
    expect(id).toBeTruthy();
    expect(notifySuccess).toBeTruthy();
    expect(notifyError).toBeTruthy();

    // Assert success notification
    const successTitle = 'success-title';
    const successMsg = 'success-msg';
    const successSpy = jest.spyOn(mantineNotifications, 'showNotification');
    await act(() => result.current.notifySuccess(successTitle, successMsg));
    await waitFor(() => {
      expect(successSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: successTitle,
          message: successMsg,
          color: 'green',
          icon: <IconCircleCheck />,
          autoClose: 2000,
        }),
      );
    });

    // Assert error notification
    const errorTitle = 'error-title';
    const errorMsg = 'error-msg';
    const errorSpy = jest.spyOn(mantineNotifications, 'showNotification');
    await act(() => result.current.notifyError(errorTitle, errorMsg));
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: errorTitle,
          message: errorMsg,
          color: 'red',
          icon: <IconAlertCircle />,
        }),
      );
    });
  });
});
