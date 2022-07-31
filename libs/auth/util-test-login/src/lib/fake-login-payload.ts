import { faker } from '@faker-js/faker';

import { LoginPayload } from '@auth/core-login/dto';

export const fakeLoginPayload = (useEmail = true): LoginPayload => ({
  principal: useEmail ? faker.internet.email() : faker.lorem.slug(2),
  password: faker.internet.password(16),
});
