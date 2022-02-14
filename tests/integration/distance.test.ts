import supertest from 'supertest';
import app from '../../src/app';
import * as geoService from '../../src/services/geoService';
import { createLocation } from '../factories/locationFactory';
import { createAddress } from '../factories/addressFactory';
import { createKey } from '../factories/keyFactory';

const agent = supertest(app);

describe('get distance', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('tests if the response has status 200 when payload and apiKey are valid', async () => {
    jest
      .spyOn(geoService, 'getLocation')
      .mockImplementation(async () => createLocation());

    const response = await agent.get('/distance').send(createAddress(3)).query({
      key: createKey(),
    });

    expect(response.status).toBe(200);
  });
  it('tests if the body of the response has a valid format', async () => {
    jest
      .spyOn(geoService, 'getLocation')
      .mockImplementation(async () => createLocation());

    const response = await agent.get('/distance').send(createAddress(3)).query({
      key: createKey(),
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        farestDistance: expect.objectContaining({
          addresses: expect.arrayContaining([expect.any(String)]),
          distance: expect.any(String),
        }),
        shortestDistance: expect.objectContaining({
          addresses: expect.arrayContaining([expect.any(String)]),
          distance: expect.any(String),
        }),
        allDistances: expect.arrayContaining([
          expect.objectContaining({
            addresses: expect.arrayContaining([expect.any(String)]),
            distance: expect.any(String),
          }),
        ]),
      })
    );
  });
  it('tests if the response has status 400 when payload has no address', async () => {
    const response = await agent.get('/distance').send([]).query({
      key: createKey(),
    });

    expect(response.status).toBe(400);
  });
  it('tests if the response has status 400 when payload has less than 2 addresses', async () => {
    const response = await agent.get('/distance').send([]).query({
      key: createKey(),
    });

    expect(response.status).toBe(400);
  });
});
