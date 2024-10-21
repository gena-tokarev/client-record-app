import { User } from './models/user.model';
import { Procedure } from './models/procedure.model';
import { Channel } from './models/channel.model';
import { Appointment } from './models/appointment.model';
import Master from './models/master.model';
import { Phone } from './models/phone.model';
import { Client } from './models/client.model';
import { AppointmentStatus } from './models/appointment-status.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          User,
          Procedure,
          Channel,
          AppointmentStatus,
          Appointment,
          Client,
          Master,
          Phone,
        ],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
})
export class DataSourceCoreModule {}
