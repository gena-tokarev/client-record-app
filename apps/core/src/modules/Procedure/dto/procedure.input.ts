import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProcedureInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field(() => [Number])
  masterIds: number[];
}
