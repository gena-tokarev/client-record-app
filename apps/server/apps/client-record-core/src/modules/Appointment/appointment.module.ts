import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '@client-record/data-source/core/models/appointment.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
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
