import './setup';

import express, { Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import * as distanceController from './controllers/distanceController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.send('OK!');
});

app.get('/distance', distanceController.getDistances);

app.use(errorHandler);

export default app;
