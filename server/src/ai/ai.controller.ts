import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body('prompt') prompt: string) {
    try {
      return await this.aiService.generateResponse(prompt);
    } catch (error: unknown) {
      const err = error as { response?: { data?: unknown }; message?: string };
      const details = err.message ?? 'Unknown error';
      console.error('AI ERROR:', err.response?.data ?? details);
      return { error: 'Failed to communicate with AI', details };
    }
  }
}
