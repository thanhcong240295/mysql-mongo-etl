import { Document } from 'mongoose';

export interface IBaseModel extends Document {
  _id: string;
  create_date: Date;
  create_by: string;
  update_date: Date;
  update_by: string;
  is_delete: boolean;
}

export interface IQueryString {
  limit?: string;
  page?: string;
  sort?: 'asc' | 'desc';
  sort_fields?: string;
  select?: string;
  [key: string]: any;
  populate?: string;
  isAll?: boolean;
  include_id?: string;
}

export interface IPagination {
  total: number;
  limit: number;
  page: number;
  record: any[];
}
