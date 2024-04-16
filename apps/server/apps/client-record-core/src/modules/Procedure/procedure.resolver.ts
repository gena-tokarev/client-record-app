import { Procedure } from '@client-record/data-source/core/models/procedure.model';
import { ProcedureInput } from './dto/procedure.input';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { ProcedureService } from './procedure.service';

@Injectable()
@Resolver(Procedure)
export class ProcedureResolver {
  constructor(private procedureService: ProcedureService) {}

  @Query(() => [Procedure])
  procedures() {
    return this.procedureService.findAll();
  }

  @Query(() => Procedure)
  procedure(@Args('id', { type: () => ID }) id: number) {
    return this.procedureService.findOneById(id);
  }

  @Query(() => [Procedure])
  procedureByMaster(@Args('masterId', { type: () => ID }) masterId: number) {
    return this.procedureService.findByMasterId(masterId);
  }

  @Mutation(() => Procedure)
  createProcedure(@Args('inputProcedure') newProcedure: ProcedureInput) {
    return this.procedureService.save(newProcedure);
  }

  @Mutation(() => Procedure)
  updateProcedure(@Args('inputProcedure') inputProcedure: ProcedureInput) {
    return this.procedureService.save(inputProcedure);
  }

  @Mutation(() => Boolean)
  deleteProcedure(@Args('id', { type: () => ID }) id: number) {
    return this.procedureService.delete(id);
  }
}
