import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @MinLength(8, { message: "Senha deve ter no mínimo 8 caracteres." })
    password: string;
}
