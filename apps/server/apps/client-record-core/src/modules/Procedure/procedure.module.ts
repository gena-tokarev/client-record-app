import { Module } from '@nestjs/common';
import { ProcedureResolver } from './procedure.resolver';
import { ProcedureService } from './procedure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from './procedure.model';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  providers: [ProcedureService, ProcedureResolver],
})
export class ProcedureModule {}
