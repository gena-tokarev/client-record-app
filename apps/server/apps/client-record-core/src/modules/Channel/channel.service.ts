import { Repository } from 'typeorm';
import { Channel } from './channel.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
