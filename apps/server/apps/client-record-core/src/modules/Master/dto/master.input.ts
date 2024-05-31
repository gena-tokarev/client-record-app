import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MasterInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String)
  name: string;

  @Field(() => [Int])
  procedureIds: number[];
}
