import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceCore } from './data-source.core';

@Module({
  imports: [TypeOrmModule.forRoot(DataSourceCore.options)],
})
export class DataSourceCoreModule {}
