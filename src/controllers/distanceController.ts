import { Request, Response, NextFunction } from 'express';
import * as geoService from '../services/geoService';
import * as distanceService from '../services/distanceService';
import InvalidPayloadError from '../errors/InvalidPayloadError';

export async function getDistances(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    const apiKey = req.query.key as string;
    const addressArray = req.body;

    if (!(addressArray instanceof Array) || addressArray.length < 2) {
      throw new InvalidPayloadError();
    }

    const locations = await Promise.all(
      addressArray.map((address: string) =>
        geoService.getLocation(address, apiKey)
      )
    );

    const distances = distanceService.getDistances(locations);

    return res.status(200).send(distances);
  } catch (err) {
    return _next(err);
  }
}
