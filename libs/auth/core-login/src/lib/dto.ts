import { Session } from '@auth/core-session/types';
import type { GenericResponse } from '@shared/core-common/dto/generic-response';

export type LoginResponse = {
  session: Session;
} & GenericResponse;

export type LoginPayload = {
  principal: string;
  password: string;
};
