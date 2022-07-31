import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import {
  ERR_LOGOUT_FAILED,
  MSG_LOGOUT_DONE,
  MSG_LOGOUT_LOADING,
} from '@auth/core-logout/constants';
import {
  ID_LOGOUT_NOTIF,
  MSG_LOGOUT_OK,
  URL_API_AUTH_LOGOUT,
} from '@auth/core-logout/constants';
import { emptySession } from '@auth/core-session/empty-session';
import { GenericResponse } from '@shared/core-common/dto/generic-response';
import { apiFetch } from '@shared/util-common/api-fetch';

const logout = async () =>
  apiFetch<GenericResponse>('POST', URL_API_AUTH_LOGOUT);

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<GenericResponse, GenericResponse>(logout, {
    onMutate() {
      // Show loading notification
      showNotification({
        id: ID_LOGOUT_NOTIF,
        title: 'Loading',
        loading: true,
        message: MSG_LOGOUT_LOADING,
        autoClose: false,
        disallowClose: true,
      });
    },
    onSuccess() {
      // Update session query data
      queryClient.setQueryData(['session'], {
        ...emptySession,
      });

      // Display success message
      updateNotification({
        id: ID_LOGOUT_NOTIF,
        color: 'green',
        title: MSG_LOGOUT_OK,
        message: MSG_LOGOUT_DONE,
        icon: <IconCircleCheck />,
        autoClose: 2000,
      });
    },
    onError(error) {
      // Display error message
      updateNotification({
        id: ID_LOGOUT_NOTIF,
        title: ERR_LOGOUT_FAILED,
        message: error.message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
    },
  });
};
