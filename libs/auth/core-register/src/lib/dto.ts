import { Session } from '@auth/core-session/types';
import { GenericResponse } from '@shared/core-common/dto/generic-response';

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
