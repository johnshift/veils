import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ERR_LOGOUT_FAILED,
  MSG_LOGOUT_DONE,
  MSG_LOGOUT_LOADING,
} from '@auth/core-logout/constants';
import { MSG_LOGOUT_OK, URL_API_AUTH_LOGOUT } from '@auth/core-logout/constants';
import { emptySession } from '@auth/core-session/empty-session';
import { GenericResponse } from '@shared/core-common/dto/generic-response';
import { apiFetch } from '@shared/util-common/api-fetch';
import { useNotifyLoading } from '@shared/util-common/notify/use-notify-loading';

const logout = async () => apiFetch<GenericResponse>('POST', URL_API_AUTH_LOGOUT);

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const { notifyLoading, notifySuccess, notifyError } = useNotifyLoading();

  return useMutation<GenericResponse, GenericResponse>(logout, {
    onMutate() {
      // Show loading notification
      notifyLoading(MSG_LOGOUT_LOADING);
    },
    onSuccess() {
      // Update session query data
      queryClient.setQueryData(['session'], {
        ...emptySession,
      });

      // Display success message
      notifySuccess(MSG_LOGOUT_OK, MSG_LOGOUT_DONE);
    },
    onError(error) {
      // Display error message
      notifyError(ERR_LOGOUT_FAILED, error.message);
    },
  });
};
