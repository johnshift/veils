// ParsePayload is used by handlers which expects req.body into some type T
// If body is undefined or empty, it returns an invalid request
// If body is an object type, it returns it immediately
import { ApiError, ERR_INVALID_REQUEST } from '@shared/core-common';

// The function tries to parse the payload as JSON and cast it to type T for ts
export const parsePayload = async <T>(body: T) => {
  // Check if body is empty
  if (!body || Object.keys(body as Record<string, unknown>).length === 0) {
    throw new ApiError(400, ERR_INVALID_REQUEST);
  }

  // If type is object, return immediately
  if (typeof body === 'object') {
    return body;
  }

  let parsed: T;
  try {
    parsed = JSON.parse(body as unknown as string) as T;
  } catch {
    throw new ApiError(400, ERR_INVALID_REQUEST);
  }

  return parsed;
};
