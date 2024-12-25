import { CreateAppointmentStatusDto } from './create-appointment-status.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAppointmentStatusDto extends PartialType(
  CreateAppointmentStatusDto,
) {
  id: number;
}
