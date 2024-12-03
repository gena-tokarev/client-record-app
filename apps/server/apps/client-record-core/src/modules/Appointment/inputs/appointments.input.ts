import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AppointmentsInput {
  @Field({ nullable: true })
  cursor: number;

  @Field()
  pageSize: number;
}
