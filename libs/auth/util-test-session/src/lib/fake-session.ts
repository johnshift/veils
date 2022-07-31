import { faker } from '@faker-js/faker';

import { Session } from '@auth/core-session/types';

export const fakeSession = (): Session => ({
  id: faker.datatype.uuid(),
  username: faker.lorem.slug(2),
  veil: faker.lorem.slug(2),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  veilAvatar: faker.image.avatar(),
});
