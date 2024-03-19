import { Module } from '@nestjs/common';
import { ProxyModule } from './proxy/proxy.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ProxyModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'CORE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.CORE_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
