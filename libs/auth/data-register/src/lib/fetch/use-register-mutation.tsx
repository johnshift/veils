import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DispatchWithoutAction } from 'react';

import { showNotification } from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons';
import { IconAlertCircle } from '@tabler/icons';

import {
  ERR_REGISTER_FAILED,
  MSG_REGISTER_OK,
  URL_API_AUTH_REGISTER,
} from '@auth/core-register';
import type {
  RegisterErrorResponse,
  RegisterPayload,
  RegisterResponse,
} from '@auth/core-register';
import { apiFetch } from '@shared/util-common';

const registerMutFn = async (payload: RegisterPayload) =>
  apiFetch<RegisterResponse, RegisterPayload>(
    'POST',
    URL_API_AUTH_REGISTER,
    payload,
  );

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
