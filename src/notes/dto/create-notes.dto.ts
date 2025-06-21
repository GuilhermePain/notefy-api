import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty({ message: 'O título é obrigatório.' })
    title: string;

    @IsString()
    @IsOptional()
    body?: string;
}
