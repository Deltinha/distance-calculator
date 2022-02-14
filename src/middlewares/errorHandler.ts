import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import GeocodingError from '../errors/GeocodingError';
import InvalidPayloadError from '../errors/InvalidPayloadError';

export default async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof GeocodingError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof InvalidPayloadError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}
