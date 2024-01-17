import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator"
import { UserRole } from "src/Auth/enum/role.enum"


export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({type: String})
    email: string

    @IsNotEmpty()
    @Length(5-12)
    @ApiProperty({type: String})
    password: string
    
}
