import { MasterInput } from './dto/master.input';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { MasterService } from './master.service';
import Master from '@client-record/data-source/core/models/master.model';

@Injectable()
@Resolver(Master)
export class MasterResolver {
  constructor(private masterService: MasterService) {}

  @Query(() => [Master])
  masters() {
    return this.masterService.findAll();
  }

  @Query(() => Master)
  master(@Args('id', { type: () => ID }) id: number) {
    return this.masterService.findOneById(id);
  }

  @Mutation(() => Master)
  createMaster(@Args('inputMaster') newMaster: MasterInput) {
    return this.masterService.save(newMaster);
  }

  @Mutation(() => Master)
  updateMaster(@Args('inputMaster') inputMaster: MasterInput) {
    return this.masterService.save(inputMaster);
  }

  @Mutation(() => Boolean)
  deleteMaster(@Args('id', { type: () => ID }) id: number) {
    return this.masterService.delete(id);
  }
}
