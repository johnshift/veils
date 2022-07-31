import { URL_API_AUTH_REGISTER } from '@auth/core-register/constants';
import { RegisterPayload, RegisterResponse } from '@auth/core-register/dto';
import { apiFetch } from '@shared/util-common/api-fetch';

export const registerMutFn = async (payload: RegisterPayload) =>
  apiFetch<RegisterResponse, RegisterPayload>(
    'POST',
    URL_API_AUTH_REGISTER,
    payload,
  );
