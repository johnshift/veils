import { DispatchWithoutAction } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showNotification } from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import {
  ERR_REGISTER_FAILED,
  MSG_REGISTER_OK,
} from '@auth/core-register/constants';
import {
  RegisterErrorResponse,
  RegisterPayload,
  RegisterResponse,
} from '@auth/core-register/dto';

import { registerMutFn } from './register-mut-fn';

export const useRegisterMutation = (closeModal: DispatchWithoutAction) => {
  const queryClient = useQueryClient();

  return useMutation<RegisterResponse, RegisterErrorResponse, RegisterPayload>(
    registerMutFn,
    {
      onSuccess(data) {
        // Update session query data
        queryClient.setQueryData(['session'], {
          ...data.session,
        });

        // Close register modal
        closeModal();

        // Display success message
        showNotification({
          title: MSG_REGISTER_OK,
          message: data.message,
          color: 'green',
          icon: <IconCircleCheck />,
        });
      },
      onError(error) {
        // Display error message
        showNotification({
          title: ERR_REGISTER_FAILED,
          message: error.message,
          color: 'red',
          icon: <IconAlertCircle />,
        });
      },
    },
  );
};
