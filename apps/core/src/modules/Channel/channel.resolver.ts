import { Channel } from './channel.model';
import { ChannelService } from './channel.service';
import { Injectable } from '@nestjs/common';
import { Args, ID, Resolver, Query } from '@nestjs/graphql';

@Injectable()
@Resolver(Channel)
export class ChannelResolver {
  constructor(private channelService: ChannelService) {}

  @Query(() => [Channel])
  channels() {
    return this.channelService.findAll();
  }

  @Query(() => Channel)
  channel(@Args('id', { type: () => ID }) id: number) {
    return this.channelService.findOneById(id);
  }
}
