import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { formatValidationErrorMessage } from './utils/format-validation-error-message';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      exposedHeaders: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });

  app.setGlobalPrefix('api/v1');
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
  await app.listen(process.env.APP_PORT ?? 4000);
}

bootstrap();