import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-notes.dto';
import { UpdateNoteDto } from './dto/update-notes.dto';
import { AuthGuard } from '@/src/auth/guards/auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  create(@Body() dto: CreateNoteDto, @Request() req: RequestWithUser) {
    return this.notesService.createNote(dto, req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.notesService.findOneNote(+id, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto, @Request() req: RequestWithUser) {
    return this.notesService.updateNote(+id, req.user.sub, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.notesService.deleteNote(+id, req.user.sub);
  }
}
