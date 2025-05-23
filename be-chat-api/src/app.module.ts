import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptModuleModule } from './gpt-module/gpt-module.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),GptModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
