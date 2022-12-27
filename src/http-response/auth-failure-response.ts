import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class AuthFailureResponse extends ResponseSuccess {
  constructor(message = MESSAGE.AUTHENTICATION_FAILURE) {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}
