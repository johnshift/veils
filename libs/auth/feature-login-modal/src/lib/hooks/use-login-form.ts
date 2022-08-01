import {
  ChangeEventHandler,
  DispatchWithoutAction,
  useEffect,
  useState,
} from 'react';

import { useForm } from '@mantine/form';

import { ERR_INCORRECT_LOGIN, ERR_LOGIN_FAILED } from '@auth/core-login';
import type { LoginPayload } from '@auth/core-login';
import { useLoginMutation } from '@auth/data-login';
import { validatePassword, validatePrincipal } from '@auth/ui-login-form';
import { useNotify } from '@shared/util-common';

// We need type `InputProps` since we only need value and onChange fields
// returned by `@mantine/form` `getInputProps`.
// Error field will be controlled by `isRed` internal state.
type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

// UseLoginForm hook separates logic from ui
export const useLoginForm = (
  onClose: DispatchWithoutAction,
  fakeLoadingMs: number,
) => {
  // For login, we only give ambiguous error message
  // isRed is the indicator for an error in validation or mutation
  const [isRed, setIsRed] = useState(false);

  // We want login to remain as ambiguous as possible (for security)
  // But validation happens instantly, so we impolement
  // fakeLoading to give a sense of an actual request
  const [fakeLoading, setFakeLoading] = useState(false);

  // Login form controls
  const {
    errors: formErrors,
    values: formValues,
    getInputProps,
    onSubmit,
    reset,
  } = useForm<LoginPayload>({
    initialValues: { principal: '', password: '' },
    validate: {
      principal: validatePrincipal,
      password: validatePassword,
    },
  });

  const closeModal = () => {
    // Clear form
    reset();

    // Close modal
    onClose();
  };

  const {
    mutate,
    error: mutationError,
    isLoading,
  } = useLoginMutation(closeModal);

  // We want to turn off red borders if no validation error is present
  useEffect(() => {
    // Should only turn off if isRed is active and no validation/mutation errors
    const hasErrors =
      formErrors['principal'] ||
      formErrors['password'] ||
      Boolean(mutationError);
    if (isRed && !hasErrors) {
      setIsRed(false);
    }
  }, [formValues, formErrors, isRed, mutationError, reset]);

  // If validation error occurs, show loading notification
  // then show an error notification after delay
  const { notifyError } = useNotify();
  const handleError = (errors: typeof formErrors) => {
    if (errors['principal'] || errors['password']) {
      setFakeLoading(true);
      setTimeout(() => {
        setIsRed(true);
        notifyError(ERR_LOGIN_FAILED, ERR_INCORRECT_LOGIN);
        setFakeLoading(false);
      }, fakeLoadingMs);
    }
  };

  // Submit callback fn - we call mutate fn
  const handleSubmit = (data: typeof formValues) => mutate(data);

  // InputProps `value`, `onChange` props spread on input compoennts
  const principalInputProps = getInputProps('principal') as InputProps;
  const passwordInputProps = getInputProps('password') as InputProps;

  return {
    // Expose close modal with form clearing
    closeModal,

    // Expose input props
    principalInputProps,
    passwordInputProps,

    // We only want to show borders on api error or isRed
    isInvalid: mutationError?.message === ERR_INCORRECT_LOGIN || isRed,

    // Loading is either validation error fake-loading or mutation loading
    isLoading: fakeLoading || isLoading,

    // Make use of @mantine/form onSubmit handler
    onSubmit: onSubmit(handleSubmit, handleError),
  };
};
