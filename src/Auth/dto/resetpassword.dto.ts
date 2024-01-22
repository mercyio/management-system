import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, MinLength } from "class-validator"

export class ResetPasswordto {
    @IsNotEmpty()
    @IsString()
    @Length(5-12)
    @ApiProperty({type: String})
    newPassword: string


    @IsNotEmpty()
    @IsString()
    @Length(5-12)
    @ApiProperty({type: String})
    confirmPassword: string


}