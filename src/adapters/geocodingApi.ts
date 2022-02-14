import api from './externalApi';

export default class GeocodingApi {
  static getCoordinates(address: string, apiKey: string) {
    const encodedAddress = encodeURIComponent(address);

    return api.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );
  }
}
