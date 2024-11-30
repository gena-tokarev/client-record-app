import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AppointmentsInput {
  @Field()
  cursor: string;

  @Field()
  limit: number;
}
