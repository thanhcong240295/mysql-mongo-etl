import { Document } from 'mongoose';

export interface IBaseModel extends Document {
  _id: string;
  create_date: Date;
  create_by: string;
  update_date: Date;
  update_by: string;
  is_delete: boolean;
}
