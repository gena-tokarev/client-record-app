import { Appointment } from '@client-record/data-source/core/models/appointment.model';
import {
  CreateAppointmentDto,
  createAppointmentSchema,
} from '@client-record/packages/shared/schemas/appointment.schema';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from './inputs/create-appointment.input';
import { Injectable, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';

import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { UpdateAppointmentInput } from './inputs/update-appointment.input';
import { ValidationPipe } from '../../pipes/validation-pipe';
const pubSub = new PubSub();

@Injectable()
@Resolver(Appointment)
export class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {}

  @Query(() => [Appointment])
  @UseGuards(GqlAuthGuard)
  appointments() {
    return this.appointmentService.findAll();
  }

  @Query(() => Appointment)
  appointment(@Args('id', { type: () => ID }) id: number) {
    return this.appointmentService.findOneById(id);
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args(
      'inputAppointment',
      new ValidationPipe<CreateAppointmentDto>(createAppointmentSchema),
    )
    newAppointment: CreateAppointmentInput,
  ) {
    const createdAppointment =
      await this.appointmentService.save(newAppointment);
    await pubSub.publish('onAppointmentUpdated', {
      onAppointmentUpdated: createdAppointment,
    });
    return createdAppointment;
  }

  @Mutation(() => Appointment)
  updateAppointment(
    @Args('inputAppointment') inputAppointment: UpdateAppointmentInput,
  ) {
    return this.appointmentService.save(inputAppointment);
  }

  @Mutation(() => Boolean)
  deleteAppointment(@Args('id', { type: () => ID }) id: number) {
    return this.appointmentService.delete(id);
  }

  @Subscription(() => Appointment, {
    name: 'onAppointmentUpdated',
    nullable: true,
  })
  async appointmentsUpdated() {
    return pubSub.asyncIterator('onAppointmentUpdated');
  }
}
