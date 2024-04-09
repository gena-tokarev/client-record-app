import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  // OneToMany,
} from 'typeorm';

// import { Media } from '../Media/media.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Client } from './client.model';
import Master from './master.model';
import { Procedure } from './procedure.model';

@Entity()
@ObjectType()
export class Appointment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('text')
  complaints!: string;

  @Field(() => Number)
  @Column('bigint')
  date!: number;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  withCoating: boolean;

  @Field(() => Number)
  @Column('int', { default: 0 })
  price: number;

  @Field(() => String)
  @Column('varchar')
  results!: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  comments: string;

  @Field(() => Client)
  @ManyToOne(() => Client, (client) => client.id, { nullable: false })
  client: Client;

  @Field(() => Master)
  @ManyToOne(() => Master, (master) => master.id, { nullable: false })
  master: Master;

  @Field(() => [Procedure], { nullable: true })
  @ManyToMany(() => Procedure, (procedure) => procedure.id, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  procedures?: Procedure[];

  // @Field(() => [Media], { nullable: true })
  // @OneToMany(() => Media, (media) => media.appointment, {
  //     cascade: true,
  //     nullable: true,
  // })
  // media: Media[];
}
