import type { Session } from '@auth/core-session';
import type { GenericResponse } from '@shared/core-common';

import { RegisterFieldError } from './misc';

export type RegisterResponse = {
  session: Session;
} & GenericResponse;

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  veil: string;
};

export type RegisterErrorResponse = {
  message: string;
  field: RegisterFieldError | undefined;
};
