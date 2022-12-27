import { NextFunction } from 'express';

import { AsyncFunction } from './type';

export const CatchAsync =
  (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(execution(req, res, next)).catch((err) => next(err));
  };
