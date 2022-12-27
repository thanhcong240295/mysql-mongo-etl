import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class TokenExpiredError extends ResponseError {
  constructor(message = MESSAGE.TOKEN_EXPIRED) {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}
