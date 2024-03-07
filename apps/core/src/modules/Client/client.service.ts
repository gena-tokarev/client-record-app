import { Repository } from 'typeorm';
import { Client } from './client.model';
import { ClientInput } from './dto/client.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['channel', 'phones'],
    });
  }

  findOneById(id: number) {
    return this.clientRepository.findOne({
      where: { id },
      relations: ['channel', 'phones'],
    });
  }

  async save(data: ClientInput) {
    const { channel, ...client } = data;

    const phones = client.phones.map((value) => ({
      value,
    }));

    const { id } = await this.clientRepository.save({
      ...client,
      phones,
      channel,
    });
    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.clientRepository.delete(id);
    return !!affected;
  }
}
