import { ApiError } from '@shared/core-common';

import { RegisterFieldError } from './misc';

export class RegisterError extends ApiError {
  // Used to identify which field display red borders
  // (undefined) means there's an error but no field to highlight e.g. 500 error
  field: RegisterFieldError | undefined;

  constructor(status: number, message: string, field?: RegisterFieldError) {
    super(status, message);
    this.field = field;

    // Required in typescript breaking change
    Object.setPrototypeOf(this, RegisterError.prototype);
  }

  override jsonBody() {
    return {
      message: this.message,
      field: this.field,
    };
  }
}
