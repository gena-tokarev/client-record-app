import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from '@client-record/server/data-source/core/models/channel.model';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  findAll() {
    return this.channelRepository.find();
  }

  findOneById(id: number) {
    return this.channelRepository.findOne({ where: { id } });
  }
}
