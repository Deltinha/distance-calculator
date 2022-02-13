export interface GeocodingResult {
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
}
