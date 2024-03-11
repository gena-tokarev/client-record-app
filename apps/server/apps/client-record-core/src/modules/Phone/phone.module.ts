import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.model';

@Module({ imports: [TypeOrmModule.forFeature([Phone])] })
export class PhoneModule {}
