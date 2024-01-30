import { IsNumber, IsOptional, IsString } from "class-validator";

export class AddCommentsDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    comment: string;

    @IsNumber()
    customerId: number;
    
}