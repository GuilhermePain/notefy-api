import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    @MinLength(8, { message: "Senha deve ter no mínimo 8 caracteres." })
    password: string
}
