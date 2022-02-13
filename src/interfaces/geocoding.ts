export interface GeocodingResult {
  geometry: {
    location: { lat: number; lng: number };
  };
}

export interface GeocodingData {
  results: GeocodingResult[];
  status: string;
  error_message?: string;
}
