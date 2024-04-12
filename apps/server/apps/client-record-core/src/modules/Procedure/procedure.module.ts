import { Module } from '@nestjs/common';
import { ProcedureResolver } from './procedure.resolver';
import { ProcedureService } from './procedure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from '@client-record/server/data-source/core/models/procedure.model';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  providers: [ProcedureService, ProcedureResolver],
})
export class ProcedureModule {}
