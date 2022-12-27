import { NextFunction, Request, Response } from 'express';

import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import path from 'path';

import { BadRequestResponse, BadTokenError } from '@/http-response';

const verifyIdToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = readFileSync(path.resolve(__dirname, '../../config/jwks.json')) as any;

    const authorization = req.headers?.['authorization'] as string;

    if (!authorization) {
      return new BadRequestResponse('Missing token.').send(res);
    }

    const token = authorization.split(' ')[1];

    const pem = jwkToPem(JSON.parse(data));

    const auth = jwt.verify(token, pem, { algorithms: ['RS256'] });

    res.locals.auth = auth;

    return next();
  } catch (error: any) {
    return next(new BadTokenError(error.message));
  }
};

export const validateTokenMiddleware = {
  verifyIdToken,
};
