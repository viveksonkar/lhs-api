import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchOptionDto {
    @IsNumber()
    @IsOptional()
    userId: number;
    @IsOptional()
    @IsString()
    mobile: string;
}

export class SearcHandlerOptionDto {
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    mobile: string;
}