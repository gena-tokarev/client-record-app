import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PhoneInput {
  @Field()
  value: string;

  // @Field()
  // client: number;
}
