import { validatePassword } from './validate-password';

describe('validatePassword', () => {
  test('short', () => {
    expect(validatePassword('aaa')).toBeTruthy();
  });

  test('long', () => {
    expect(
      validatePassword(
        'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx',
      ),
    ).toBeTruthy();
  });

  test('min length', () => {
    expect(validatePassword('123456')).toBeNull();
  });

  test('max length', () => {
    expect(
      validatePassword(
        'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf',
      ),
    ).toBeNull();
  });
});
