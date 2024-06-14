import { Field, Int, InputType, PartialType } from '@nestjs/graphql';
import { CreateAppointmentInput } from './create-appointment.input';

@InputType()
export class UpdateAppointmentInput extends PartialType(
  CreateAppointmentInput,
) {
  @Field(() => Int)
  id: number;
}
