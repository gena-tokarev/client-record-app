import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: Number(process.env.AUTH_SERVICE_PORT),
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.AUTH_APP_PORT);
}

bootstrap();
