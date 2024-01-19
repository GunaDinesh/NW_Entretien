import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    password: string;
}

export class Profile {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
}

export class AuthEntity {
    @ApiProperty()
    accessToken: string;
}
