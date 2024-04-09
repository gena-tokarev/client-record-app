import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Procedure } from './procedure.model';

@Entity()
@ObjectType()
export default class Master {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('varchar', { length: 32, unique: true })
  name!: string;

  @Field(() => [Procedure], { nullable: true })
  @ManyToMany(() => Procedure, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  procedures?: Procedure[];
}
