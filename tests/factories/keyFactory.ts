import { faker } from '@faker-js/faker';

export function createKey() {
  return faker.datatype.uuid();
}
