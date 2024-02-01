import { IsNumber, IsOptional, IsString } from "class-validator";

export class DeleteMigrateDto {
    @IsString()
    @IsOptional()
    action?: string;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsOptional()
    @IsNumber()
    migratorId?: number;

}