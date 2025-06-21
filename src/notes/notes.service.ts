import { Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-notes.dto';
import { UpdateNoteDto } from './dto/update-notes.dto';
import { Notes } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';
import { ReturnNoteDto } from './dto/return-notes.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) { }

  async createNote(createNoteDto: CreateNoteDto, userId: number): Promise<{ message: string }> {
    try {
      await this.prisma.notes.create({
        data: {
          ...createNoteDto,
          userId
        }
      });

      return { message: 'Nota criada com sucesso!' }
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar nota.');
    }
  }

  async findOneNote(noteId: number, userId: number): Promise<ReturnNoteDto> {

    try {
      const note = await this.prisma.notes.findFirst({
        where: { id: noteId, userId }
      });

      if (!note) {
        throw new NotFoundException('Nota não encontrada.');
      }

      return new ReturnNoteDto(note);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar nota.');
    }

  }

  async findAllNotesOfUser(userId: number): Promise<ReturnNoteDto[]> {
    try {
      return await this.prisma.notes.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar notas do usuário.');
    }
  }

  async updateNote(id: number, userId: number, updateNoteDto: UpdateNoteDto): Promise<Notes> {
    const note = await this.prisma.notes.findUnique({ where: { id } });

    if (!note || note.userId !== userId) {
      throw new NotFoundException('Nota não encontrada ou não pertence a este usuário.');
    }

    try {
      return await this.prisma.notes.update({
        where: { id },
        data: updateNoteDto
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar a nota.');
    }
  }

  async deleteNote(id: number, userId: number): Promise<{ message: string }> {
    const note = await this.prisma.notes.findUnique({ where: { id } });

    if (!note || note.userId !== userId) {
      throw new NotFoundException('Nota não encontrada ou não pertence a este usuário.');
    }

    try {
      await this.prisma.notes.delete({ where: { id } });
      return { message: 'Nota removida com sucesso.' };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar nota.');
    }
  }
}
