import { IsNotEmpty, IsString, IsEmail, MaxLength, Length } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    surname: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    username: string

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(30)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(6,30)
    password: string

}
