import { ERR_INTERNAL } from '@shared/core-common/constants';
import { GenericResponse } from '@shared/core-common/dto/generic-response';

// R = response type, P = payload type
export const apiFetch = async <R = GenericResponse, P = undefined>(
  method: 'GET' | 'POST',
  url: string,
  body?: P,
) => {
  // Use try-catch to handle network failures etc
  try {
    const res = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Parse response
    let jsonResponse;
    try {
      jsonResponse = await res.json();
    } catch {
      // Cannot parse json response
      throw new Error(ERR_INTERNAL);
    }

    // Succeess
    if (res.ok) {
      return jsonResponse as R;
    }

    // Throw any !ok api response
    throw jsonResponse;
  } catch (error) {
    // If error has message field, throw as is
    if ((error as GenericResponse).message) {
      throw error;
    }

    // Throw 500 as default
    throw new Error(ERR_INTERNAL);
  }
};
