import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProcedureModule } from './Procedure/procedure.module';
import { PhoneModule } from './Phone/phone.module';
import { ClientModule } from './Client/client.module';
import { ChannelModule } from './Channel/channel.module';
import { AppointmentModule } from './Appointment/appointment.module';
import { MasterModule } from './Master/master.module';
import { ConfigModule } from '@nestjs/config';
import { DataSourceCoreModule } from '@client-record/data-source';
import { UserModule } from '@client-record/user';

@Module({
  imports: [
    DataSourceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    UserModule,
  ],
})
export class AppModule {}
