import { Module } from '@nestjs/common';
import { ProxyModule } from './proxy/proxy.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@client-record/config/config.module';

@Module({
  imports: [ProxyModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
