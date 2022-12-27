import { IBaseModel } from './base.type';

export interface IUserModel extends IBaseModel {
  email: string;
  username: string;
  nick_name: string;
  password: string;
}
