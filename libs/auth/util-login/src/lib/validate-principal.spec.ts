import { validatePrincipal } from './validate-principal';

describe('validatePrincipal', () => {
  test('short', () => {
    expect(validatePrincipal('aaa')).toBeTruthy();
  });

  test('long', () => {
    expect(validatePrincipal('asdfasdfasdfasdfasdfasdfasdfasdfx')).toBeTruthy();
  });

  test('regex profile id', () => {
    expect(validatePrincipal('asdf!')).toBeTruthy();
  });

  test('regex email', () => {
    expect(validatePrincipal('x@i.o')).toBeTruthy();
  });

  test('min length', () => {
    expect(validatePrincipal('asdf')).toBeNull();
  });

  test('max length', () => {
    expect(validatePrincipal('asdfasdfasdfasdfasdfasdfasdfasdf')).toBeNull();
  });

  test('valid profile id', () => {
    expect(validatePrincipal('username')).toBeNull();
  });

  test('valid email', () => {
    expect(validatePrincipal('demo@example.com')).toBeNull();
  });
});
