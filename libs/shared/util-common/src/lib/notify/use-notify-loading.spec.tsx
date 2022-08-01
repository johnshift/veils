import * as mantineNotifications from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import { act, renderHook, waitFor } from '@testing-library/react';

import { useNotifyLoading } from './use-notify-loading';

// Mock mantine notification with actual for spy
jest.mock('@mantine/notifications', () => ({
  __esModule: true,
  ...jest.requireActual('@mantine/notifications'),
}));

describe('useNotifyLoading', () => {
  test('ok', async () => {
    // Render hook
    const { result } = renderHook(() => useNotifyLoading(), {
      wrapper: mantineNotifications.NotificationsProvider,
    });

    // Exec fn
    const { id, notifyLoading, notifySuccess, notifyError } = result.current;

    // Assert returned values
    expect(id).toBeTruthy();
    expect(notifyLoading).toBeTruthy();
    expect(notifySuccess).toBeTruthy();
    expect(notifyError).toBeTruthy();

    // Assert loading notification
    const loadingMsg = 'loading';
    const showNotifSpy = jest.spyOn(mantineNotifications, 'showNotification');
    const cleanNotifSpy = jest.spyOn(mantineNotifications, 'cleanNotifications');
    await act(() => result.current.notifyLoading(loadingMsg));
    await waitFor(() => {
      expect(showNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Loading',
          loading: true,
          message: loadingMsg,
          autoClose: false,
          disallowClose: true,
          color: 'blue',
        }),
      );
    });
    expect(cleanNotifSpy).toHaveBeenCalledTimes(1);

    // Assert success notification
    const successTitle = 'success-title';
    const successMsg = 'success-msg';
    const successSpy = jest.spyOn(mantineNotifications, 'updateNotification');
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
    const errorSpy = jest.spyOn(mantineNotifications, 'updateNotification');
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
