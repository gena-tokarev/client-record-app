import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET', 'randow_STRING_();123'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: configService.get('AUTH_SERVICE_PORT'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('AUTH_APP_PORT'));
}

bootstrap();
