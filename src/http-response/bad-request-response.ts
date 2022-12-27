import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class BadRequestResponse extends ResponseSuccess {
  // eslint-disable-next-line no-unused-vars
  constructor(message = MESSAGE.BAD_PARAMETERS, private readonly data?: any) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}
