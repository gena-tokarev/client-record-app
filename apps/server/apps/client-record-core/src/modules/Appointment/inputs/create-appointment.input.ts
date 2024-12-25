import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateAppointmentDto } from '@client-record/packages/shared/modules/appointment/schemas/appointment.schema';

@InputType()
export class CreateAppointmentInput implements CreateAppointmentDto {
  @Field()
  date: string;

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
