import { CreateAppointmentDto } from '../appointment.schema';

export type UpdateAppointmentDto = Partial<CreateAppointmentDto> & {
  id: number;
};
