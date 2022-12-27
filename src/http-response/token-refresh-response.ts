import { Response } from 'express';

import { ResponseStatus, StatusCode } from './enum';
import { ResponseSuccess } from './response-success';

/* eslint-disable no-unused-vars */
export class TokenRefreshResponse extends ResponseSuccess {
  constructor(
    message: string,
    private readonly accessToken: string,
    private readonly refreshToken: string,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
