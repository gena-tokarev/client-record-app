import { Appointment } from '@client-record/data-source/core/models/appointment.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AppointmentsOutput {
  @Field(() => Int)
  count: number;

  @Field(() => String)
  cursor: string;

  @Field(() => [Appointment])
  data: Appointment[];
}
