import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator"
import { UserRole } from "src/Auth/enum/role.enum"


export class SignupDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({type: String})
    firstname: string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({type: String })
    lastname: string

    @IsNotEmpty()
    @IsString()
    @Length(11)
    @ApiProperty({type: String })
    phonenumber: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({type: String })
    email: string

    @IsNotEmpty()
    @Length(5-12)
    @ApiProperty({type: String})
    password: string
    
    @IsOptional()
    @ApiProperty({type: String})
    role: UserRole
}
