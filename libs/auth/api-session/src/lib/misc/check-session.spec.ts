import { v4 } from 'uuid';

import { emptySession } from '@auth/core-session';
import { fakeSession } from '@auth/util-test-session';
import { encryptSessionCookie } from '@shared/api-utils';

import { checkSession } from './check-session';

describe('checkSession', () => {
  test('undefined encrypted token', async () => {
    // Exec fn
    expect(await checkSession()).toStrictEqual(emptySession);
  });

  test('empty accessToken', async () => {
    // Mock args
    const accessToken = '';
    const session = fakeSession();

    const [testToken] = await encryptSessionCookie(accessToken, session);

    // Exec fn
    expect(await checkSession(testToken)).toStrictEqual(emptySession);
  });

  test('unparseable accessToken', async () => {
    // Mock args
    const accessToken = v4(); // Unparseable access token
    const session = fakeSession();
    const [testToken] = await encryptSessionCookie(accessToken, session);

    // Exec fn
    expect(await checkSession(testToken)).toStrictEqual(emptySession);
  });

  test('expired token', async () => {
    // Mock args
    const expiredAccessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInByb3BZIjoic3Y0bTlpMnJ5dmgya2t0M3FuN2VzZiJ9.eyJpc3MiOiIiLCJzdWIiOiIiLCJhdWQiOiIiLCJpYXQiOjE2NTY0NzQ0MzUsImV4cCI6MTY1NjQ3NDQzNX0.PAttN3s9bcqCyYh7P-z35c1HaKXs2opPxo3_VuvdijBbtzVQLNhLUfgxfoBzLKDJbpz7FnnjlCx3rp9rasifwx8hN-bs0N2YsMi7kVEmwaxPADGF3zlsxMFb6xYOOu7rwPlxBatkL2QasU_6WKjIOf2x0q-NVf968eQevJ_fX5b-UGqmTmS9wwYJ4dC-9fg0A1bkQZaq1-rpLah025atGOrA9rzCR9fDCa8idzxyKYpZYNAByT5vDPguYxPi2h7N8A1ncrjmL6_ZAc7mnZMzo0KeVN1HMK6V3hJW8oa4_HIAXiueiXCIlAhbIem31RzE9R92i8U1Y9xSuH42aOQRpw';
    const session = fakeSession();

    const [testToken] = await encryptSessionCookie(expiredAccessToken, session);

    // Exec fn
    expect(await checkSession(testToken)).toStrictEqual(emptySession);
  });

  test('not authenticated role', async () => {
    // Mock args
    const unauthenticatedAccessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInByb3BZIjoic3Y0bTlpMnJ5dmgya2t0M3FuN2VzZiJ9.eyJpc3MiOiIiLCJzdWIiOiIiLCJhdWQiOiIiLCJyb2xlIjoiIiwiaWF0IjoxNjU2NDc0NDM1LCJleHAiOjE2NjY0NzQ0MzV9.F7mnkImMm4wK7O2bMSxUsnhbFUjGzoVAulfXGvzI8yZ_rEV1pgDpUWmPsjD-ewL9qS1q1j0G7Dk5N-a_8L--wkMVl805D9eEIcW99Xe0KdsmjE7nXeQd-tYvorK7VjcLiI_o8RO-DTswx0FICuT4TqaNv8LB0SJceGLuNX7zmA1qKpuXGia99gzs20QjsvYwzMPIOCIO2Au2e_mMw0TzZIgvN1d5XnLmCq5eElzarBsUcHxDQDkoNrTQ-Y-pSjT2-yP-A1rYOFFM-EitCt1VIkMr-U7FGnIs7JAEPhIJAmoGMSHZ_7f4JvRd4Yy6LZ_0R7HWA53Jz0zPT35D0hXccw';
    const session = fakeSession();
    const [testToken] = await encryptSessionCookie(
      unauthenticatedAccessToken,
      session,
    );

    // Exec fn
    expect(await checkSession(testToken)).toStrictEqual(emptySession);
  });

  test('ok', async () => {
    // Mock args
    const authenticatedAccessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInByb3BZIjoic3Y0bTlpMnJ5dmgya2t0M3FuN2VzZiJ9.eyJpc3MiOiIiLCJzdWIiOiIiLCJhdWQiOiIiLCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTY1NjQ3NDQzNSwiZXhwIjoxNjY2NDc0NDM1fQ.oflnVEaVnllM3VuZfFh4I3ARlEmywcLkQgWAbLU9pU4YeoxaTTOv8wGLfhUjpbXXAn9lATeSDergF1XN-TIdNOiYUnYFgNbAi3fqDBzhwf6hnx4jaCXLngMj0Sk8I5zI4wrWIN61V1wqczW5pRXgMvGbqWFeP-DvusiEek3-HKvcV4v9bViXZ3XeMGgjMaY_rxRjfQ-veu1HuLfArEbYr2g2KgwFm7kSO5hqUqt4miL6B5Vl8P1YSk92nJ39FqG4Ei_CZyNEuc6iadEMUrql3Xz6_9mgx8eWzhtD_SkoMFOKIEAteytc8n8QsdANCzPNlh5CSdHA4uEEy6tAwqlpOQ';
    const session = fakeSession();

    const [testToken] = await encryptSessionCookie(
      authenticatedAccessToken,
      session,
    );

    // Exec fn
    expect(await checkSession(testToken)).toStrictEqual(session);
  });
});
