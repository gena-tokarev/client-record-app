import { CreateAppointmentStatusInput } from './inputs/create-appointment-status.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateAppointmentStatusInput } from './inputs/update-appointment-status.input';
import { AppointmentStatus } from '@client-record/data-source/core/models/appointment-status.model';

@Injectable()
export class AppointmentStatusService {
  constructor(
    @InjectRepository(AppointmentStatus)
    private readonly appointmentStatusRepository: Repository<AppointmentStatus>,
  ) {}

  async findOneById(id: number) {
    return this.appointmentStatusRepository.findOne({
      where: { id },
    });
  }

  findAll(): Promise<AppointmentStatus[]> {
    return this.appointmentStatusRepository.find();
  }

  async save(
    data: CreateAppointmentStatusInput | UpdateAppointmentStatusInput,
  ) {
    const { id } = await this.appointmentStatusRepository.save(data);

    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.appointmentStatusRepository.delete(id);
    return !!affected;
  }
}
