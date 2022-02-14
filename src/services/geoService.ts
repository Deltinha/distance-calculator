import geocoding from '../adapters/geocodingApi';
import GeocodingError from '../errors/GeocodingError';

export async function getLocation(address: string, apiKey: string) {
  interface GeocodingResult {
    geometry: {
      location: { lat: number; lng: number };
    };
  }

  interface GeocodingData {
    results: GeocodingResult[];
    status: string;
    error_message?: string;
  }

  let result: GeocodingResult = {
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
  };

  function errHandler(data: GeocodingData) {
    if (data.status === 'ZERO_RESULTS') {
      throw new GeocodingError(`Could not find the address ${address}`);
    }

    throw new GeocodingError(data.error_message);
  }

  await geocoding.getCoordinates(address, apiKey).then(async (res) => {
    const data = res.data as GeocodingData;

    if (data.status === 'OK') {
      [result] = data.results;
    } else {
      errHandler(res.data as GeocodingData);
    }
  });

  return {
    address,
    location: result.geometry.location,
  };
}
