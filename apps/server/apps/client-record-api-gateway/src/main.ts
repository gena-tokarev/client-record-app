import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      exposedHeaders: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });
  await app.listen(process.env.API_GATEWAY_APP_PORT);
}
bootstrap();
