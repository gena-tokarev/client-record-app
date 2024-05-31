import { DataSource } from 'typeorm';
import { User } from './models/user.model';
import { Procedure } from './models/procedure.model';
import { Channel } from './models/channel.model';
import { Appointment } from './models/appointment.model';
import Master from './models/master.model';
import { Phone } from './models/phone.model';
import { Client } from './models/client.model';
import { AppointmentStatus } from './models/appointment-status.model';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const DataSourceCore = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
  logger: 'advanced-console',
  logging: true,
});
