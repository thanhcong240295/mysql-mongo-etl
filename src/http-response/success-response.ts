import { Response } from 'express';

import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class SuccessResponse<T> extends ResponseSuccess {
  // eslint-disable-next-line no-unused-vars
  constructor(message: string, private readonly data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}
