import { Repository } from 'typeorm';
import { MasterInput } from './dto/master.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Master from '@client-record/server/data-source/core/models/master.model';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Master)
    private readonly masterRepository: Repository<Master>,
  ) {}

  findAll() {
    return this.masterRepository.find();
  }

  findOneById(id: number) {
    return this.masterRepository.find({
      where: { id },
      relations: ['procedures'],
    })[0];
  }

  async save(data: MasterInput): Promise<Master> {
    const { procedureIds, ...master } = data;

    const procedures = procedureIds.map((id) => ({ id }));

    const { id } = await this.masterRepository.save({
      ...master,
      procedures,
    });

    /**
     * TODO: refactor this after typeOrm implements a feature of returning the whole saved entity:
     * https://github.com/typeorm/typeorm/pull/5680
     */
    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.masterRepository.delete(id);
    return !!affected;
  }
}
