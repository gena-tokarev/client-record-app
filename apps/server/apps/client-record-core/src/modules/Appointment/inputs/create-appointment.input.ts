import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateAppointmentDto } from '@client-record/packages/shared/dto/appointment/create-appointment.dto';

@InputType()
export class CreateAppointmentInput extends CreateAppointmentDto {
  @Field()
  date: number;

  @Field()
  complaints: string;

  @Field({ nullable: true })
  comments: string;

  @Field()
  price: number;

  @Field(() => ID)
  client: string;

  @Field(() => ID)
  master: string;

  @Field(() => [ID])
  procedures: string[];

  @Field(() => ID)
  status: string;

  // @Field(() => [ID])
  // media?: string[];
}
