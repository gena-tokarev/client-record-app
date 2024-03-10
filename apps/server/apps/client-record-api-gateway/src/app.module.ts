import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [ProxyModule, AuthModule],
})
export class AppModule {}
