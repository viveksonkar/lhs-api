import { UserRole } from '@/interfaces/user.interface';
import { IsEmail, IsString, IsOptional, IsEnum, IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class CreateUserDto { 
  @IsOptional()
  id: number

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsOptional()
  public mobile: string;

  @IsEnum(UserRole)
  public roleType: UserRole;
}