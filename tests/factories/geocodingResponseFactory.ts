import { faker } from '@faker-js/faker';

export function createGeocodingResult() {
  return {
    geometry: {
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
  };
}

export function createGeocodingResponse() {
  return {
    data: {
      results: [createGeocodingResult()],
      status: 'OK',
    },
  };
}
