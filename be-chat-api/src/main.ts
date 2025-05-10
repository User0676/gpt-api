import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000',
        'https://gpt-api-mocha.vercel.app',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
    }
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
