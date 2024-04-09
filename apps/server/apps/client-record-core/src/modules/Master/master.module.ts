import { Module } from '@nestjs/common';
import { MasterResolver } from './master.resolver';
import { MasterService } from './master.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Master from '@client-record/data-source/core/models/master.model';

@Module({
  imports: [TypeOrmModule.forFeature([Master])],
  providers: [MasterService, MasterResolver],
})
export class MasterModule {}
