import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './models/user.model';
import { Procedure } from './models/procedure.model';
import { Channel } from './models/channel.model';
import { Appointment } from './models/appointment.model';
import Master from './models/master.model';
import { Phone } from './models/phone.model';
import { Client } from './models/client.model';
import { AppointmentStatus } from './models/appointment-status.model';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Env } from '@client-record/server-shared/types/env.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

dotenv.config({
  path: [
    path.join(__dirname, '../../../../../../.env'),
    path.join(__dirname, '../../../../../../.env.local'),
  ],
});

const configServiceLocal = new ConfigService<Env>();

export const getDataSourceCore = (
  configService: ConfigService<Env>,
): DataSourceOptions => ({
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
});

export const DataSourceCore = new DataSource(
  getDataSourceCore(configServiceLocal),
);
