import { Appointment } from '@client-record/server/data-source/core/models/appointment.model';
import { AppointmentService } from './appointment.service';
import { AppointmentInput } from './dto/appointment.input';
import { Injectable } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { GraphqlJwtAccessGuard } from '../Auth/guards/graphql-jwt-access.guard';

@Injectable()
@Resolver(Appointment)
// @UseGuards(GraphqlJwtAccessGuard)
export class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {}

  @Query(() => [Appointment])
  appointments() {
    return this.appointmentService.findAll();
  }

  @Query(() => Appointment)
  appointment(@Args('id', { type: () => ID }) id: number) {
    return this.appointmentService.findOneById(id);
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('inputAppointment') newAppointment: AppointmentInput,
  ) {
    return this.appointmentService.save(newAppointment);
  }

  @Mutation(() => Appointment)
  updateAppointment(
    @Args('inputAppointment') inputAppointment: AppointmentInput,
  ) {
    return this.appointmentService.save(inputAppointment);
  }

  @Mutation(() => Boolean)
  deleteAppointment(@Args('id', { type: () => ID }) id: number) {
    return this.appointmentService.delete(id);
  }
}
