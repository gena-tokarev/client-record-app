import { Client } from '../../Client/client.model';
import { Field, ID, InputType } from '@nestjs/graphql';
import Master from '../../Master/master.model';

@InputType()
export class AppointmentInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  date: number;

  @Field()
  complaints: string;

  @Field()
  results: string;

  @Field({ nullable: true })
  comments: string;

  @Field()
  price: number;

  @Field()
  withCoating: boolean;

  @Field(() => ID)
  client: Client;

  @Field(() => ID)
  master: Master;

  @Field(() => [ID])
  procedures: string[];

  // @Field(() => [ID])
  // media?: string[];
}
