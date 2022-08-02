// Constants
export {
  ERR_REGISTER_FAILED,
  MSG_REGISTER_OK,
  URL_API_AUTH_REGISTER,
  ERR_EMAIL_TAKEN,
  ERR_USERNAME_TAKEN,
  ERR_VEIL_TAKEN,
  RPC_REGISTER_PREFLIGHT,
} from './lib/constants';

// Dtos
export type {
  RegisterResponse,
  RegisterPayload,
  RegisterErrorResponse,
  RegisterPreflightResponse,
} from './lib/dto';

// Misc
export { RegisterFieldError } from './lib/misc';

// Error class
export { RegisterError } from './lib/errors';
