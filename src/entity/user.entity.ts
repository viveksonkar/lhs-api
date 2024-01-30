import { User, UserRole } from '@/interfaces/user.interface';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';


@Entity({ name: 'user' })
@Unique(['email'])
export class UserEntity extends BaseEntity implements User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  mobile: string;

  @Column({ nullable: true })
  password: string;

  @Column('varchar', { nullable: true })
  roleType: UserRole;

  @OneToMany(() => CustomerEntity, customer => customer.user, 
  { cascade: true, onDelete: "CASCADE", eager: true, nullable: true})
  customer: CustomerEntity[];

}