import express, { Express, NextFunction, Request, Response } from 'express';

import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import 'reflect-metadata';

import config from '@/config';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
  ResponseError,
  SuccessResponse,
} from '@/http-response';
import { authLimiter, awsClient, logger, validateSchemaMiddleware } from '@/utils';

import { DataTransferAdapter } from './adapter';
import { HttpRequestValidation } from './validation';

awsClient.configInstance();

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(json({ limit: '10mb' }));

// parse urlencoded request body
app.use(urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/webhooks', authLimiter);
}

// v1 api routes
app.post(
  '/webhooks',
  [validateSchemaMiddleware(HttpRequestValidation.validate())],
  (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start sync data: ${JSON.stringify(req.body)}`);

      const { id, method, table } = req.body;
      const dataTransferAdapter = new DataTransferAdapter(table, id, method);

      dataTransferAdapter.transformData();

      return new SuccessResponse('Sync data from MySQL to mongodb is started', {}).send(res);
    } catch (error: any) {
      logger.error(`Sync data from MySQL to mongodb has an error`, error.message);

      return next(new BadRequestError('Sync data from MySQL to mongodb has an error'));
    }
  },
);

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any) =>
  ResponseError.handle(new NotFoundError('Route not found'), res),
);

// handle error
app.use((err: any, req: any, res: any, next: NextFunction) => {
  logger.error('Response Error', err);

  if (err instanceof ResponseError) {
    next(ResponseError.handle(err, res));
  } else {
    next(ResponseError.handle(new InternalError(), res));
  }
});

export default app;
