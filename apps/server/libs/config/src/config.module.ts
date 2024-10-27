import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Global()
@Module({
  imports: [
    NestConfig.forRoot({
      isGlobal: true,
      envFilePath: [
        path.join(__dirname, '../../../../../.env'),
        path.join(__dirname, '../../../../../.env.local'),
      ],
      expandVariables: true,
    }),
  ],
  exports: [NestConfig],
})
export class ConfigModule {}
