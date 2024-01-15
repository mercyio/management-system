import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator"
import { UserRole } from "src/enum/role.enum"


export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    firstname: string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    lastname: string

    @IsNotEmpty()
    @IsString()
    @Length(11)
    phonenumber: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(5-12)
    password: string
    
    @IsOptional()
    role: UserRole
}
