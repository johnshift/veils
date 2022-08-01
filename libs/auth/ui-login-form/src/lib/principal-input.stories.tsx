import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';
import { ChangeEventHandler } from 'react';
import { useEffect } from 'react';

import { useForm } from '@mantine/form';

import {
  ERR_INCORRECT_LOGIN,
  ERR_LOGIN_FAILED,
  PLACEHOLDER_PRINCIPAL,
} from '@auth/core-login/constants';
import { LoginPayload } from '@auth/core-login/dto';
import { MSG_PLEASE_WAIT } from '@shared/core-common/constants';
import { useNotifyLoading } from '@shared/util-common/notify/use-notify-loading';

import { PrincipalInput } from './principal-input';
import { validatePrincipal } from './validation/validate-principal';

export default {
  title: 'auth/ui-login-form/PrincipalInput',
  component: PrincipalInput,
} as ComponentMeta<typeof PrincipalInput>;

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
      principal: validatePrincipal,
    },
  });

  // We want to turn off red borders if no validation error is present
  useEffect(() => {
    const hasErrors = formErrors['principal'] || formErrors['password'];
    // Should only turn off if no validation and mutation errors and isRed =true
    // if (!hasErrors && isRed && !mutationErrors) {
    if (!hasErrors && isRed) {
      setIsRed(false);
    }
  }, [formValues, formErrors, isRed]);

  const { notifyLoading, notifyError } = useNotifyLoading();

  const handleError = (errors: typeof formErrors) => {
    if (errors['principal'] || errors['password']) {
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

  const principalInputProps = getInputProps('principal') as {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };

  return (
    <form onSubmit={onSubmit(handleSubmit, handleError)}>
      <PrincipalInput
        isLoading={isLoading || fakeLoading}
        isInvalid={isRed}
        value={principalInputProps.value}
        onChange={principalInputProps.onChange}
      />
    </form>
  );
};

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Default = Template.bind({});

export const ErrorShort = Template.bind({});
ErrorShort.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByPlaceholderText(PLACEHOLDER_PRINCIPAL), 'xxx');
  await userEvent.keyboard('{Enter}');
};

export const ErrorLong = Template.bind({});
ErrorLong.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    canvas.getByPlaceholderText(PLACEHOLDER_PRINCIPAL),
    'asdfasdfasdfasdfasdfasdfasdfasdfx',
  );
  await userEvent.keyboard('{Enter}');
};

export const ErrorProfileId = Template.bind({});
ErrorProfileId.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByPlaceholderText(PLACEHOLDER_PRINCIPAL), 'asdf!');
  await userEvent.keyboard('{Enter}');
};

export const ErrorEmail = Template.bind({});
ErrorEmail.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByPlaceholderText(PLACEHOLDER_PRINCIPAL), 'x@i.o');
  await userEvent.keyboard('{Enter}');
};