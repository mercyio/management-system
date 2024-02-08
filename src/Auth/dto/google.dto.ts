import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, MinLength } from "class-validator"

export class GoogleDto {
    @IsString()
    @IsNotEmpty()
    @Length(5)
    @ApiProperty({type: String})
    email: string;


}