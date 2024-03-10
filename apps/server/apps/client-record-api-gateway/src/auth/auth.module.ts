import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ProxyModule } from '../proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [AuthController],
})
export class AuthModule {}
