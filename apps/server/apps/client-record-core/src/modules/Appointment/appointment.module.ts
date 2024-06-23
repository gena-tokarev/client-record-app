import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '@client-record/data-source/core/models/appointment.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { AppointmentStatusModule } from './appointment-status/appointment-status.module';
import { Procedure } from '@client-record/data-source/core/models/procedure.model';
import Master from '@client-record/data-source/core/models/master.model';
import { AppointmentStatus } from '@client-record/data-source/core/models/appointment-status.model';
import { Client } from '@client-record/data-source/core/models/client.model';

@Module({
  imports: [
    AppointmentStatusModule,
    TypeOrmModule.forFeature([Appointment, Procedure, Client, Master, AppointmentStatus]),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: configService.get('AUTH_SERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  providers: [AppointmentService, AppointmentResolver, GqlAuthGuard],
})
export class AppointmentModule {}
