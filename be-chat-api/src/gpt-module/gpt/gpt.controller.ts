import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post()
  async handleGptRequest(@Body('text') text: string) {
    const response = await this.gptService.askGpt(text);
    return { response };
  }
}