import { CreateAppointmentInput } from './inputs/create-appointment.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@client-record/data-source/core/models/appointment.model';
import { UpdateAppointmentInput } from './inputs/update-appointment.input';

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
        'status',
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
        'status',
        // "media",
      ],
    });
  }

  async save(data: CreateAppointmentInput | UpdateAppointmentInput) {
    const { id } = await this.appointmentRepository.save(data);

    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.appointmentRepository.delete(id);
    return !!affected;
  }
}
