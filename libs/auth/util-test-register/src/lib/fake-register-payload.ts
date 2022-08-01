import { faker } from '@faker-js/faker';

import type { RegisterPayload } from '@auth/core-register';

export const fakeRegisterPayload = (): RegisterPayload => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(16),
  username: faker.lorem.slug(2),
  veil: faker.lorem.slug(2),
});
