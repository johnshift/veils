import { TestWrapper, renderHook } from '@shared/data-testutils';

import { useSessionContext } from './session-context';

describe('SessionContext', () => {
  test('useSessionContext', () => {
    const { result } = renderHook(() => useSessionContext(), {
      wrapper: TestWrapper,
    });

    const {
      id,
      username,
      veil,
      firstName,
      lastName,
      avatar,
      veilAvatar,
      isLoading,
      openedLoginModal,
      openLoginModal,
      closeLoginModal,
    } = result.current;

    expect(id).toBeFalsy();
    expect(username).toBeFalsy();
    expect(veil).toBeFalsy();
    expect(firstName).toBeFalsy();
    expect(lastName).toBeFalsy();
    expect(avatar).toBeFalsy();
    expect(veilAvatar).toBeFalsy();
    expect(isLoading).toBeFalsy();
    expect(openedLoginModal).toBeFalsy();
    expect(openLoginModal()).toBeNull();
    expect(closeLoginModal()).toBeNull();
  });
});
