import externalApi from '../../src/adapters/externalApi';
import GeocodingError from '../../src/errors/GeocodingError';
import * as geoService from '../../src/services/geoService';
import { createAddress } from '../factories/addressFactory';
import { createGeocodingResponse } from '../factories/geocodingResponseFactory';
import { createKey } from '../factories/keyFactory';

describe('get location tests', () => {
  it('tests if service returns a location of a given address', async () => {
    jest
      .spyOn(externalApi, 'get')
      .mockImplementationOnce(async (_url: string) =>
        createGeocodingResponse()
      );

    const promise = geoService.getLocation(createAddress(1)[0], createKey());

    await expect(promise).resolves.toEqual(
      expect.objectContaining({
        address: expect.any(String),
        location: expect.objectContaining({
          lat: expect.any(String),
          lng: expect.any(String),
        }),
      })
    );
  });

  it('tests if service throwns an error when the geocoding request fails', async () => {
    jest
      .spyOn(externalApi, 'get')
      .mockImplementationOnce(async (_url: string) => ({
        data: {
          status: 'ERROR',
        },
      }));

    const promise = geoService.getLocation(createAddress(1)[0], createKey());
    await expect(promise).rejects.toThrowError(GeocodingError);
  });
});
