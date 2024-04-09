import { Phone } from '@client-record/data-source/core/models/phone.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Phone])] })
export class PhoneModule {}
