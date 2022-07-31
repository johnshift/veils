import { URL_API_AUTH_LOGIN } from '@auth/core-login/constants';
import { LoginPayload, LoginResponse } from '@auth/core-login/dto';
import { apiFetch } from '@shared/util-common/api-fetch';

export const loginMutFn = async (payload: LoginPayload) =>
  apiFetch<LoginResponse, LoginPayload>('POST', URL_API_AUTH_LOGIN, payload);
