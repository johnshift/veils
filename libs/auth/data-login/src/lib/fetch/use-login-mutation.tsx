import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DispatchWithoutAction } from 'react';

import { showNotification } from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import {
  ERR_LOGIN_FAILED,
  MSG_LOGIN_OK,
  URL_API_AUTH_LOGIN,
} from '@auth/core-login';
import type { LoginPayload, LoginResponse } from '@auth/core-login';
import type { GenericResponse } from '@shared/core-common';
import { apiFetch } from '@shared/util-common';

const loginMutFn = async (payload: LoginPayload) =>
  apiFetch<LoginResponse, LoginPayload>('POST', URL_API_AUTH_LOGIN, payload);

export const useLoginMutation = (closeModal: DispatchWithoutAction) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, GenericResponse, LoginPayload>(loginMutFn, {
    onSuccess(data) {
      // Update session query data
      queryClient.setQueryData(['session'], {
        ...data.session,
      });

      // Close login modal
      closeModal();

      // Display success message
      showNotification({
        title: MSG_LOGIN_OK,
        message: data.message,
        color: 'green',
        icon: <IconCircleCheck />,
      });
    },
    onError(error) {
      // Display error message
      showNotification({
        title: ERR_LOGIN_FAILED,
        message: error.message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
    },
  });
};
