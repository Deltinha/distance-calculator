import { Request, Response, NextFunction } from 'express';
import * as geoService from '../services/geoService';

export async function calculateDistances(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const apiKey = req.query.key as string;
  const addressArray = req.body;

  const locations = await Promise.all(
    addressArray.map((address: string) =>
      geoService.getLocation(address, apiKey)
    )
  );

  return res.status(200).send(locations);
}
