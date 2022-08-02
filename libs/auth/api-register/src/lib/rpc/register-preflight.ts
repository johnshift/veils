import {
  ERR_EMAIL_TAKEN,
  ERR_USERNAME_TAKEN,
  ERR_VEIL_TAKEN,
  RPC_REGISTER_PREFLIGHT,
  RegisterError,
  RegisterFieldError,
  RegisterPayload,
  RegisterPreflightResponse,
} from '@auth/core-register';
import { ERR_INTERNAL } from '@shared/core-common';
import { adminClient } from '@shared/supabase';

export const registerPreflight = async (payload: RegisterPayload) => {
  const { username, email, veil } = payload;

  const { data, error } = await adminClient.rpc<RegisterPreflightResponse>(
    RPC_REGISTER_PREFLIGHT,
    {
      usernameInput: username,
      emailInput: email,
      veilInput: veil,
    },
  );

  // Return 500 if error, or no-error + no-data
  if (error || (!error && data.length === 0)) {
    console.error('registerPreflight 500: error =', error, 'data =', data);
    throw new RegisterError(500, ERR_INTERNAL, undefined);
  }

  const { usernameTaken, emailTaken, veilTaken } = data[0];

  if (usernameTaken) {
    throw new RegisterError(
      400,
      ERR_USERNAME_TAKEN,
      RegisterFieldError.Username,
    );
  }

  if (emailTaken) {
    throw new RegisterError(400, ERR_EMAIL_TAKEN, RegisterFieldError.Email);
  }

  if (veilTaken) {
    throw new RegisterError(400, ERR_VEIL_TAKEN, RegisterFieldError.Veil);
  }
};
