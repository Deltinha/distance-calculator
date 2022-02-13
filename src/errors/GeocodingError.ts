export default class GeocodingError extends Error {
  constructor(message: string) {
    super(message || 'Geocoding API error');
    this.name = 'GeocodingError';

    Object.setPrototypeOf(this, GeocodingError.prototype);
  }
}
