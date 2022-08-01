import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '@auth/core-login/constants';

export const validatePassword = (v: string): boolean | null => {
  const isInvalid = v.length < MIN_LENGTH_PASSWORD || v.length > MAX_LENGTH_PASSWORD;

  return isInvalid ? true : null;
};
