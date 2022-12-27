import { Response } from 'express';

import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

export class AccessTokenErrorResponse extends ResponseSuccess {
  private readonly instruction = 'refresh_token';

  constructor(message = MESSAGE.ACCESS_TOKEN_INVALID) {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}
