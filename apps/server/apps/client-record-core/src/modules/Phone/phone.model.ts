import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Client } from '../Client/client.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Phone {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('varchar', { length: 16, unique: true, nullable: false })
  value!: string;

  @Field(() => ID, { nullable: true })
  @ManyToOne(() => Client, (client) => client.phones)
  client: Client;
}
