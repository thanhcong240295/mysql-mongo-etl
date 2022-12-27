import { MESSAGE } from './constants';
import { ErrorType } from './enum';
import { ResponseError } from './response-error';

export class BadRequestError extends ResponseError {
  constructor(message = MESSAGE.BAD_REQUEST) {
    super(ErrorType.BAD_REQUEST, message);
  }
}
