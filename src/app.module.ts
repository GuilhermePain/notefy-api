import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { NotesModule } from './notes/notes.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, MailModule, NotesModule, AiModule],
})
export class AppModule {}
