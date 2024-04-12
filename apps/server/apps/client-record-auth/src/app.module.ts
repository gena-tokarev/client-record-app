import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DataSourceCoreModule } from '@client-record/server/data-source';

@Module({
  imports: [DataSourceCoreModule, AuthModule],
})
export class AppModule {}
