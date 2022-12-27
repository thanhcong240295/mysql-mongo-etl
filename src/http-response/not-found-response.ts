import { Response } from 'express';

import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class NotFoundResponse extends ResponseSuccess {
  constructor(message = MESSAGE.NOT_FOUND) {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    return super.prepare<NotFoundResponse>(res, this);
  }
}
