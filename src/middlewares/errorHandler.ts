import { Request, Response, NextFunction } from 'express';

export default async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // eslint-disable-next-line no-console
  console.log(err);
  return res.sendStatus(500);
}
