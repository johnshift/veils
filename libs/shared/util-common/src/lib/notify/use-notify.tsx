import { v4 } from 'uuid';

import { showNotification } from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

export const useNotify = () => {
  const id = v4();

  // Success notification
  const notifySuccess = (title: string, message: string) => {
    showNotification({
      id,
      title,
      message,
      color: 'green',
      icon: <IconCircleCheck />,
      autoClose: 2000,
    });
  };

  // Error notification
  const notifyError = (title: string, message: string) => {
    showNotification({
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
    notifySuccess,
    notifyError,
  };
};
