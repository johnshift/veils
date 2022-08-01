import type { Session } from '@auth/core-session';
import type { GenericResponse } from '@shared/core-common';

export type LoginResponse = {
  session: Session;
} & GenericResponse;

export type LoginPayload = {
  principal: string;
  password: string;
};
