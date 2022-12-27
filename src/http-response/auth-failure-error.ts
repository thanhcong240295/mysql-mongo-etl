import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class AuthFailureError extends ResponseError {
  constructor(message = MESSAGE.INVALID_CREDENTIALS) {
    super(ErrorType.UNAUTHORIZED, message);
  }
}
