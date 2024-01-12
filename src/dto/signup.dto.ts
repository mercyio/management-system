import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator"
import { UserRole } from "src/enum/role.enum"


export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    Username: string

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
