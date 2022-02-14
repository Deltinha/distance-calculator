import { faker } from '@faker-js/faker';

export function createAddress(qty: number) {
  const addressArray = [];
  for (let i = 0; i < qty; i += 1) {
    addressArray.push(faker.address.streetAddress());
  }
  return addressArray;
}
