import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DataSourceCoreModule } from '@client-record/data-source';
import { ConfigModule } from '@client-record/config/config.module';

@Module({
  imports: [DataSourceCoreModule, AuthModule, ConfigModule],
})
export class AppModule {}
