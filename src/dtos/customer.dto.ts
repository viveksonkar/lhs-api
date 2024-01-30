import { User } from "@/interfaces/user.interface";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AddCustomerDto {
    @IsNumber()
    @IsOptional()
    id: number

    @IsString()
    @IsOptional()
    customerImage?: string;

    @IsOptional()
    user: User;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    mobile: string;

    @IsString()
    email: string;

    @IsString()
    address: string;

}