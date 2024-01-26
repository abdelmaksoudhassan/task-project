import { IsEmail, MinLength } from "class-validator"

export class CreatePersonDto {
    @IsEmail()
    email: string

    @MinLength(5)
    password: string
}