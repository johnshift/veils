import { faker } from '@faker-js/faker';

import type { LoginPayload } from '@auth/core-login';

export const fakeLoginPayload = (useEmail = true): LoginPayload => ({
  principal: useEmail ? faker.internet.email() : faker.lorem.slug(2),
  password: faker.internet.password(16),
});
