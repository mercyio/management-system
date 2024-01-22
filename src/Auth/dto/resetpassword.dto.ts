import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class ResetPasswordto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @ApiProperty({type: String})
    newPassword: string


    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @ApiProperty({type: String})
    confirmPassword: string


}