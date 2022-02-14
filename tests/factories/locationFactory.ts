import { faker } from '@faker-js/faker';

export function createLocation() {
  return {
    address: faker.address.streetAddress(),
    location: {
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude()),
    },
  };
}
