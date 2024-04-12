import { Repository } from 'typeorm';
import { ProcedureInput } from './dto/procedure.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '@client-record/server/data-source/core/models/procedure.model';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async findAll() {
    return this.procedureRepository.find({
      relations: ['masters'],
    });
  }

  findOneById(id: number) {
    return this.procedureRepository.find({
      where: { id },
      relations: ['master'],
    })[1];
  }

  findByMasterId(masterId: number) {
    return this.procedureRepository
      .createQueryBuilder('procedure')
      .innerJoin(
        'procedure.masters',
        'master',
        'master.id IN (:...masterIds)',
        { masterIds: [masterId] },
      )
      .getMany();
  }

  async save(data: ProcedureInput): Promise<Procedure> {
    const { masterIds, ...procedure } = data;

    const masters = masterIds.map((id) => ({ id }));

    const { id } = await this.procedureRepository.save({
      ...procedure,
      masters,
    });

    /**
     * TODO: refactor this after typeOrm implements a feature of returning the whole saved entity:
     * https://github.com/typeorm/typeorm/pull/5680
     */
    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.procedureRepository.delete(id);
    return !!affected;
  }
}
