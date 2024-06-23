import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeleteAppointmentOutput {
  @Field(() => Int)
  id: number;
}