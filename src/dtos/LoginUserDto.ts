import { IsEmail, IsOptional, IsString } from "class-validator";

export class LoginUserDto {
  
    @IsEmail()
    public email: string;
  
    @IsString()
    public password: string;

    @IsOptional()
    public roleType: string;
  
}