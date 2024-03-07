import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProcedureModule } from './Procedure/procedure.module';
import { PhoneModule } from './Phone/phone.module';
import { ClientModule } from './Client/client.module';
import { ChannelModule } from './Channel/channel.module';
import { AppointmentModule } from './Appointment/appointment.module';
import { MasterModule } from './Master/master.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { AppDataSource } from '../data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      useGlobalPrefix: true,
    }),
    ProcedureModule,
    MasterModule,
    ChannelModule,
    AppointmentModule,
    PhoneModule,
    ClientModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
