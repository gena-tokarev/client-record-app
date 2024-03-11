import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Procedure } from '../Procedure/procedure.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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
