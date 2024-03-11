import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.model';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [ChannelService, ChannelResolver],
})
export class ChannelModule {}
