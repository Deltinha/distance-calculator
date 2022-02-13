export interface GeocodingResult {
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
}

export interface GeocodingData {
  results: GeocodingResult[];
  status: string;
  error_message?: string;
}
