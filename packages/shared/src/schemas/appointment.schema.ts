// import { IsDateString, IsOptional, Max, MaxLength } from 'class-validator';

// export class CreateAppointmentDto {
//   @IsDateString()
//   date: string;

//   @MaxLength(400)
//   complaints: string;

//   @MaxLength(400)
//   @IsOptional()
//   comments?: string;

//   @Max(99999)
//   price: number;

//   client: string;

//   master: string;

//   procedures: string[];

//   status: string;
// }

import { z } from "zod";

export const createAppointmentSchema = z
  .object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format, must be ISO 8601",
    }),
    complaints: z.string(),
    comments: z.string().optional(),
    price: z.number().positive(),
    client: z.string(),
    master: z.string(),
    procedures: z.array(z.string()),
    status: z.string(),
  })
  .strict();

export const updateAppointmentSchema = createAppointmentSchema
  .partial()
  .extend({
    id: z.number(),
  });

export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentDto = z.infer<typeof updateAppointmentSchema>;
