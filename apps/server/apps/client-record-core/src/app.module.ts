import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProcedureModule } from './modules/Procedure/procedure.module';
import { PhoneModule } from './modules/Phone/phone.module';
import { ClientModule } from './modules/Client/client.module';
import { ChannelModule } from './modules/Channel/channel.module';
import { MasterModule } from './modules/Master/master.module';
import { DataSourceCoreModule } from '@client-record/data-source';
import { UserModule } from './modules/User/user.module';
import { ConfigModule } from '@client-record/config/config.module';
import { AppointmentModule } from './modules/Appointment/appointment.module';

@Module({
  imports: [
    DataSourceCoreModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      useGlobalPrefix: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      allowBatchedHttpRequests: true,
      context: ({ req }) => ({ req }),
    }),
    ProcedureModule,
    MasterModule,
    ChannelModule,
    AppointmentModule,
    PhoneModule,
    ClientModule,
    UserModule,
    ConfigModule,
  ],
})
export class AppModule {}
