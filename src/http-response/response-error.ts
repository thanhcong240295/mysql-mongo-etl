import { Response } from 'express';

import config from '@/config';

import { AccessTokenErrorResponse } from './access-token-error-response';
import { AuthFailureResponse } from './auth-failure-response';
import { BadRequestResponse } from './bad-request-response';
import { ErrorType } from './enum';
import { ForbiddenResponse } from './forbidden-response';
import { InternalErrorResponse } from './internal-error-response';
import { NotFoundResponse } from './not-found-response';

export abstract class ResponseError extends Error {
  constructor(public type: ErrorType, public message: string = 'error') {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.type = type;
  }

  public static handle(err: ResponseError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (config.env === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}
