import { Channel } from '../../Channel/channel.model';
// import { PhoneInput } from './phone.input';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ClientInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  firstName!: string;

  @Field()
  lastName: string;

  @Field()
  middleName: string;

  @Field()
  instagramName: string;

  @Field(() => [String])
  phones: string[];

  @Field(() => ID)
  channel!: Channel;
}
