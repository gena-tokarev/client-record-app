import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationModel {
  @Field(() => Int)
  pageSize: number;

  @Field(() => Int, { nullable: true })
  cursor: number;
}

@InputType()
export class FilterModel {
  @Field()
  field: string;

  @Field()
  operator: string;

  @Field({ nullable: true })
  value: string;
}

@InputType()
export class AppointmentsInput {
  @Field(() => PaginationModel, { nullable: true })
  paginationModel: PaginationModel;

  @Field(() => [FilterModel], { nullable: true })
  filterModel: FilterModel[];
}
