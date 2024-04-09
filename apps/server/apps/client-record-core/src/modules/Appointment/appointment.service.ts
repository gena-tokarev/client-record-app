import { AppointmentInput } from './dto/appointment.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@client-record/data-source/core/models/appointment.model';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async findOneById(id: number) {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: [
        'client',
        'client.channel',
        'client.phones',
        'master',
        'master.procedures',
        'procedures',
        // "media",
      ],
    });
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: [
        'client',
        'client.channel',
        'client.phones',
        'master',
        'master.procedures',
        'procedures',
        // "media",
      ],
    });
  }

  async save(data: AppointmentInput) {
    const {
      procedures: procedureIds,
      // media: mediaItemsIds,
      ...appointment
    } = data;

    const procedures = procedureIds.map((id) => ({ id: parseInt(id) }));
    // const media = mediaItemsIds.map((id) => ({ id: parseInt(id) }));

    const { id } = await this.appointmentRepository.save({
      ...appointment,
      procedures,
      // media,
    });

    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.appointmentRepository.delete(id);
    return !!affected;
  }
}
