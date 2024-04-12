import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { formatValidationErrorMessage } from './utils/format-validation-error-message';
import * as session from 'express-session';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
      secret: process.env.SESSION_SECRET ?? 'randow_STRING_();123',
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
      port: Number(process.env.CORE_SERVICE_PORT),
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.CORE_APP_PORT);
}

bootstrap();
