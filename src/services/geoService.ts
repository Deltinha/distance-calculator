import geocoding from '../adapters/geocodingApi';
import GeocodingError from '../errors/GeocodingError';
import { GeocodingData, GeocodingResult } from '../interfaces/geocoding';

export async function getLocation(address: string, apiKey: string) {
  let result: GeocodingResult = {
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

      return {
        address,
        location: result.geometry.location,
      };
    }
    if (data.status === 'ZERO_RESULTS') {
      throw new GeocodingError(
        `Não foi possível encontrar o endereço ${address}`
      );
    }
    throw new GeocodingError(data.error_message);
  }

  await geocoding.getCoordinates(address, apiKey).then((res) => {
    resHandler(res.data);
  });
}
