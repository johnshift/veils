import { DispatchWithoutAction } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showNotification } from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import { ERR_LOGIN_FAILED, MSG_LOGIN_OK } from '@auth/core-login/constants';
import { LoginPayload, LoginResponse } from '@auth/core-login/dto';
import { GenericResponse } from '@shared/core-common/dto/generic-response';

import { loginMutFn } from './login-mut-fn';

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
