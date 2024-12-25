import { Field, InputType } from '@nestjs/graphql';
import { CreateAppointmentStatusDto } from '@client-record/packages/shared/modules/appointment/dto/create-appointment-status.dto';

@InputType()
export class CreateAppointmentStatusInput extends CreateAppointmentStatusDto {
  @Field(() => String)
  value: string;
}
