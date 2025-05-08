import { Module } from '@nestjs/common';
import { GptService } from './gpt/gpt.service';
import { GptController } from './gpt/gpt.controller';

@Module({
  providers: [GptService],
  controllers: [GptController]
})
export class GptModuleModule {}
