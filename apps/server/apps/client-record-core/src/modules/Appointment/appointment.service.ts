import { CreateAppointmentInput } from './inputs/create-appointment.input';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@client-record/data-source/core/models/appointment.model';
import { UpdateAppointmentInput } from './inputs/update-appointment.input';
import { Procedure } from '@client-record/data-source/core/models/procedure.model';
import { Client } from '@client-record/data-source/core/models/client.model';
import Master from '@client-record/data-source/core/models/master.model';
import { AppointmentStatus } from '@client-record/data-source/core/models/appointment-status.model';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Master)
    private readonly masterRepository: Repository<Master>,
    @InjectRepository(AppointmentStatus)
    private readonly appointmentStatusRepository: Repository<AppointmentStatus>,
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

  async findMany(cursor?: string, pageSize?: number) {
    const query = this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.client', 'client')
      .leftJoinAndSelect('client.channel', 'channel')
      .leftJoinAndSelect('client.phones', 'phones')
      .leftJoinAndSelect('appointment.master', 'master')
      .leftJoinAndSelect('master.procedures', 'masterProcedures')
      .leftJoinAndSelect('appointment.procedures', 'procedures')
      .leftJoinAndSelect('appointment.status', 'status')
      // .leftJoinAndSelect('appointment.media', 'media') // Uncomment if needed
      .orderBy('appointment.id', 'ASC')
      .take(pageSize);

    if (cursor) {
      query.where('appointment.id > :cursor', { cursor });
    }

    const appointments = await query.getMany();

    const nextCursor =
      appointments.length === pageSize
        ? appointments[appointments.length - 1].id
        : null;

    return {
      data: appointments,
      cursor: nextCursor,
      count: await this.appointmentRepository.count(),
    };
  }

  async save<T>(
    data: UpdateAppointmentInput | CreateAppointmentInput,
  ) {
    const {
      client: clientId,
      master: masterId,
      status: statusId,
      procedures: procedureIds,
      ...restData
    } = data;

    if ('id' in data) {
      const a = data

      a.id
    }

    const procedures = procedureIds
      ? await this.procedureRepository.findBy({ id: In(procedureIds) })
      : [];

    const client = clientId
      ? await this.clientRepository.findOneBy({ id: Number(clientId) })
      : null;
    const master = masterId
      ? await this.masterRepository.findOneBy({ id: Number(masterId) })
      : null;
    const status = statusId
      ? await this.appointmentStatusRepository.findOneBy({
          id: Number(statusId),
        })
      : null;

    const newAppointment = restData;

    if (procedures) {
      newAppointment['procedures'] = procedures;
    }

    if (client) {
      newAppointment['client'] = client;
    }

    if (master) {
      newAppointment['master'] = master;
    }

    if (status) {
      newAppointment['status'] = status;
    }

    const appointment = this.appointmentRepository.create(newAppointment);

    const { id } = await this.appointmentRepository.save(appointment);

    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.appointmentRepository.delete(id);
    return !!affected;
  }
}
