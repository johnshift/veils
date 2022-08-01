import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';
import { ChangeEventHandler } from 'react';
import { useEffect } from 'react';

import { Box } from '@mantine/core';
import { useForm } from '@mantine/form';

import {
  ERR_INCORRECT_LOGIN,
  ERR_LOGIN_FAILED,
  PLACEHOLDER_PASSWORD,
} from '@auth/core-login/constants';
import { LoginPayload } from '@auth/core-login/dto';
import { MSG_PLEASE_WAIT } from '@shared/core-common/constants';
import { useNotifyLoading } from '@shared/util-common/notify/use-notify-loading';

import { PasswordInput } from './password-input';
import { validatePassword } from './validation/validate-password';

export default {
  title: 'auth/ui-login-form/PasswordInput',
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

type Props = {
  isLoading: boolean;
  fakeLoadingMs: number;
};

// Wrapper best approximates hook used in login-form container
const Wrapper = ({ isLoading = false, fakeLoadingMs = 1000 }: Props) => {
  // For login, we only give ambiguous error message
  // isRed is the indicator for an error in validation or mutation
  const [isRed, setIsRed] = useState(false);

  // We want login to remain as ambiguous as possible (for security)
  // But validation happens instantly, so we impolement
  // fakeLoading to give a sense of an actual request
  const [fakeLoading, setFakeLoading] = useState(false);

  const {
    errors: formErrors,
    values: formValues,
    getInputProps,
    onSubmit,
  } = useForm<LoginPayload>({
    initialValues: { principal: '', password: '' },
    validate: {
      password: validatePassword,
    },
  });

  // We want to turn off red borders if no validation error is present
  useEffect(() => {
    const hasErrors = formErrors['password'] || formErrors['password'];
    // Should only turn off if no validation and mutation errors and isRed =true
    // if (!hasErrors && isRed && !mutationErrors) {
    if (!hasErrors && isRed) {
      setIsRed(false);
    }
  }, [formValues, formErrors, isRed]);

  const { notifyLoading, notifyError } = useNotifyLoading();

  const handleError = (errors: typeof formErrors) => {
    if (errors['password'] || errors['password']) {
      setFakeLoading(true);
      notifyLoading(MSG_PLEASE_WAIT);
      setTimeout(() => {
        setIsRed(true);
        notifyError(ERR_LOGIN_FAILED, ERR_INCORRECT_LOGIN);
        setFakeLoading(false);
      }, fakeLoadingMs);
    }
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSubmit = () => ({});

  const passwordInputProps = getInputProps('password') as {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };

  return (
    <form onSubmit={onSubmit(handleSubmit, handleError)}>
      <Box sx={{ minWidth: '32ch' }}>
        <PasswordInput
          isLoading={isLoading || fakeLoading}
          isInvalid={isRed}
          value={passwordInputProps.value}
          onChange={passwordInputProps.onChange}
        />
      </Box>
    </form>
  );
};

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByPlaceholderText(PLACEHOLDER_PASSWORD), '123456');
  await userEvent.keyboard('{Enter}');
};

export const ErrorShort = Template.bind({});
ErrorShort.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByPlaceholderText(PLACEHOLDER_PASSWORD), '12345');
  await userEvent.keyboard('{Enter}');
};

export const ErrorLong = Template.bind({});
ErrorLong.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    canvas.getByPlaceholderText(PLACEHOLDER_PASSWORD),
    'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx',
  );
  await userEvent.keyboard('{Enter}');
};
