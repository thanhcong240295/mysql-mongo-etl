import { Column, Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
