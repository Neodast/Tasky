import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [appConfig],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigModule {}
