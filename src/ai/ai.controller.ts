import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post('generatenote')
  sendMessage(@Body('prompt') prompt: string) {
    return this.aiService.generateResponse(prompt);
  }
}
