import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import Master from '../Master/master.model';

@Entity()
@ObjectType()
export class Procedure {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('varchar', { length: 32, unique: true })
  name!: string;

  @Field(() => [Master], { nullable: true })
  @ManyToMany(() => Master, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  masters?: Master[];
}
