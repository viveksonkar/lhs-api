import { Customer } from "@/interfaces/customer.interface";
import { userInfo } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'customer'})
@Unique(['mobile'])
export class CustomerEntity extends BaseEntity implements Customer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { nullable: true })
    firstName: string;

    @Column('varchar', { nullable: true })
    lastName: string;
    
    @Column('varchar', { nullable: true })
    customerImage: string;

    @Column('varchar', { nullable: true })
    mobile: string;

    @Column('varchar', { nullable: true })
    address: string;

    @Column('varchar', { nullable: true })
    email: string;

    @ManyToOne(() => UserEntity, )
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

}