import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class AccessTokenError extends ResponseError {
  constructor(message = MESSAGE.INVALID_ACCESS_TOKEN) {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}
