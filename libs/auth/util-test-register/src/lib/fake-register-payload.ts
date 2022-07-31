import { faker } from '@faker-js/faker';

import { RegisterPayload } from '@auth/core-register/dto';

export const fakeRegisterPayload = (): RegisterPayload => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(16),
  username: faker.lorem.slug(2),
  veil: faker.lorem.slug(2),
});
