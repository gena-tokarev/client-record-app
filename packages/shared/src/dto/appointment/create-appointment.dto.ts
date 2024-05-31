import { MaxLength } from 'class-validator';

export class CreateAppointmentDto {
  date: number;

  @MaxLength(10)
  complaints: string;

  comments: string;

  price: number;

  client: string;

  master: string;

  procedures: string[];

  status: string;
}
