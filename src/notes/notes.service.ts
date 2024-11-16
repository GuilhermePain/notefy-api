import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Notes } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  createNote(createNoteDto: CreateNoteDto, req: any): Promise<Notes> {
    return this.prisma.notes.create({
      data: { 
        ...createNoteDto, userId: req.user.sub
      } 
    })
  }

  findNote(noteId: number, userId: number) {
    return this.prisma.notes.findUnique({
      where: { 
        id: noteId,
        userId: userId
       }
    });
  }

  updateNote(id: number, updateNoteDto: UpdateNoteDto) {
    return this.prisma.notes.update({
      where: { id: id },
      data: updateNoteDto
    });
  }

  removeNote(id: number) {
    return this.prisma.notes.delete({
      where: { id: id}
    });
  }
}
