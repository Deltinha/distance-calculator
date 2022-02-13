import geocoding from '../adapters/geocodingApi';
import { GeocodingData, GeocodingResult } from '../interfaces/geocoding';

export async function getLocation(address: string, apiKey: string) {
  let result: GeocodingResult = {
    formatted_address: '',
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
  };

  function resHandler(data: GeocodingData) {
    if (data.status === 'OK') {
      [result] = data.results;
    }
    if (data.status === 'REQUEST_DENIED') {
      throw new Error(data.error_message);
    }
  }

  await geocoding
    .getCoordinates(address, apiKey)
    .then((res) => {
      resHandler(res.data);
    })
    .catch((err) => {
      throw new Error(err.response);
    });

  const location = {
    address: result.formatted_address,
    location: result.geometry.location,
  };

  return location;
}
