import { MAX_LENGTH_PRINCIPAL, MIN_LENGTH_PRINCIPAL } from '@auth/core-login';
import { REGEX_EMAIL, REGEX_PROFILE_ID } from '@shared/core-common';

export const validatePrincipal = (v: string): boolean | null => {
  const isInvalid =
    v.length < MIN_LENGTH_PRINCIPAL ||
    v.length > MAX_LENGTH_PRINCIPAL ||
    !(REGEX_PROFILE_ID.test(v) || REGEX_EMAIL.test(v));

  return isInvalid ? true : null;
};
