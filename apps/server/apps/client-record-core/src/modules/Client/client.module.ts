import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.model';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientService, ClientResolver],
})
export class ClientModule {}
