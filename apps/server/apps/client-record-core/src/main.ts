import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { formatValidationErrorMessage } from './utils/format-validation-error-message';
import * as session from 'express-session';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors) {
        const formattedErrors = formatValidationErrorMessage(errors);
        return new UnprocessableEntityException(formattedErrors);
      },
    }),
  );

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
      port: configService.get('CORE_SERVICE_PORT', 4000),
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('CORE_APP_PORT', 3000));
}

bootstrap();
