import { Appointment } from '@client-record/data-source/core/models/appointment.model';
import { CreateAppointmentStatusInput } from './inputs/create-appointment-status.input';
import { Injectable } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UpdateAppointmentStatusInput } from './inputs/update-appointment-status.input';
import { AppointmentStatus } from '@client-record/data-source/core/models/appointment-status.model';
import { AppointmentStatusService } from './appointment-status.service';

@Injectable()
@Resolver(Appointment)
export class AppointmentStatusResolver {
  constructor(private appointmentStatusService: AppointmentStatusService) {}

  @Query(() => [AppointmentStatus])
  appointmentStatuses() {
    return this.appointmentStatusService.findAll();
  }

  @Query(() => AppointmentStatus)
  appointmentStatus(@Args('id', { type: () => ID }) id: number) {
    return this.appointmentStatusService.findOneById(id);
  }

  @Mutation(() => AppointmentStatus)
  createAppointmentStatus(
    @Args('inputAppointment') newAppointment: CreateAppointmentStatusInput,
  ) {
    return this.appointmentStatusService.save(newAppointment);
  }

  @Mutation(() => AppointmentStatus)
  updateAppointmentStatus(
    @Args('inputAppointment') inputAppointment: UpdateAppointmentStatusInput,
  ) {
    return this.appointmentStatusService.save(inputAppointment);
  }

  @Mutation(() => Boolean)
  deleteAppointmentStatus(@Args('id', { type: () => ID }) id: number) {
    return this.appointmentStatusService.delete(id);
  }
}
