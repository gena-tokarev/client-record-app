import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Channel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('varchar', { length: 32, unique: true })
  name!: string;
}
