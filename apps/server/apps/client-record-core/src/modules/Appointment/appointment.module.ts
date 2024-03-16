import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.model';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentService, AppointmentResolver],
})
export class AppointmentModule {}
