import { Comments } from "@/interfaces/comments.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name: 'comments'})
export class CommentsEntity extends BaseEntity implements Comments {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    comment: string;

    @Column() 
    customerId: number;

}