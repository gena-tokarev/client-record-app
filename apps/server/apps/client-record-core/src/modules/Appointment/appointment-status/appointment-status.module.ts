import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentStatus } from '@client-record/data-source/core/models/appointment-status.model';
import { AppointmentStatusResolver } from './appointment-status.resolver';
import { AppointmentStatusService } from './appointment-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentStatus])],
  providers: [AppointmentStatusResolver, AppointmentStatusService],
})
export class AppointmentStatusModule {}
