import { Notes } from '../entities/notes.entity';

export class ReturnNoteDto {
    id: number;
    title: string;
    body?: string;
    createdAt: Date;

    constructor(note: Notes) {
        this.id = note.id;
        this.title = note.title;
        this.body = note.body;
        this.createdAt = note.createdAt;
    }
}
