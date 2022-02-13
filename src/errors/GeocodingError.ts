export default class GeocodingError extends Error {
  constructor(message: string) {
    super(message || 'Erro na Geocoding API');
    this.name = 'GeocodingError';
  }
}
