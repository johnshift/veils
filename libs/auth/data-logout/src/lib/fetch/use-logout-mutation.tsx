import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ERR_LOGOUT_FAILED,
  MSG_LOGOUT_DONE,
  MSG_LOGOUT_LOADING,
  MSG_LOGOUT_OK,
  URL_API_AUTH_LOGOUT,
} from '@auth/core-logout';
import { emptySession } from '@auth/core-session';
import type { GenericResponse } from '@shared/core-common';
import { apiFetch, useNotifyLoading } from '@shared/util-common';

const logout = async () =>
  apiFetch<GenericResponse>('POST', URL_API_AUTH_LOGOUT);

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
