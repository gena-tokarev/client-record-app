import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { formatValidationErrorMessage } from './utils/format-validation-error-message';
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
