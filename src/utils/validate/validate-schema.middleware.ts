import { NextFunction, Request, Response } from 'express';

import Joi, { ValidationOptions } from 'joi';

import { BadRequestResponse } from '@/http-response';
import { logger } from '@/utils';

const pick = (object: Record<string, any>, keys: string[]) =>
  keys.reduce((obj: any, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});

const validateSchemaMiddleware = (schema: any, body?: any, options?: ValidationOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validSchema = pick(schema, ['params', 'query', 'body']);
      const object = pick(req, Object.keys(validSchema));
      const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object, { abortEarly: false });

      if (error) {
        logger.error('Validate request has an error', {
          ...error,
        });

        const errorMessage = {};

        error.details.forEach((e: any) => {
          errorMessage[e.path[0]] = [...(errorMessage[e.path[0]] ?? []), e.message];
        });

        return new BadRequestResponse('Invalid request!', errorMessage).send(res);
      }

      Object.assign(req, value);

      return next();
    } catch (error: any) {
      logger.error('Validate request has an error', {
        ...error,
      });

      return new BadRequestResponse('Validate request has an error', error).send(res);
    }
  };
};

export { validateSchemaMiddleware };
