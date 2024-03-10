import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.model';
import { AppDataSource } from '@client-record/shared';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
