import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from '@client-record/server-shared/types/env.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      exposedHeaders: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });
  const configService = app.get(ConfigService<Env>);
  await app.listen(configService.get('API_GATEWAY_APP_PORT', 4030));
}
bootstrap();
