import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator"
import { UserRole } from "src/Auth/enum/role.enum"


export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(5-12)
    password: string
    
}
