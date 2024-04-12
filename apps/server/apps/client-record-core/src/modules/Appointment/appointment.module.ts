import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '@client-record/server/data-source/core/models/appointment.model';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentService, AppointmentResolver],
})
export class AppointmentModule {}
