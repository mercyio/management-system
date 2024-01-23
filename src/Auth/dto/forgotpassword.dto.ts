import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsString()
    // @MinLength(4)
    // @ApiProperty({type: String})
    email: string


}