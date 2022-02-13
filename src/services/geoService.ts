import geocoding from '../adapters/geocodingApi';
import { GeocodingResult } from '../interfaces/geocodingResult';

export async function getLocation(address: string, apiKey: string) {
  let result: GeocodingResult = {
    formatted_address: '',
    geometry: {
      location: { lat: 0, lng: 0 },
    },
  };

  await geocoding
    .getCoordinates(address, apiKey)
    .then((res) => {
      [result] = res.data.results;
    })
    .catch(() => {
      throw new Error();
    });

  const location = {
    address: result.formatted_address,
    location: result.geometry.location,
  };

  return location;
}
