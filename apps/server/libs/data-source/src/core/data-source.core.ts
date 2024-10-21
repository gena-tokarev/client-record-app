import { DataSource } from 'typeorm';
import { User } from './models/user.model';
import { Procedure } from './models/procedure.model';
import { Channel } from './models/channel.model';
import { Appointment } from './models/appointment.model';
import Master from './models/master.model';
import { Phone } from './models/phone.model';
import { Client } from './models/client.model';
import { AppointmentStatus } from './models/appointment-status.model';
// import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// dotenv.config({ path: '../../.env.demo' });

console.log(3333333, new ConfigService().get<string>('DB_HOST'));

// export const DataSourceCore = new DataSource({
//   type: 'postgres',
//   // host: process.env.DB_HOST,
//   // port: parseInt(process.env.DB_PORT || '5432'),
//   // username: process.env.DB_USER,
//   // password: process.env.DB_PASSWORD,
//   // database: process.env.DB_NAME,
//   host: new ConfigService().get<string>('DB_HOST'),
//   port: new ConfigService().get<number>('DB_PORT') || 5432,
//   username: new ConfigService().get<string>('DB_USER'),
//   password: new ConfigService().get<string>('DB_PASSWORD'),
//   database: new ConfigService().get<string>('DB_NAME'),
//   entities: [
//     User,
//     Procedure,
//     Channel,
//     AppointmentStatus,
//     Appointment,
//     Client,
//     Master,
//     Phone,
//   ],
//   synchronize: true,
//   logger: 'advanced-console',
//   logging: true,
// });

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
export class DataSourceCore {}
