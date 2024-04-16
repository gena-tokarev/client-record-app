import { Client } from '@client-record/data-source/core/models/client.model';
import { ClientService } from './client.service';
import { ClientInput } from './dto/client.input';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver(Client)
export class ClientResolver {
  constructor(private clientService: ClientService) {}

  @Query(() => [Client])
  clients() {
    return this.clientService.findAll();
  }

  @Query(() => Client)
  client(@Args('id', { type: () => ID }) id: number) {
    return this.clientService.findOneById(id);
  }

  @Mutation(() => Client)
  createClient(@Args('inputClient') newClient: ClientInput) {
    return this.clientService.save(newClient);
  }

  @Mutation(() => Client)
  updateClient(@Args('inputClient') inputClient: ClientInput) {
    return this.clientService.save(inputClient);
  }

  @Mutation(() => Boolean)
  deleteClient(@Args('id', { type: () => ID }) id: number) {
    return this.clientService.delete(id);
  }
}
