import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ProxyModule } from 'src/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [AuthController],
})
export class AuthModule {}
