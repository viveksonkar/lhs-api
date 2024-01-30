import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @Column()
  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;
}
