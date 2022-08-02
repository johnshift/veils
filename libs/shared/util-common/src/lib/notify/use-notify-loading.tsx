import { v4 } from 'uuid';

import {
  cleanNotifications,
  showNotification,
  updateNotification,
} from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import { MSG_LOADING } from '@shared/core-common';

export const useNotifyLoading = () => {
  const id = v4();

  // Loading notification
  const notifyLoading = (message: string) => {
    cleanNotifications();
    showNotification({
      id,
      color: 'blue',
      title: MSG_LOADING,
      message,
      loading: true,
      autoClose: false,
      disallowClose: true,
    });
  };

  // Success notification
  const notifySuccess = (title: string, message: string) => {
    updateNotification({
      id,
      title,
      message,
      color: 'green',
      icon: <IconCircleCheck />,
      autoClose: 4000,
    });
  };

  // Error notification
  const notifyError = (title: string, message: string) => {
    updateNotification({
      id,
      title,
      message,
      color: 'red',
      icon: <IconAlertCircle />,
      autoClose: 9000,
    });
  };

  return {
    id,
    notifyLoading,
    notifySuccess,
    notifyError,
  };
};
